# syntax=docker/dockerfile:1

# Stage 1: Base Node.js image
ARG NODE_VERSION=20.13.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Set working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production


# Stage 2: Build dependencies
FROM base AS build

# Install OS packages for native builds
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    pkg-config \
    python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application source
COPY . .


# Stage 3: Final runtime image
FROM base AS runtime

# Copy from build stage
COPY --from=build /app /app

# Expose application port
EXPOSE 3000

# Start command
CMD ["npm", "run", "start"]
