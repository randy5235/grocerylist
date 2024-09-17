FROM node:18.20.3

EXPOSE 5000
EXPOSE 9229

# RUN npm i 

# RUN mkdir /opt/app 
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

CMD ["npx", "ts-node", "server.ts"]