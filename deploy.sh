#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting TypeCast VPS Deployment..."

# 1. Pull the latest changes from Git
echo "Pulling latest changes from git..."
git pull origin main

# 2. Install production dependencies
echo "Installing dependencies..."
npm ci --legacy-peer-deps

# 3. Build Next.js application
echo "Building Next.js application..."
npm run build

# 4. Reload or start with PM2 zero-downtime
echo "Reloading PM2 process..."
pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js

# 5. Save PM2 state
pm2 save

echo "TypeCast successfully deployed and running!"

