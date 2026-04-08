# base-nginx-alpine.Dockerfile
FROM nginx:alpine

ARG HOST_REDIRECT=localhost
ENV host_redirect=$HOST_REDIRECT

RUN apk add --no-cache gettext

WORKDIR /etc/nginx/conf.d
