import './index.scss';
// import memoize from './memoize.js';
import unserialize from './php-unserialize.js';
import debounce from './debounce.js';
import {parseFilter, matchesRules} from './rules.js';

window['cm4all-wp-settings'] = function () {
  const self = window['cm4all-wp-settings'];
  const optionsForm = document.querySelector('form[action="options.php"]');

  let nameFilterInput,
    valueFilterInput,
    resetButton,
    exportButton,
    importButton,
    importFileInput,
    updateOptionsButton;
  const values = new (class extends Map {
    constructor() {
      super();

      this.reset();

      window.values = this;
    }

    get(key) {
      const value = super.get(key);

      if (value === undefined) {
        return null;
      }

      return value;
    }
    set(key, value) {
      if (value === undefined) {
        return;
      }

      super.set(key, value);

      const input = optionsForm.querySelector(
        `TR INPUT[type="text"][name="${key}"]`
      );

      if (input) {
        const preset = self.presets.find((_) => _.name === key);

        if (!input.disabled) {
          input.value = value;
        }

        input.classList[value !== preset.value ? 'add' : 'remove'](
          'cm4all-wp-settings-value-modified'
        );
      }

      const formIsDirty = self.presets.filter(
        (preset) => preset.value !== this.get(preset.name)
      ).length;
      if (resetButton) {
        resetButton.disabled = !formIsDirty;
      }
      if (updateOptionsButton) {
        updateOptionsButton.disabled = !formIsDirty;
      }
    }
    reset() {
      this.clear();
      for (const preset of self.presets) {
        this.set(preset.name, preset.value);
      }
    }
  })();

  function updateOptionDetails() {
    const trs = Array.from(
      document.querySelectorAll(
        'TR:not(.cm4all-wp-settings-additional-table-row'
      )
    );
    for (const preset of self.presets) {
      const value = values.get(preset.name);

      if (/*preset.value !== value &&*/ preset.unserialized_value) {
        for (const tr of trs) {
          if (tr.querySelector(`INPUT[type="text"][name="${preset.name}"]`)) {
            const pre = tr.nextElementSibling.querySelector('PRE');

            if (pre) {
              try {
                let textContent = preset.unserialized_value
                  ? JSON.stringify(unserialize(value), null, '  ')
                  : value;

                if (textContent.includes('\n')) {
                  textContent = textContent.replace(/</gm, '&lt;');
                }

                pre.textContent = textContent;
              } catch (ex) {
                alert(
                  `Error while unserializing php value of option "${preset.name}" :\n\n${value}\n\n${ex.message}`
                );
              }
            }
          }
        }
      }
    }
  }

  optionsForm.addEventListener('change', (event) => {
    if (
      event.target.tagName === 'INPUT' &&
      event.target.type === 'text' &&
      event.target.name
    ) {
      const input = optionsForm.querySelector(
        `TR INPUT[type="text"][name="${event.target.name}"]`
      );
      if (event.target === input) {
        values.set(input.name, input.value);
      }
    }
  });

  const filterFormContainer = document.createElement('div');

  optionsForm.parentNode.insertBefore(filterFormContainer, optionsForm);

  filterFormContainer.classList.add('cm4all-wp-settings-container');
  filterFormContainer.innerHTML = `
    <form onSubmit="return false;" class="cm4all-wp-settings-form">
      <fieldset>
        <legend></legend>
        <fieldset>
          <legend>Filter</legend>
          <div class="cm4all-wp-settings-filter">
            <label for="cm4all-wp-settings-name-filter">Name matches:</label>
            <input 
              type="text" 
              id="cm4all-wp-settings-name-filter" 
              title="Example : 'widget_*, _page, !*transient*, mailserver_url'" 
              autofocus 
              size="40" 
              placeholder="widget_*, _page, !*transient*, mailserver_url"
            >
            <label for="cm4all-wp-settings-value-filter">Value contains:</label>
            <input 
              type="text" 
              id="cm4all-wp-settings-value-filter" 
              size="40" 
              placeholder="localhost !*update*"
              title="Example : 'localhost !*update*'" 
            >
            <div>
              <button 
                id="cm4all-wp-settings-filter-actions-reset"
                type="button"
                class="button"
                title="Reset option values."
              >Reset</button>
            </div>
            <div class="cm4all-wp-settings-filter-actions"> 
              <button 
                id="cm4all-wp-settings-filter-actions-export"
                type="button"
                class="button"
                title="Export filtered options to JSON file."
              ><span class="dashicons dashicons-download"></span>Export filtered options</button>
              <input
                id="cm4all-wp-settings-filter-actions-import-file"
                type="file"
                accept="application/json"
              >              
              <button 
                id="cm4all-wp-settings-filter-actions-import"
                type="file"
                class="button"
                title="Import options from JSON file."
              ><span class="dashicons dashicons-upload"></span>Import options</button>
            </div>
          </div>
        </fieldset>
      </fieldset>
    </form>
  `;

  for (const row of optionsForm.querySelectorAll('TR')) {
    const input = row.querySelector('INPUT[type="text"]');

    const preset = self.presets.find((preset) => preset.name === input.name);

    const TR = document.createElement('TR');
    TR.classList.add('cm4all-wp-settings-additional-table-row');
    if (preset) {
      const htmlSlices = [];
      if (preset.unserialized_value !== null) {
        htmlSlices.push(`
          <details class="cm4all-wp-settings-additional-table-row-column-deserialized-value">
            <summary>Deserialized value:</summary>
            <pre>${JSON.stringify(
              preset.unserialized_value,
              null,
              '  '
            ).replace(/</gm, '&lt;')}</pre>
          </details>
          `);
      }

      if (preset.value.includes('\n')) {
        htmlSlices.push(`
        <details class="cm4all-wp-settings-additional-table-row-column-value">
            <summary>Value:</summary>
            <pre>${preset.value.replace(/</gm, '&lt;')}</pre>
          </details>
        `);
      }

      TR.innerHTML = `
        <td colspan="2" class="cm4all-wp-settings-additional-table-row-column">
          <div>autoload: ${preset.autoload}</div>
          ${htmlSlices.join('')}
        </td>`;
    }

    row.parentNode.insertBefore(TR, row.nextSibling);
  }

  nameFilterInput = document.querySelector('#cm4all-wp-settings-name-filter');
  valueFilterInput = document.querySelector('#cm4all-wp-settings-value-filter');
  resetButton = document.querySelector(
    '#cm4all-wp-settings-filter-actions-reset'
  );
  resetButton.disabled = true;
  resetButton.onclick = () => {
    values.reset();

    updateOptionDetails();
  };

  exportButton = document.querySelector(
    '#cm4all-wp-settings-filter-actions-export'
  );
  importButton = document.querySelector(
    '#cm4all-wp-settings-filter-actions-import'
  );
  importFileInput = document.querySelector(
    '#cm4all-wp-settings-filter-actions-import-file'
  );
  updateOptionsButton = optionsForm.querySelector(
    '.submit input[type="submit"]'
  );
  updateOptionsButton.disabled = true;

  const filterSettings = debounce(() => {
    const byNameRules = parseFilter(nameFilterInput.value, true);
    const byValueRules = parseFilter(valueFilterInput.value, false);

    for (const tr of optionsForm.querySelectorAll(
      'TR:not(.cm4all-wp-settings-additional-table-row)'
    )) {
      const input = tr.querySelector('input[type="text"]');

      const preset = self.presets.find((preset) => preset.name === input.name);

      if (preset) {
        const nameMatchesRules = matchesRules(byNameRules, preset.name);
        const valueMatchesRules = matchesRules(byValueRules, preset.value);

        const NameOrValueMatches =
          (byNameRules.length > 0 && nameMatchesRules) ||
          (byValueRules.length > 0 && valueMatchesRules);
        for (const row of [tr, tr.nextElementSibling]) {
          // hide option if neither name/value matches or no rule was entered
          row.classList[
            NameOrValueMatches || byNameRules.length + byValueRules.length === 0
              ? 'remove'
              : 'add'
          ]('cm4all-wp-settings-option-hidden');
        }
      }
    }

    exportButton.disabled = !optionsForm.querySelectorAll(
      'TR:not(.cm4all-wp-settings-additional-table-row):not(.cm4all-wp-settings-option-hidden)'
    ).length;
  });

  nameFilterInput.oninput = filterSettings;
  valueFilterInput.oninput = filterSettings;

  exportButton.onclick = () => {
    console.log('export clicked');

    const matchingOptions = Array.from(
      optionsForm.querySelectorAll(
        'TR:not(.cm4all-wp-settings-additional-table-row):not(.cm4all-wp-settings-option-hidden) input[type="text"]'
      )
    ).map((input) => input.name);
    const json = JSON.stringify(
      {
        filters: {
          name: nameFilterInput.value,
          value: valueFilterInput.value,
        },
        options: Object.fromEntries(
          Array.from(values.entries()).filter(([name]) =>
            matchingOptions.includes(name)
          )
        ),
      },
      null,
      2
    );
    /* download json to local file */
    const link = document.createElement('a');
    link.target = '_blank';
    link.style.display = 'none';
    const blob = new Blob([json], {
      type: 'application/json;charset=utf-8',
    });
    link.href = URL.createObjectURL(blob);
    link.download = 'cm4all-wp-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    /* -- */
  };

  importButton.onclick = () => {
    console.log('import clicked');
    importFileInput.click();
  };

  importFileInput.onchange = async (event) => {
    console.log({message: 'import clicked', event});
    const file = event.target.files[0];

    try {
      const json = JSON.parse(await file.text());

      nameFilterInput.value = json?.filters?.name ?? '';
      valueFilterInput.value = json?.filters?.value ?? '';

      const ignoredSettings = [];

      for (const [name, value] of Object.entries(json?.options ?? {})) {
        if (values.has(name)) {
          values.set(name, value);
        } else {
          ignoredSettings.push(name);
        }
      }

      if (ignoredSettings.length) {
        alert(
          'The following settings were not imported: \n\n' +
            ignoredSettings.join(', ') +
            '\n\n Only existing wordpress settings can be imported for safety reasons.'
        );
      }

      filterSettings();

      updateOptionDetails();
    } catch (ex) {
      alert(`Failed to load json from file ${file.name}: ${ex.message}`);
    }

    // reset file upload filed to be able to triger import again
    event.target.value = '';
  };

  for (const tr of optionsForm.querySelectorAll(
    'TR:not(.cm4all-wp-settings-additional-table-row)'
  )) {
    const input = tr.querySelector('input[type="text"].disabled');
    if (input) {
      const details = tr.nextElementSibling.querySelector('details');

      if (details) {
        input.parentNode.title = 'Click to toggle deserialized value view';
        input.parentNode.onclick = () => (details.open = !details.open);
      }
    }
  }
  const urlParams = Object.fromEntries(
    new URLSearchParams(document.location.search)
  );
  nameFilterInput.value = urlParams['cm4all-wp-settings-filter-name'] ?? '';
  valueFilterInput.value = urlParams['cm4all-wp-settings-filter-value'] ?? '';

  filterSettings();

  optionsForm.onsubmit = function () {
    // transfer values into form
    // enable input fields to be able to submit
    for (const [name, value] of values.entries()) {
      const input = this.querySelector(`input[name="${name}"]`);
      if (input) {
        input.value = value;
        input.disabled = false;
      }
    }
  };
};

window['cm4all-wp-settings'].allowedOptions = [];
window['cm4all-wp-settings'].presets = [];
