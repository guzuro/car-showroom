FROM node:lts-alpine
WORKDIR /app/server
COPY [ "package.json", "yarn.lock", "./" ] 
RUN yarn install
COPY . .
RUN yarn build  
EXPOSE 3131
CMD [ "yarn", "run", "start" ]
