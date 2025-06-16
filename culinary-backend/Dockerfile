# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.13.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"
WORKDIR /app
ENV NODE_ENV=production

# Build stage
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Production image
FROM base

COPY --from=build /app /app
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 3000
CMD [ "npm", "run", "start" ]
