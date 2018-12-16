FROM node:8.14.0-stretch

WORKDIR /usr/src/app/

COPY . /usr/src/app/
RUN chmod +x start-production.sh
RUN yarn install
