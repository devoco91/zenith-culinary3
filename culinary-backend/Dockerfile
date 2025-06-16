# syntax=docker/dockerfile:1

# Stage 1: Base image
ARG NODE_VERSION=20.13.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"
WORKDIR /app
ENV NODE_ENV=production

# Stage 2: Build with dependencies
FROM base AS build

# Install system deps for native builds (bcryptjs uses node-gyp)
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    python-is-python3 \
    pkg-config \
    node-gyp && \
    rm -rf /var/lib/apt/lists/*

# Copy lock + package for reproducible install
COPY package*.json ./

# Install dependencies including bcryptjs
RUN npm ci

# Copy app source
COPY . .

# Stage 3: Runtime
FROM base AS runtime

# Copy node_modules and source from build stage
COPY --from=build /app /app

# Expose app port
EXPOSE 3000

# Start command
CMD ["npm", "run", "start"]
