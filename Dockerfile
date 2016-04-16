FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ADD package.json /usr/src/app/
RUN npm install
ADD . /usr/src/app/
RUN npm run build

EXPOSE 8080
EXPOSE 3000

CMD [ "npm", "start" ]

