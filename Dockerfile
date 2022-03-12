FROM node:alpine

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-engines

COPY . .

EXPOSE 3000

CMD ["npm", "run", "prod"]