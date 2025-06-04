FROM node:22-alpine

WORKDIR /app

RUN apk add yarn

COPY package.json ./

RUN yarn install

RUN yarn global add @nestjs/cli
RUN yarn global add ts-node typescript

COPY . .

RUN yarn run prisma generate

EXPOSE 3000

CMD ["yarn", "run", "start:dev"]
