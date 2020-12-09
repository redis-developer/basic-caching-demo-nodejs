FROM node:12

WORKDIR /usr/src/app

COPY yarn.lock

RUN yarn

COPY . .

EXPOSE PORT
CMD [ "node", "app.js" ]