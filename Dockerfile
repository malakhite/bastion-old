FROM node:lts-alpine as base

RUN apk upgrade && apk add git

ENV NODE_ENV development

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npx nx affected --target=build
