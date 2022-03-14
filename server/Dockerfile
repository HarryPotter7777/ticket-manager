FROM node:16-alpine as builder

ENV NODE_ENV build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build \
    && npm prune --production

# ---

FROM node:16-alpine

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/ormconfig.json ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/dist/ ./dist/

EXPOSE 5500
CMD ["sh", "-c", "npm run seed ; npm run start:prod"]