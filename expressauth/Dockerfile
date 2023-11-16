FROM node:20 

WORKDIR /node

COPY package.json ./

RUN npm install

COPY . .
RUN ["chmod", "+x", "wait-for-it.sh"]

EXPOSE 3000

RUN npm run build
RUN npm run copy

RUN curl https://truststore.pki.rds.amazonaws.com/eu-central-1/eu-central-1-bundle.pem > ./dist/rds-ca-2019-eu-central-1.pem

CMD ["npm", "run", "dev"]
