FROM node:lts-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV production
RUN npm i -y
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev"]
