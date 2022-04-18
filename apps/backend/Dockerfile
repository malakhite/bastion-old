FROM node:lts-alpine AS dev

ENV PORT 3333

WORKDIR /app
COPY ./dist/apps/backend ./
RUN npm install --production
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express

EXPOSE ${PORT}

ENTRYPOINT [ "node", "/app/main.js" ]
