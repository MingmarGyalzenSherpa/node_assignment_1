FROM node:18-alpine

ARG PORT

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE $PORT

CMD ["npm","start"]