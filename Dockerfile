FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json package.json
ADD . .
RUN npm install

EXPOSE 8080
EXPOSE 3000

CMD [ "npm", "start" ]

