FROM node:16.15.1-slim as base

WORKDIR /usr/authoring

COPY ./config/package.json ./config/package.json
COPY ./packages/utils/package.json ./packages/utils/package.json
COPY ./plugins/postcss-prefixer/package.json ./plugins/postcss-prefixer/package.json
COPY ./packages/content-block-editor/package.json ./packages/content-block-editor/package.json
COPY ./packages/content-block-editor-react/package.json ./packages/content-block-editor-react/package.json
COPY ./packages/content-blocks/custom-block-one/package.json ./packages/content-blocks/custom-block-one/package.json
COPY ./packages/content-blocks/custom-block-two/package.json ./packages/content-blocks/custom-block-two/package.json
COPY ./packages/ui/package.json ./packages/ui/package.json
COPY ./packages/templates/core/package.json ./packages/templates/core/package.json
COPY ./packages/templates/block-text/package.json ./packages/templates/block-text/package.json
COPY ./packages/templates/lesson-intro/package.json ./packages/templates/lesson-intro/package.json
COPY ./packages/templates/simple-text/package.json ./packages/templates/simple-text/package.json
COPY ./packages/templates/simple-video/package.json ./packages/templates/simple-video/package.json
COPY ./packages/templates/two-column/package.json ./packages/templates/two-column/package.json
COPY ./packages/templates/quiz-template/package.json ./packages/templates/quiz-template/package.json
COPY ./packages/templates/inline-text/package.json ./packages/templates/inline-text/package.json
COPY ./packages/player/package.json ./packages/player/package.json
COPY ./packages/runtime/package.json ./packages/runtime/package.json
COPY ./packages/editor/package.json ./packages/editor/package.json
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

COPY ./config ./config
COPY ./packages/utils ./packages/utils
COPY ./plugins/postcss-prefixer ./plugins/postcss-prefixer
COPY ./packages/content-block-editor ./packages/content-block-editor
COPY ./packages/content-block-editor-react ./packages/content-block-editor-react
COPY ./packages/content-blocks/custom-block-one ./packages/content-blocks/custom-block-one
COPY ./packages/content-blocks/custom-block-two ./packages/content-blocks/custom-block-two
COPY ./packages/ui ./packages/ui
COPY ./packages/templates/core ./packages/templates/core
COPY ./packages/templates/block-text ./packages/templates/block-text
COPY ./packages/templates/lesson-intro ./packages/templates/lesson-intro
COPY ./packages/templates/simple-text ./packages/templates/simple-text
COPY ./packages/templates/simple-video ./packages/templates/simple-video
COPY ./packages/templates/two-column ./packages/templates/two-column
COPY ./packages/templates/quiz-template ./packages/templates/quiz-template
COPY ./packages/templates/inline-text ./packages/templates/inline-text
COPY ./packages/player ./packages/player
COPY ./packages/runtime ./packages/runtime

RUN yarn install

COPY ./packages/editor ./packages/editor
COPY ./dev.env ./packages/editor/.env

CMD ["yarn", "serve"]