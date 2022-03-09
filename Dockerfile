FROM node:alpine

ENV PORT 3000

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./ ./
RUN npm install -g npm@8.5.3
RUN npm install


ENV NODE_ENV production

# RUN npm run build

CMD ["npm", "run", "dev"]