FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./
COPY src ./src
COPY public ./public

RUN yarn install --frozen-lockfile --production=true
RUN yarn build
