import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(`Prisma Error: ${exception.message}`, exception.stack);

    switch (exception.code) {
      case 'P2002':
        // Unique constraint violation
        response.status(HttpStatus.CONFLICT).json({
          success: false,
          message: 'El registro ya existe. Violación de restricción única.',
          error: 'Conflict',
          statusCode: HttpStatus.CONFLICT,
        });
        break;

      case 'P2014':
        // Foreign key constraint violation
        response.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'El registro está relacionado con otros datos y no puede ser eliminado.',
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });
        break;

      case 'P2003':
        // Foreign key constraint failed
        response.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Referencia inválida a un registro relacionado.',
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });
        break;

      case 'P2025':
        // Record not found
        response.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Registro no encontrado.',
          error: 'Not Found',
          statusCode: HttpStatus.NOT_FOUND,
        });
        break;

      default:
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'Error interno del servidor.',
          error: 'Internal Server Error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
    }
  }
}