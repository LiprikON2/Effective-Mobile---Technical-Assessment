FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Fix for npm install taking 10 minutes
# ref: https://forums.docker.com/t/npm-install-in-docker-tutorial-is-taking-forever/139328/13
RUN npm config set strict-ssl false

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "run", "start"]