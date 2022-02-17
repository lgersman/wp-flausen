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

add_action('admin_menu', function () {
  \add_options_page(
    __('All settings'),
    __('Super options'),
    'administrator',
    'options.php?super-options-filter-name=*foo*;super-options-readonly='
  );
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
    'title' => __('Overview', 'super-options'),
    'content' => '
      <p>
        Super-options extends Wordpress options by
        <ul>
          <li>Filtering by name and values.</li>
          <li>Display serialized data values in option tooltip</li>
          <li>Export Wordpress options to JSON</li>
          <li>Import Wordpress options from JSON</li>
        </ul>
      </p>
    ',
  ]);

  \get_current_screen()->add_help_tab([
    'id' => 'help-filter',
    'title' => __('Filter', 'super-options'),
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
    'title' => __('Export', 'super-options'),
    'content' => '
        <p>TODO</p>
    ',
  ]);

  \get_current_screen()->add_help_tab([
    'id' => 'help-import',
    'title' => __('Import', 'super-options'),
    'content' => '
        <p>TODO</p>
    ',
  ]);

  \get_current_screen()->add_help_tab([
    'id' => 'help-integration',
    'title' => __('Integration', 'super-options'),
    'content' => '
<p>TODO</p>
<pre>
function super_options_dashboard_link() { 
  add_options_page(__("All Settings"), __("All Settings"), "administrator", "options.php?super-options-filter-name=*foo*;super-options-readonly="); 
} 
add_action("admin_menu", "foo settings");
</pre>
    ',
  ]);

  \get_current_screen()->set_help_sidebar(
    sprintf(
      '<p><strong>%s</strong></p><p>%s</p><p>%s</p>',
      __('For more information:', 'super-options'),
      __(
        '<a href="https://wordpress.org/plugins/cm4all-wp-super-options/">super-options Homepage</a>',
        'super-options'
      ),
      __(
        '<a href="https://wordpress.org/plugins/cm4all-wp-super-options/">Support</a>',
        'super-options'
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
          'window["super-options"].allowedOptions = %s;',
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
        sprintf('window["super-options"].presets = %s;', json_encode($options))
      );

      \wp_add_inline_script($HANDLE, 'window["super-options"]();');
    }
  });
});
