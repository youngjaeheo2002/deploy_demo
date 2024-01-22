FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ./package*.json ./
RUN npm install

# bundle app source
COPY . .

EXPOSE 4200
CMD [ "npm", "start" ]