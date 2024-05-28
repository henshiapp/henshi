FROM node:20-slim AS base
RUN npm i -g pnpm


FROM base AS dependencies
WORKDIR /app
COPY package.json ./
RUN pnpm install


FROM base AS dev
WORKDIR /app
COPY --from=dependencies /app/ ./
ENV PATH ./node_modules/.bin/:$PATH
CMD ["pnpm", "run", "dev"]


FROM base as build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build
RUN pnpm prune --prod

FROM base AS prod
WORKDIR /app
COPY --from=build /app/.output/ ./.output/
COPY --from=build /app/node_modules ./node_modules
CMD [ "node", ".output/server/index.mjs" ]
