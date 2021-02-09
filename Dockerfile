FROM node:10

EXPOSE 5000

# RUN npm i 

# RUN mkdir /opt/app 
WORKDIR /opt/app

COPY package*.json ./
RUN npm install --no-optional && npm cache clean --force
COPY . .

CMD ["node", "server.js"]