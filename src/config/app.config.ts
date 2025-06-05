import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL || '60', 10),
    limit: parseInt(process.env.THROTTLE_LIMIT || '10', 10),
  },
  swagger: {
    title: process.env.SWAGGER_TITLE || 'Parque Dotación API',
    description:
      process.env.SWAGGER_DESCRIPTION ||
      'API para gestión de parques y dotaciones',
    version: process.env.SWAGGER_VERSION || '1.0',
  },
}));
