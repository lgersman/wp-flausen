# general

add to .gitignore:

- wp-env-home
- build

# xdebug

- @INVESTIGATE: UGH! ... index.assets.php will be used by wp

- (not needed, because it's enabled by default) add this `.wp-env.json.override` file:

  ```
  "config": {
  "WP_DEBUG": true,
  "SCRIPT_DEBUG": true
  }
  ```

- start wordpress using `WP_ENV_HOME=wp-env-home node_modules/.bin/wp-env start --xdebug --debug`

# i18n

seems an unresolved issue by wp-env. tooling is completely within wp-env

# bundler

- small esbuild based bundler : https://github.com/cometkim/nanobundle

  - see workaround for globals : https://github.com/cometkim/nanobundle/issues/12#issuecomment-997644966

- small rollup based bundler including globals : https://github.com/developit/microbundle

- https://github.com/adambrgmn/wp-bundler
