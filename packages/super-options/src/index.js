import './index.scss';

function debounce(func, wait = 100) {
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

  return tests.some((test) => test.matched);
}

window['super-options'] = function () {
  const optionsForm = document.querySelector('form[action="options.php"]');

  const filterFormContainer = document.createElement('div');

  optionsForm.parentNode.insertBefore(filterFormContainer, optionsForm);

  filterFormContainer.classList.add('super-options-container');
  filterFormContainer.innerHTML = `
    <form class="super-options-form">
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
<!--
          <label for="super-options-value-filter">Value contains:</label>
          <input 
            type="text" 
            id="super-options-value-filter" 
            size="40" 
            placeholder="localhost !*update*"
            title="Example : 'localhost !*update*'" 
          >
-->
        </div>
      </fieldset>
      </fieldset>
    </form>
  `;

  // console.log('sdfsddsfsdff');

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
            <pre>${preset.value}</pre>
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

  const filterSettings = debounce(() => {
    const byNameRules = parseFilter(nameFilterInput.value, true);
    // const byValueRules = parseFilter(valueFilterInput.value);

    for (const tr of document.querySelectorAll(
      'form[action="options.php"] TR:not(.super-options-additional-table-row)'
    )) {
      const input = tr.querySelector('input[type="text"]');

      const preset = window['super-options'].presets.find(
        (preset) => preset.name === input.name
      );

      if (preset) {
        const nameMatchesRules = matchesRules(byNameRules, preset.name);
        // const valueMatchesRules = true; // matchesRules(byNameRules, preset.name);

        for (const row of [tr, tr.nextElementSibling]) {
          row.style.display = nameMatchesRules ? 'inherit' : 'none';
        }
      }
    }
  });

  nameFilterInput.oninput = filterSettings;
  // valueFilterInput.oninput = filterSettings;
};

window['super-options'].allowedOptions = [];
window['super-options'].presets = [];
