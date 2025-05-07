FROM oven/bun:slim AS builder

WORKDIR /recordingBot

COPY package.json package.json 
COPY tsconfig.json tsconfig.json 

RUN bun install

COPY ./src ./src

RUN bun run build --external selenium-webdriver

FROM oven/bun:slim AS runner

WORKDIR /app

COPY --from=builder /recordingBot/dist ./dist 

ENTRYPOINT [ "bun", "./dist/index.js" ]
