FROM node:20-alpine AS builder
WORKDIR /app

COPY ../../package.json ../../package-lock.json ../../nx.json ./
RUN npm ci

COPY ../../libs ./libs
COPY . .

RUN npx nx build host --prod --skip-nx-cache

FROM nginx:alpine
COPY apps/host/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/apps/host /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
