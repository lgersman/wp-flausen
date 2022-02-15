import './index.scss';

function debounce(func, wait = 300) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

function parseFilter(filters, fullMatch = false) {
  const rules = Array.from(filters.matchAll(/[^\s,]+/g)).map(([filter]) => {
    const rule = {
      negotiate: filter.startsWith('!') && (filter = filter.slice(1)),
    };

    const escapedFilter = filter.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

    let regexpFilter = escapedFilter.replaceAll(
      /([\\])?\\(\*|\?)/g,
      ($0, $1, $2) => `${$1 || '.'}${$2}`
    );

    if (fullMatch) {
      regexpFilter = `^${regexpFilter}$`;
    }

    rule.regexp = new RegExp(regexpFilter);

    return rule;
  });

  return rules;
}

function matchesRules(rules, string) {
  const tests = rules.map((rule) => ({
    rule,
    matched: rule.regexp.exec(string),
  }));

  if (tests.some((test) => test.matched && test.rule.negotiate)) {
    return false;
  }

  return tests.length === 0 || tests.some((test) => test.matched);
}

window['super-options'] = function () {
  const optionsForm = document.querySelector('form[action="options.php"]');

  const filterFormContainer = document.createElement('div');

  optionsForm.parentNode.insertBefore(filterFormContainer, optionsForm);

  filterFormContainer.classList.add('super-options-container');
  filterFormContainer.innerHTML = `
    <form onSubmit="return false;" class="super-options-form">
      <fieldset>
        <legend>Super options</legend>
        <fieldset>
          <legend>Filter</legend>
          <div class="super-options-filter">
            <label for="super-options-name-filter">Name matches:</label>
            <input 
              type="text" 
              id="super-options-name-filter" 
              title="Example : 'widget_*, _page, !*transient*, mailserver_url'" 
              autofocus 
              size="40" 
              placeholder="widget_*, _page, !*transient*, mailserver_url"
            >
            <label for="super-options-value-filter">Value contains:</label>
            <input 
              type="text" 
              id="super-options-value-filter" 
              size="40" 
              placeholder="localhost !*update*"
              title="Example : 'localhost !*update*'" 
            >
            <div></div>
            <div class="super-options-filter-actions"> 
              <button 
                id="super-options-filter-actions-export"
                type="button"
                class="button"
                title="Export filtered options to JSON file."
              >Export filtered options</button>
              <input
                id="super-options-filter-actions-import-file"
                type="file"
                accept="application/json"
              >              
              <button 
                id="super-options-filter-actions-import"
                type="file"
                class="button"
                title="Import options from JSON file."
              >Import options</button>
            </div>
          </div>
        </fieldset>
      </fieldset>
    </form>
  `;

  for (const row of optionsForm.querySelectorAll('TR')) {
    const input = row.querySelector('INPUT[type="text"]');

    const preset = window['super-options'].presets.find(
      (preset) => preset.name === input.name
    );

    const TR = document.createElement('TR');
    TR.classList.add('super-options-additional-table-row');
    if (preset) {
      const htmlSlices = [];
      if (preset.unserialized_value !== null) {
        htmlSlices.push(`
          <details class="super-options-additional-table-row-column-deserialized-value">
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
        <details class="super-options-additional-table-row-column-value">
            <summary>Value:</summary>
            <pre>${preset.value.replace(/</gm, '&lt;')}</pre>
          </details>
        `);
      }

      TR.innerHTML = `
        <td colspan="2" class="super-options-additional-table-row-column">
          <div>autoload: ${preset.autoload}</div>
          ${htmlSlices.join('')}
        </td>`;
    }

    row.parentNode.insertBefore(TR, row.nextSibling);
  }

  const nameFilterInput = document.querySelector('#super-options-name-filter');
  const valueFilterInput = document.querySelector(
    '#super-options-value-filter'
  );

  const exportButton = document.querySelector(
    '#super-options-filter-actions-export'
  );
  const importButton = document.querySelector(
    '#super-options-filter-actions-import'
  );
  const importFileInput = document.querySelector(
    '#super-options-filter-actions-import-file'
  );

  const filterSettings = debounce(() => {
    const byNameRules = parseFilter(nameFilterInput.value, true);
    const byValueRules = parseFilter(valueFilterInput.value, false);

    for (const tr of document.querySelectorAll(
      'form[action="options.php"] TR:not(.super-options-additional-table-row)'
    )) {
      const input = tr.querySelector('input[type="text"]');

      const preset = window['super-options'].presets.find(
        (preset) => preset.name === input.name
      );

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
          ]('super-options-option-hidden');
        }
      }
    }

    exportButton.disabled = !document.querySelectorAll(
      'form[action="options.php"] TR:not(.super-options-additional-table-row):not(.super-options-option-hidden)'
    ).length;
  });

  nameFilterInput.oninput = filterSettings;
  valueFilterInput.oninput = filterSettings;

  exportButton.onclick = () => {
    console.log('export clicked');

    const optionsToExport = Object.fromEntries(
      Array.from(
        document.querySelectorAll(
          'form[action="options.php"] TR:not(.super-options-additional-table-row):not(.super-options-option-hidden) input[type="text"]:not(:disabled)'
        )
      ).map((input) => [input.name, input.value])
    );

    // @TODO: write file to local storage

    console.log({optionsToExport});
  };

  importButton.onclick = () => {
    console.log('import clicked');
    importFileInput.click();
  };

  importFileInput.onchange = async (event) => {
    console.log({message: 'import clicked', event});
    const file = event.target.files[0];

    try {
      const options = JSON.parse(await file.text());

      console.log({options});

      // @TODO: apply json to options fields

      // @TODO: highlight updated option input fields
    } catch (ex) {
      alert(`Failed to load json from file ${file.name}: ${ex.message}`);
    }

    event.target.value = '';
  };

  filterSettings();
};

window['super-options'].allowedOptions = [];
window['super-options'].presets = [];
