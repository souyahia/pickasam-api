FROM node:16-alpine3.15

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN apk update && yarn install

COPY . .

RUN yarn build

ENV Server__Port 80
EXPOSE ${Server__Port}

RUN chmod +x /home/node/app/docker-entrypoint.sh

ENTRYPOINT ["sh", "/home/node/app/docker-entrypoint.sh"]
