FROM node:18.20.3

EXPOSE 3000

# RUN npm i 

# RUN mkdir /opt/app 
WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn
COPY . .

CMD ["yarn", "start"]