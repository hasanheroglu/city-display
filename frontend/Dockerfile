FROM node:alpine

ARG NG_APP_CITY_BACKEND_API
ENV NG_APP_CITY_BACKEND_API=$NG_APP_CITY_BACKEND_API

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli

RUN npm ci

CMD ["npm", "run", "start"]