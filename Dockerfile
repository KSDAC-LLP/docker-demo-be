FROM node:14.16.1-alpine3.13

WORKDIR /work

COPY . .

EXPOSE 3001

CMD [ "app.js" ]