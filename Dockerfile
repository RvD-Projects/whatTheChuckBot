#https://docs.docker.com/get-started/02_our_app/

FROM node:16
WORKDIR /home/app
COPY  /assets ./assets
COPY  /distMin ./distMin
COPY .env .
COPY package-lock.json .
COPY package.json .
RUN npm install
COPY /tools/models/discord-xp/levels.js /home/app/node_modules/discord-xp/models/levels.js
CMD npm run start:min