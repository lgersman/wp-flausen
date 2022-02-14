<?php

/**
 * Plugin Name:       super-options
 * Description:       A pimped wordpress options screen including filter and import/export capabilities.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       super-options
 *
 * @package           wp-flausen/super-options
 */

namespace wp_flausen\super_options;

\add_action('plugins_loaded', function () {
  $allowedOptions = [];

  \add_filter('allowed_options', function ($_allowedOptions) use (
    &$allowedOptions
  ) {
    $allowedOptions = array_merge(...array_values($_allowedOptions));
    return $_allowedOptions;
  });

  // for whatever reason we need to use a referene otherwise allowedOptions is empty ...
  \add_action('admin_enqueue_scripts', function ($hook) use (&$allowedOptions) {
    global $wpdb;

    if ($hook === 'options.php') {
      $HANDLE = str_replace('_', '-', __NAMESPACE__);

      \wp_enqueue_script(
        $HANDLE,
        \plugins_url('build/index.js', __FILE__),
        [],
        filemtime(__DIR__ . '/build/index.js'),
        true
      );
      \wp_set_script_translations($HANDLE, 'super-options');

      \wp_enqueue_style(
        $HANDLE,
        \plugins_url('build/index.css', __FILE__),
        [],
        filemtime(__DIR__ . '/build/index.css')
      );

      // attach allowed options to options page as global variable
      \wp_add_inline_script(
        $HANDLE,
        sprintf(
          'window["super-options"]?.allowedOptions = %s;',
          json_encode($allowedOptions)
        )
      );

      $options = (array) $wpdb->get_results(
        "SELECT * FROM $wpdb->options ORDER BY option_name"
      );

      $options = array_map(function ($option) {
        return [
          'name' => $option->option_name,
          'value' => $option->option_value,
          'unserialized_value' => match (is_serialized($option->option_value)) {
            false => null,
            true => match (is_serialized_string($option->option_value)) {
              false => unserialize($option->option_value),
              true => \maybe_unserialize($option->option_value)
            }
          },
          'autoload' => $option->autoload,
        ];
      }, $options);

      // attach allowed options to options page as global variable
      \wp_add_inline_script(
        $HANDLE,
        sprintf('window["super-options"]?.presets = %s;', json_encode($options))
      );
    }
  });
});
