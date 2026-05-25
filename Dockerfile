# STAGE 1: BUILDER
FROM node:22-alpine AS builder

WORKDIR /app

# Chỉ copy file package trước để tận dụng cache của Docker layer
COPY package*.json ./
RUN npm ci

# Copy toàn bộ mã nguồn (trừ những gì đã nêu trong .dockerignore)
COPY . .

# Biên dịch TypeScript sang JavaScript
RUN npm run build

# STAGE 2: RUNNER
FROM node:22-alpine AS runner

WORKDIR /app

# Thiết lập môi trường Production
ENV NODE_ENV=production
ENV PORT=5005

# Chỉ cài đặt dependencies cần thiết cho runtime (omit devDependencies)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy kết quả build từ stage builder
COPY --from=builder /app/dist ./dist

# Sử dụng user 'node' có sẵn trong image để tăng tính bảo mật (không chạy bằng root)
USER node

EXPOSE 5005

# Chạy ứng dụng từ file đã build
CMD ["node", "dist/server.js"]
