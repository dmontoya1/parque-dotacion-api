#!/bin/sh

echo "Generando Prisma Client..."
npx prisma generate

echo "Iniciando NestJS..."
yarn run start:dev
