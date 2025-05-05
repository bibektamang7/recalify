FROM oven/bun:slim AS builder

WORKDIR /recordingBot

COPY . .

RUN bun install
ARG BACKEND_URL
ENV BACKEND_URL=$BACKEND_URL
RUN bun run build

# runner phase

FROM oven/bun:slim AS runner

WORKDIR /app

COPY --from=builder /recordingBot/dist ./dist 

CMD [ "bun", "dist/index.js" ]
