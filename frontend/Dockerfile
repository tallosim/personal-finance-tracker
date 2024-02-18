FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./
COPY src ./src
COPY public ./public

RUN yarn install
RUN yarn build