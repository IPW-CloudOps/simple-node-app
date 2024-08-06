ARG NODE_VERSION=20.14.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY public public
COPY src src
COPY types types
COPY .env .env
COPY index.mjs index.mjs

EXPOSE 3838

CMD npm run dev

# docker build --tag ipw/node-app -f Dockerfile.app .
# docker run -p 3838:3838 --name ipw-node-app --network ipw --rm ipw/node-app 
## For Interactive
# docker run -p 3838:3838 --name ipw-node-app --network ipw --rm -it ipw/node-app ash