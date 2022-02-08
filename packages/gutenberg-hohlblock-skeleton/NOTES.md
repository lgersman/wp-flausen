# general

add to .gitignore:

- wp-env-home
- build

# links

- see https://github.com/ryanwelcher/dynamic-block-template

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

# wp-cli

just wp-cli instead of wp-env ?

https://kulturbanause.de/blog/wordpress-routinen-mit-wp-cli-und-shell-skripten-automatisieren/

# i18n

seems an unresolved issue by wp-cli. tooling is completely within wp-env

- [#gettext #mo #wp-env] [Update MO files when purging](https://github.com/wp-cli/i18n-command/issues/126)

# bundler

- small esbuild based bundler : https://github.com/cometkim/nanobundle

  - see workaround for globals : https://github.com/cometkim/nanobundle/issues/12#issuecomment-997644966

- small rollup based bundler including globals : https://github.com/developit/microbundle

- https://github.com/adambrgmn/wp-bundler
