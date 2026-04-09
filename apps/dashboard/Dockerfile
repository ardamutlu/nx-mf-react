FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npx nx build dashboard --prod --skip-nx-cache

FROM nginx:alpine

ARG HOST_REDIRECT
RUN echo "Host redirect: $HOST_REDIRECT"

RUN apk add --no-cache gettext

WORKDIR /etc/nginx/conf.d

COPY infrastructure/docker/nginx.conf.template /etc/nginx/conf.d/default.conf.template

COPY --from=builder /app/dist/apps/dashboard /usr/share/nginx/html

EXPOSE 80

CMD envsubst '$host_redirect' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf \
    && nginx -g 'daemon off;'
