#https://docs.docker.com/get-started/02_our_app/

FROM node:16
WORKDIR /home/app
COPY  ../assets ./assets
COPY  ../distMin ./distMin
COPY ../.env .
COPY ../package-lock.json .
COPY ../package.json .
RUN npm install
CMD npm run start:min