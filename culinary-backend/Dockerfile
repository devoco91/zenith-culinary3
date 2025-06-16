# syntax=docker/dockerfile:1

# Stage 1: Base Node.js image
ARG NODE_VERSION=20.13.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"
WORKDIR /app
ENV NODE_ENV=production

# Stage 2: Install dependencies & build
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    pkg-config \
    python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .

# Stage 3: Runtime container
FROM base AS runtime

# Copy only built app & deps
COPY --from=build /app /app
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 3000

CMD ["node", "server.js"]
