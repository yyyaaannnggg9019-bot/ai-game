#!/bin/bash

# Cloudflare Pages 构建脚本
echo "Installing dependencies..."
npm ci

echo "Running Prisma generate..."
npx prisma generate

echo "Building Next.js application..."
npm run build