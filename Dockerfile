FROM node:alpine

ENV PORT 3000

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install

COPY ./ ./

ENV NODE_ENV production

RUN yarn run build

CMD ["npm", "run", "dev"]