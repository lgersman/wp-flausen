# About

Wordpress related monorepo containing experimental plugins/themes and stuff.

# The project is under heavy development and often has changing requirements and scope.

# usage

- `nvm install`

- `npm ci`

- `npx -y lerna bootstrap`

- watch/dev : `npm run storybook`

- build all packages in development mode : `NODE_ENV=development npx -y lerna run build`

- build static storybook : `npm run build-storybook`

  - you can try the generated static web site : `(cd dist/docs/storybook && python3 -m http.server)`

- `npm run wp-env:start` starts wp-env

  - `npm run wp-env:stop` and `npm run wp-env:destroy` will stop / destroy the wp-env instance
