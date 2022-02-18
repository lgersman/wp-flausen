<?php

namespace wp_flausen\gutenberg_customclassname_tag_input_extension_theme_example;

if (!defined('ABSPATH')) {
  exit();
}

\add_action('enqueue_block_editor_assets', function () {
  $HANDLE = str_replace('_', '-', __NAMESPACE__);

  \wp_enqueue_script(
    $HANDLE,
    \get_theme_file_uri() . '/build/index.js',
    ['wp-flausen\gutenberg-customclassname-tag-input-extension'],
    filemtime(__DIR__ . '/build/index.js')
  );
  \wp_set_script_translations($HANDLE, 'foo');

  \wp_enqueue_style(
    $HANDLE,
    //\get_template_directory_uri() . '/build/index.css',
    \get_theme_file_uri() . '/build/index.css',
    ['wp-flausen\gutenberg-customclassname-tag-input-extension'],
    filemtime(__DIR__ . '/build/index.css')
  );
});

\add_action('wp_enqueue_scripts', function () {
  $HANDLE = str_replace('_', '-', __NAMESPACE__);

  \wp_enqueue_style(
    $HANDLE,
    \get_theme_file_uri() . '/build/index.css',
    [],
    filemtime(__DIR__ . '/build/index.css')
  );
});
