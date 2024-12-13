FROM node:18-alpine AS builder

COPY ecosystem.config.js /app/ecosystem.config.

WORKDIR /app


COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4000

RUN npm run build

## production
FROM node:18-alpine

COPY ecosystem.config.js /app/ecosystem.config.js

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=production

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

RUN chown -R node:node /app && chmod -R 755 /app

RUN npm install pm2 

COPY ecosystem.config.js .

USER node

EXPOSE 4000



CMD ["pm2-runtime", "ecosystem.config.js"]




