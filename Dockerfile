
FROM node:18-alpine AS base
WORKDIR /app


FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci


FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .


RUN npx tsc --project tsconfig.worker.json

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]
