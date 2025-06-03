# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json và package-lock.json (hoặc yarn.lock)
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code (trừ node_modules, .next theo .dockerignore)
COPY . .

# Build project
RUN npm run build

# Stage 2: Serve static files
FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
# Copy file cấu hình nginx nếu cần (có thể bỏ qua)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
