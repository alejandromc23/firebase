# --------------------------------------------
# Base image
# --------------------------------------------
FROM node:lts-alpine AS base

# Install bash and dumb-init
RUN apk add --no-cache bash dumb-init && \
    npm i -g pnpm@7.33.3

# --------------------------------------------
# Build image
# --------------------------------------------
FROM base AS build
WORKDIR /usr/src/app

COPY . .

RUN pnpm install --frozen-lockfile && pnpm build

# --------------------------------------------
# Production image
# --------------------------------------------
FROM node:lts-alpine AS production
WORKDIR /usr/src/app

# Copy bash and dumb-init from base
COPY --from=base /bin/bash /bin/bash
COPY --from=base /usr/bin/dumb-init /usr/bin/dumb-init

# Reinstall bash pnpm
RUN apk add --no-cache bash && \
    npm i -g pnpm@7.33.3

# Copy necessary files and dependencies from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/pnpm-lock.yaml .

# Install production dependencies
RUN pnpm install --production --frozen-lockfile

# Use the non-root user 'node' to run the application
USER node

# Expose application port
EXPOSE $PORT

# Define start command
CMD ["dumb-init", "pnpm", "start"]
