FROM node:lts-alpine AS dev

ENV PORT 3333

WORKDIR /app
COPY --from=base /app/dist/apps/backend ./
RUN npm install --production
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express

EXPOSE ${PORT}

ENTRYPOINT [ "node", "./main.js" ]
