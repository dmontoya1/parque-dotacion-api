import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });
  }

  async onModuleInit() {
    // Only log queries in development
    if (process.env.NODE_ENV !== 'production') {
      this.$on('query', (event) => {
        this.logger.debug(`Query: ${event.query}`);
        this.logger.debug(`Params: ${event.params}`);
        this.logger.debug(`Duration: ${event.duration}ms`);
      });
    }

    this.$on('error', (event) => {
      this.logger.error(`Error: ${event.message}`);
      this.logger.error(`Target: ${event.target}`);
    });

    this.$on('info', (event) => {
      this.logger.log(`Info: ${event.message}`);
    });

    this.$on('warn', (event) => {
      this.logger.warn(`Warning: ${event.message}`);
    });

    await this.$connect();
    this.logger.log('✅ Database connected successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('🔌 Database disconnected');
  }

  // Utility method for transactions
  async executeTransaction<T>(
    operations: (prisma: Prisma.TransactionClient) => Promise<T>,
    maxWait = 5000, // 5 segundos
    timeout = 10000, // 10 segundos
  ): Promise<T> {
    try {
      return await this.$transaction(operations, {
        maxWait,
        timeout,
      });
    } catch (error) {
      this.logger.error('Transaction failed', error);
      throw error;
    }
  }

  // Soft delete utility
  async softDelete<T extends keyof PrismaClient>(
    model: T,
    where: Parameters<PrismaClient[T]['update']>[0]['where'],
  ): Promise<PrismaClient[T]['update']['Result']> {
    try {
      const modelClient = this[model as keyof PrismaClient];
      if (!modelClient) {
        throw new Error(`Model ${model} not found in PrismaClient`);
      }
      return await modelClient.update({
        where,
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error in softDelete for model ${String(model)}`, err);
      throw err;
    }
  }

  // Health check method
  async isHealthy(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
}
