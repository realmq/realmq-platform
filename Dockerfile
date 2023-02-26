FROM node:16

LABEL \
  Description="RealMQ Platform" \
  Vendor="RealMQ GmbH" \
  Version="0.1.1"

WORKDIR /home/node/app

COPY package.json package-lock.json ./
RUN npm install

# add rest of source
COPY . .

CMD ["npm", "start"]

EXPOSE 8080
