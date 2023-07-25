FROM node:16.15.1-slim as base

WORKDIR /usr/authoring

# Uncomment the line below when testing locally with 'yarn prod:test'
# COPY ./production.test.env ./packages/editor/.env
# comment the line below when testing locally with 'yarn prod:test'
COPY ./.env ./packages/editor/.env
COPY ./package.json ./package.json
COPY ./lerna.json ./lerna.json
COPY ./yarn.lock ./yarn.lock
COPY ./config ./config
COPY ./packages/utils ./packages/utils
COPY ./plugins/postcss-prefixer ./plugins/postcss-prefixer
COPY ./packages/content-block-editor ./packages/content-block-editor
COPY ./packages/content-block-editor-react ./packages/content-block-editor-react
COPY ./packages/content-blocks/custom-inline-blocks ./packages/content-blocks/custom-inline-blocks
COPY ./packages/content-blocks/columns ./packages/content-blocks/columns
COPY ./packages/content-blocks/multiple-choice ./packages/content-blocks/multiple-choice
COPY ./packages/content-blocks/introduction ./packages/content-blocks/introduction
COPY ./packages/content-blocks/timeline ./packages/content-blocks/timeline
COPY ./packages/ui ./packages/ui
COPY ./packages/templates/core ./packages/templates/core
COPY ./packages/player ./packages/player
COPY ./packages/runtime ./packages/runtime
COPY ./packages/editor ./packages/editor

RUN yarn install
RUN yarn update

EXPOSE 80

CMD ["yarn", "deploy"]