FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npx nx build dashboard --prod --skip-nx-cache

FROM ardamutlu/base-nginx-alpine:latest AS production

COPY ../../infrastructure/docker/nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=builder /app/dist/apps/dashboard /usr/share/nginx/html

EXPOSE 80

CMD envsubst '$host_redirect' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf \
    && nginx -g 'daemon off;'
