FROM nginx:1.26.0-alpine AS base
COPY nginx.conf /etc/nginx/templates/default.conf.template


FROM base AS dev
CMD ["nginx-debug", "-g", "daemon off;"]


FROM base AS prod
CMD ["nginx", "-g", "daemon off;"]