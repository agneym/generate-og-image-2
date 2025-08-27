
FROM oven/bun:1-debian

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apt update && apt install -y \
    ca-certificates \
    procps \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/local/src/generate-og-image
WORKDIR /usr/local/src/generate-og-image

COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch --prod

COPY tsconfig.json bunfig.toml /usr/local/src/generate-og-image/
COPY src/ /usr/local/src/generate-og-image/src/
COPY __tests__/ /usr/local/src/generate-og-image/__tests__/

RUN bun run build-release

RUN chmod +x /usr/local/src/generate-og-image/dist/main.js

ENTRYPOINT ["/usr/local/src/generate-og-image/dist/main.js"]
