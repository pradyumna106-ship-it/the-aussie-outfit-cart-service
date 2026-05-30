FROM node:20-alpine

WORKDIR /the-aussie-outfit-cart-service

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 5003

CMD ["npm", "start"]