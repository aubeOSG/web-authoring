# Scrowl

## Getting Started

This project uses [yarn](https://yarnpkg.com/) to manage dependencies, you will need to have that installed.

`npm install yarn -g`

You will also need to have [AWS CLI](https://aws.amazon.com/cli/) installed. Once installed, you will need to [configure](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/configure/index.html) the tool.

You will also need to have [Docker](https://docs.docker.com/get-docker/) installed.

Next install the dependencies with `yarn install`.

Before starting the application, you will need to create the .envs files with `yarn create:envs`.

Now you can run the application with `yarn start:update`.

## Developing

When developing it is useful to open a second terminal to run `yarn watch`. The watch command checks on several packages for changes and ensures that the application can be rebuilt/HMR correctly.

If you aren't adding new dependencies than using `yarn start` to run the application will allow for quicker launch times. Otherwise you will need to run `yarn start:update`.

## Packages

### Editor

This package is the main application that allows users to build courses.

### Player

This package is what enables a user to consume a course.

### Runtime

This package is facade around the various SCORM APIs that can exist in an LMS.

### UI

This package contains styling and some basic components.

### Utils

This package contains helpers for primitives and some base objects.

### Content Block Editor & Content Block Editor React

The content block editor is a full copy of [EditorJS](https://github.com/codex-team/editor.js). The block editor react is a react component facade that wraps EditorJS.

### Content Blocks

These group of packages are our custom blocks use in the conte t editor.

### Config

This package is where we store settings for eslint, tsconfig, prettier, etc.
