FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock tsconfig.json openapi.yml ./
COPY src ./src

RUN yarn install --frozen-lockfile --production=true
RUN yarn build

ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000

CMD ["yarn", "start"]
