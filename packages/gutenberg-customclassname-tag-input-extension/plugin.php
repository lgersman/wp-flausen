<?php

namespace wp_flausen\gutenberg_customclassname_tag_input_extension;

/**
 * Plugin Name:       wp-flausen/gutenberg-customclassname-tag-input-extension
 * Description:       Gutenberg extension using react-tag-input for custom classname panel.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Lars Gersmann<lars.gersmann@gmail.com>
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-customclassname-tag-input-extension
 *
 * @package           wp-flausen/gutenberg-customclassname-tag-input-extension
 */

namespace wp_flausen\gutenberg_customclassname_tag_input_extension;

$foo = 'bar';

error_log('huhu');

\add_action('enqueue_block_editor_assets', function () {
  $HANDLE = str_replace('_', '-', __NAMESPACE__);

  \wp_enqueue_script(
    $HANDLE,
    \plugins_url('build/index.js', __FILE__),
    ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
    filemtime(__DIR__ . '/build/index.js')
  );
  \wp_set_script_translations($HANDLE, 'foo');

  \wp_enqueue_style(
    $HANDLE,
    \plugins_url('build/index.css', __FILE__),
    [],
    filemtime(__DIR__ . '/build/index.css')
  );
});
