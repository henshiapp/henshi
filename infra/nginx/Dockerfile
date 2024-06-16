FROM nginx:1.26.0-alpine AS base


FROM base AS dev
COPY /infra/nginx/nginx.conf /etc/nginx/templates/default.conf.template
CMD ["nginx-debug", "-g", "daemon off;"]


FROM node:20-alpine as builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN pnpm --filter @henshi/web install --frozen-lockfile
RUN pnpm --filter @henshi/web run -r build


FROM base AS prod
ENV NODE_ENV=production
COPY /infra/nginx/nginx.production.conf /etc/nginx/templates/default.conf.template
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/apps/web/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]