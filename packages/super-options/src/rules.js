export function parseFilter(filters, fullMatch = false) {
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

export function matchesRules(rules, string) {
  const tests = rules.map((rule) => ({
    rule,
    matched: rule.regexp.exec(string),
  }));

  if (tests.some((test) => test.matched && test.rule.negotiate)) {
    return false;
  }

  return tests.length === 0 || tests.some((test) => test.matched);
}
