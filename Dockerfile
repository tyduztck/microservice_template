FROM node:16.15.1-slim as base
WORKDIR /home/node/app
COPY package*.json ./
RUN npm i
COPY . .

FROM base as production
ENV NODE_PATH=./build
RUN npm run build 

FROM base as build-img
ENV NODE_PATH=./build
RUN npm run build
EXPOSE 4000
CMD node build/app.js 
