FROM node:18-alpine

# Instalar OpenSSL (requerido por Prisma)
RUN apk add --no-cache openssl

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci --only=production

# Generar cliente de Prisma
RUN npx prisma generate

# Copiar código fuente
COPY . .

# Construir aplicación
RUN npm run build

EXPOSE 3000

# Script de inicio que ejecuta migraciones y luego la app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]