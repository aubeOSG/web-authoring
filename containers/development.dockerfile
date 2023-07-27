FROM nikolaik/python-nodejs:python3.11-nodejs18 as base

RUN pip install awscli-local

WORKDIR /usr/authoring

COPY ./config/package.json ./config/package.json
COPY ./packages/utils/package.json ./packages/utils/package.json
COPY ./plugins/postcss-prefixer/package.json ./plugins/postcss-prefixer/package.json
COPY ./packages/content-block-editor/package.json ./packages/content-block-editor/package.json
COPY ./packages/content-block-editor-react/package.json ./packages/content-block-editor-react/package.json
COPY ./packages/content-blocks/columns/package.json ./packages/content-blocks/columns/package.json
COPY ./packages/content-blocks/multiple-choice/package.json ./packages/content-blocks/multiple-choice/package.json
COPY ./packages/content-blocks/introduction/package.json ./packages/content-blocks/introduction/package.json
COPY ./packages/content-blocks/timeline/package.json ./packages/content-blocks/timeline/package.json
COPY ./packages/ui/package.json ./packages/ui/package.json
COPY ./packages/templates/core/package.json ./packages/templates/core/package.json
COPY ./packages/player/package.json ./packages/player/package.json
COPY ./packages/runtime/package.json ./packages/runtime/package.json
COPY ./packages/editor/package.json ./packages/editor/package.json
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

COPY ./config ./config
COPY ./packages/utils ./packages/utils
COPY ./plugins/postcss-prefixer ./plugins/postcss-prefixer
COPY ./packages/content-block-editor/dist ./packages/content-block-editor/dist
COPY ./packages/content-block-editor-react/dist ./packages/content-block-editor-react/dist
COPY ./packages/content-blocks/columns/dist ./packages/content-blocks/columns/dist
COPY ./packages/content-blocks/multiple-choice/dist ./packages/content-blocks/multiple-choice/dist
COPY ./packages/content-blocks/introduction/dist ./packages/content-blocks/introduction/dist
COPY ./packages/content-blocks/timeline/dist ./packages/content-blocks/timeline/dist
COPY ./packages/ui ./packages/ui
COPY ./packages/templates/core ./packages/templates/core
COPY ./packages/player ./packages/player
COPY ./packages/runtime ./packages/runtime

RUN yarn install

COPY ./packages/editor ./packages/editor
COPY ./development.env ./packages/editor/.env

CMD ["yarn", "serve"]