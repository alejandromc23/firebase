FROM node:20.3.1-bullseye-slim AS base

RUN apt-get update && \
    apt-get install -y --no-install-recommends dumb-init && \
    npm i -g pnpm@7.33.3
# --------------------------------------------
# Build image
# --------------------------------------------
FROM base as build
WORKDIR /usr/src/app

COPY . .

RUN pnpm install && pnpm build
# --------------------------------------------
# Production image
# --------------------------------------------
FROM build as production

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

RUN pnpm install:ci

USER node
WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/package.json ./package.json
COPY --chown=node:node --from=build /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml

CMD ["dumb-init", "pnpm", "start"]
