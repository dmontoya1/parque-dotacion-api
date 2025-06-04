FROM node:22-alpine

WORKDIR /app

RUN apk add yarn

COPY package.json ./
COPY prisma ./prisma

RUN yarn install

RUN yarn global add @nestjs/cli
RUN yarn global add ts-node typescript

COPY . .

EXPOSE 3000

CMD ["sh", "./entrypoint.sh"]
