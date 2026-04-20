const glossary = require('../data/glossary.json');

const terms = Object.keys(glossary).sort((a, b) => b.length - a.length);

const pattern = new RegExp(
  `\\b(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&')).join('|')})\\b`,
  'gi'
);

function addTooltips(text) {
  const seen = new Set();
  return text.replace(pattern, (match) => {
    const key = Object.keys(glossary).find(k => k.toLowerCase() === match.toLowerCase());
    if (!key) return match;
    const lower = key.toLowerCase();
    if (seen.has(lower)) return match;
    seen.add(lower);
    const tip = glossary[key].replace(/"/g, '&quot;');
    return `<span class="tooltip" data-tip="${tip}">${match}</span>`;
  });
}

module.exports = { addTooltips };
