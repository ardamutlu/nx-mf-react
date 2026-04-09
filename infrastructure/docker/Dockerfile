# --------------------------------------
# BUILDER
# --------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

ARG APP_NAME

COPY package.json package-lock.json nx.json ./
COPY libs ./libs
COPY apps/${APP_NAME} ./apps/${APP_NAME}

RUN npm ci
RUN npx nx build ${APP_NAME} --prod --skip-nx-cache

# --------------------------------------
# PRODUCTION
# --------------------------------------
FROM nginx:alpine

COPY infrastructure/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/apps/${APP_NAME} /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
