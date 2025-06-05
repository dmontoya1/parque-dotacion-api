import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(app: INestApplication): void {
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('app.swagger.title') || 'API')
    .setDescription(
      configService.get<string>('app.swagger.description') || 'API Description',
    )
    .setVersion(configService.get<string>('app.swagger.version') || '1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Users', 'User management')
    .addTag('Parks', 'Park management')
    .addTag('Activity Categories', 'Activity category management')
    .addTag('Scenarios', 'Scenario equipment management')
    .addTag('Partitions', 'Partition management')
    .addTag('Partition Segments', 'Partition segment management')
    .addTag('Schedule Endowments', 'Schedule management')
    .addTag('Agendas', 'Agenda management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}
