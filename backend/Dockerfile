FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock tsconfig.json openapi.yml ./
COPY src ./src

RUN yarn install
RUN yarn build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "start"]
