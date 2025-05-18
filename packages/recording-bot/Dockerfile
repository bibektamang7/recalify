FROM oven/bun:slim AS builder

WORKDIR /recordingBot

COPY package.json package.json 
COPY tsconfig.json tsconfig.json 

RUN bun install

ARG BACKEND_URL
ENV BACKEND_URL=$BACKEND_URL

COPY ./src ./src

RUN bun run build --external selenium-webdriver

FROM oven/bun:slim AS runner

WORKDIR /app

COPY --from=builder /recordingBot/package.json ./package.json
RUN bun install --production
RUN bun install chromedriver --chromedriver-force-download
COPY --from=builder /recordingBot/dist ./dist 

ENTRYPOINT [ "bun", "./dist/index.js" ]
