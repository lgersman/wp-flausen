<?php

/**
 * Plugin Name:       cm4all-wp-settings
 * Description:       A pimped settings screen (aka `php.options`) including filter and import/export capabilities.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cm4all-wp-settings
 *
 * @package           wp-flausen/cm4all-wp-settings
 */

namespace wp_flausen\super_options;

if (!defined('ABSPATH')) {
  exit();
}

\add_action('admin_menu', function () {
  \add_options_page(
    __('All settings'),
    __('All settings'),
    'administrator',
    'options.php'
  );

  // \add_options_page(
  //   __('*cm4all* settings'),
  //   __('*cm4all* settings'),
  //   'administrator',
  //   \add_query_arg(
  //     [
  //       'cm4all-wp-settings-filter-name' => '*cm4all*',
  //       // 'cm4all-wp-settings-filter-value' => '*font*',
  //     ],
  //     'options.php'
  //   )
  // );
});

\add_action('load-options.php', function () {
  $allowedOptions = [];

  \add_filter('allowed_options', function ($_allowedOptions) use (
    &$allowedOptions
  ) {
    $allowedOptions = array_merge(...array_values($_allowedOptions));
    return $_allowedOptions;
  });

  \get_current_screen()->add_help_tab([
    'id' => 'help-overview',
    'title' => __('Overview', 'cm4all-wp-settings'),
    'content' => '
      <p>
        cm4all-wp-settings extends Wordpress settings page by
        <ul>
          <li>Filtering by name and values.</li>
          <li>Display serialized php data values</li>
          <li>Export Wordpress options to JSON</li>
          <li>Import Wordpress options from JSON</li>
        </ul>
      </p>
    ',
  ]);

  \get_current_screen()->add_help_tab([
    'id' => 'help-filter',
    'title' => __('Filter', 'cm4all-wp-settings'),
    'content' => '
      <p>
      Name and Value Filter supports comma/space separated list of wildcard expressions.
      </p>
      <p>
      A wildcard expression may contain:
      <ul>
        <li><code>*</code> - matches any string</li>
        <li><code>?</code> - matches any single character</li>
        <li><code>\</code> - escapes the next character</li>
        <li>
          <code>!</code> - at the very beginning of the expression, negates the filter expression
          <p>
          The negotion excludes the matched option.
          </p>
        </li>
      </p>
    ',
  ]);

  \get_current_screen()->add_help_tab([
    'id' => 'help-export',
    'title' => __('Export', 'cm4all-wp-settings'),
    'content' => '
        <p>Enter a filter matching your need and press the <kbd>Export filtered options</kbd> Button</p>
    ',
  ]);

  \get_current_screen()->add_help_tab([
    'id' => 'help-import',
    'title' => __('Import', 'cm4all-wp-settings'),
    'content' => '
    <p>Press the <kbd>Import options</kbd> Button and select a options export.</p>
    ',
  ]);

  \get_current_screen()->add_help_tab([
    'id' => 'help-integration',
    'title' => __('Integration', 'cm4all-wp-settings'),
    'content' => '
<p>Just add the following code to your plugins php to add a filtered settings page</p>
<pre>
\add_options_page(
  __("*cm4all* settings"),
  __("*cm4all* settings"),
  "administrator",
  \add_query_arg(
    [
      "cm4all-wp-settings-filter-name" => "*cm4all*",
      // "cm4all-wp-settings-filter-value" => "*font*",
    ],
    "options.php"
  )
);
</pre>
    ',
  ]);

  \get_current_screen()->set_help_sidebar(
    sprintf(
      '<p><strong>%s</strong></p><p>%s</p><p>%s</p>',
      __('For more information:', 'cm4all-wp-settings'),
      __(
        '<a href="https://wordpress.org/plugins/cm4all-wp-cm4all-wp-settings/">cm4all-wp-settings Homepage</a>',
        'cm4all-wp-settings'
      ),
      __(
        '<a href="https://wordpress.org/plugins/cm4all-wp-cm4all-wp-settings/">Support</a>',
        'cm4all-wp-settings'
      )
    )
  );

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
      \wp_set_script_translations($HANDLE, 'cm4all-wp-settings');

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
          'window["cm4all-wp-settings"].allowedOptions = %s;',
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
        sprintf('window["cm4all-wp-settings"].presets = %s;', json_encode($options))
      );

      \wp_add_inline_script($HANDLE, 'window["cm4all-wp-settings"]();');
    }
  });
});
