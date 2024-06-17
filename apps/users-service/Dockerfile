FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build_server
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN pnpm --filter=@henshi/users-service install --frozen-lockfile
RUN pnpm build --projects=@henshi/users-service
RUN pnpm --filter @henshi/users-service deploy --prod /prod/server

FROM base AS production_server
ENV NODE_ENV=production
COPY --from=build_server /prod/server /prod/server
WORKDIR /prod/server

EXPOSE ${PORT} 3000
CMD [ "pnpm", "start:prod" ]