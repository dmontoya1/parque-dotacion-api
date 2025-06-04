<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

API para la gestión de parques y dotaciones del IDRD (Instituto Distrital de Recreación y Deporte).

Esta API está construida con [Nest](https://github.com/nestjs/nest) framework y utiliza Prisma como ORM para interactuar con la base de datos PostgreSQL.

## API de Parques

La API incluye operaciones CRUD completas para el modelo Parque, implementadas siguiendo patrones de diseño y principios SOLID:

### Patrones de Diseño y Principios SOLID

- **Patrón Repositorio**: Separa la lógica de acceso a datos de la lógica de negocio.
- **Inyección de Dependencias**: Utiliza el sistema de DI de NestJS para desacoplar componentes.
- **Principio de Responsabilidad Única (SRP)**: Cada clase tiene una única responsabilidad.
- **Principio de Inversión de Dependencias (DIP)**: Depende de abstracciones, no de implementaciones concretas.
- **Principio de Sustitución de Liskov (LSP)**: Las implementaciones de repositorio son intercambiables.
- **Principio de Segregación de Interfaces (ISP)**: Interfaces específicas para cada necesidad.

### Endpoints de la API de Parques

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /parques | Obtiene todos los parques |
| GET | /parques/:id | Obtiene un parque por su ID |
| POST | /parques | Crea un nuevo parque |
| PUT | /parques/:id | Actualiza un parque existente |
| DELETE | /parques/:id | Elimina un parque |

### Ejemplos de Uso

#### Obtener todos los parques
```bash
curl -X GET http://localhost:3000/parques
```

#### Obtener un parque por ID
```bash
curl -X GET http://localhost:3000/parques/1
```

#### Crear un nuevo parque
```bash
curl -X POST http://localhost:3000/parques \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Parque Simón Bolívar", "direccion": "Calle 63 y 53 entre Carreras 48 y 68"}'
```

#### Actualizar un parque
```bash
curl -X PUT http://localhost:3000/parques/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Parque Metropolitano Simón Bolívar"}'
```

#### Eliminar un parque
```bash
curl -X DELETE http://localhost:3000/parques/1
```

## Project setup

```bash
# Instalar dependencias
$ yarn install

# Generar el cliente Prisma
$ yarn prisma:generate

# Aplicar migraciones a la base de datos
$ yarn prisma:migrate

# Opcional: Poblar la base de datos con datos iniciales
$ yarn prisma:seed
```

## Estructura del Proyecto

La implementación del CRUD de Parques sigue una arquitectura en capas y utiliza patrones de diseño para mantener el código limpio y mantenible:

```
src/
├── prisma/                  # Módulo de Prisma
│   ├── prisma.module.ts     # Módulo global para Prisma
│   └── prisma.service.ts    # Servicio que extiende PrismaClient
│
├── parques/                 # Módulo de Parques
│   ├── controllers/         # Controladores para manejar las peticiones HTTP
│   │   ├── index.ts
│   │   └── parques.controller.ts
│   │
│   ├── dto/                 # Objetos de Transferencia de Datos
│   │   ├── create-parque.dto.ts
│   │   ├── update-parque.dto.ts
│   │   ├── parque-response.dto.ts
│   │   └── index.ts
│   │
│   ├── repositories/        # Patrón Repositorio
│   │   ├── parque-repository.interface.ts
│   │   ├── prisma-parque.repository.ts
│   │   └── index.ts
│   │
│   ├── services/            # Servicios con lógica de negocio
│   │   ├── parques.service.ts
│   │   └── index.ts
│   │
│   └── parques.module.ts    # Módulo que integra todos los componentes
│
└── app.module.ts            # Módulo principal de la aplicación
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
