ARG NODE_VERSION=20.14.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY index.mjs index.mjs
COPY public public
COPY src src

EXPOSE 3838

CMD node index.mjs