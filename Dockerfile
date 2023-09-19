FROM node:alpine
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
CMD [ "npm" , "run" , "start" ]
EXPOSE 4000