FROM node:lts-alpine

ENV PORT 3333

WORKDIR /app
COPY ./dist/apps/backend ./
COPY ./bastion-do.crt ./
RUN npm install --production
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express pg

EXPOSE ${PORT}

ENTRYPOINT [ "node", "/app/main.js" ]
