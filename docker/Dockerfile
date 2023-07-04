# --------------------------------------------
# Base image
# --------------------------------------------
FROM node:lts-alpine AS base

# Install bash, dumb-init and pnpm
RUN apk add --no-cache bash dumb-init && \
    npm i -g pnpm@7.33.3

#---------------------------------------------
# Dependencies image
# --------------------------------------------
FROM base AS dependencies
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install:ci:prod 

RUN pnpm install --frozen-lockfile --prod

# --------------------------------------------
# Build image
# --------------------------------------------
FROM base AS build
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml tsconfig.json firebase-key.json ./
COPY src ./src

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install:ci:dev

RUN pnpm build

# --------------------------------------------
# Production image
# --------------------------------------------
FROM base AS production
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copy necessary files and dependencies
COPY --chown=node:node --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=dependencies /usr/src/app/package.json ./package.json
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Use the non-root user 'node' to run the application
USER node

# Expose application port
EXPOSE $PORT

# Define start command
CMD ["dumb-init", "pnpm", "start"]
