import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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
    // Logging events
    this.$on('query', (event) => {
      this.logger.debug(`Query: ${event.query}`);
      this.logger.debug(`Params: ${event.params}`);
      this.logger.debug(`Duration: ${event.duration}ms`);
    });

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
    operations: (prisma: PrismaClient) => Promise<T>,
  ): Promise<T> {
    return this.$transaction(operations);
  }

  // Soft delete utility (if needed)
  softDelete(model: string, where: any) {
    return this[model].update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
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
