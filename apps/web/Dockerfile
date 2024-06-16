FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


FROM base as builder

WORKDIR /usr/src/app
COPY . .
RUN pnpm --filter @henshi/web install --frozen-lockfile
RUN pnpm --filter @henshi/web run -r build


FROM nginx:1.26.0-alpine AS prod

ENV NODE_ENV=production
COPY --from=builder /usr/src/app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]