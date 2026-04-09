FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json nx.json ./
RUN npm ci

COPY libs ./libs
COPY apps/${APP_NAME} ./apps/${APP_NAME}

RUN npx nx build host --prod --skip-nx-cache

FROM nginx:alpine
COPY apps/${APP_NAME}/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/apps/${APP_NAME} /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
