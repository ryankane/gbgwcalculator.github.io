const AttributeIndex = [
  'Power',
  'Technique',
  'Speed'
];

const JobLicenseIndex = [
  'All-Rounder',
  'Defender',
  'In-Fighter',
  'Out-Fighter',
  'Middle-Shooter',
  'Long-Shooter',
  'Supporter'
];

const ExCategoryIndex = [
  'Beam Shot',
  'Physical Shot',
  'Beam Melee',
  'Physical Melee',
  'Buff',
  'Awakening',
  'Debuff',
  'Recovery'
];

const PartTypeIndex = [
  'head',
  'body',
  'arms',
  'legs',
  'back',
  'melee',
  'range',
  'shield'
];

const PartTypeAltIndex = [
  'Head',
  'Torso',
  'Arms',
  'Legs',
  'Back',
  'Melee Wep.',
  'Ranged Wep.',
  'Shield'
];

const WeaponTypeIndex = [
  'Beam',
  'Physical'
];

const WeaponCategoryIndex = [
  'Axe',
  'Saber',
  'Module',
  'Dual Sabers',
  'Blade',
  'Lance',
  'Whip',
  'Rifle',
  'Machine Gun',
  'Long Rifle',
  'Gatling Gun',
  'Bazooka',
  'Twin Blade',
  'Twin Rifle'
];

const MeleeWeaponTypeLookup = {
  'Axe' : '6b',
  'Saber': '6a',
  'Module': null,
  'Dual Sabers': '6',
  'Blade': '6c',
  'Lance': '6d',
  'Whip': '6',
  'Twin Blade': '6'
};

const RangedWeaponTypeLookup = {
  'Rifle': '7a',
  'Machine Gun': '7c',
  'Long Rifle': '7b',
  'Gatling Gun': '7',
  'Bazooka': '7d',
  'Twin Rifle': '7'
};

const WordTagIndex = [
  'Protag.',
  'Mass P.',
  'Ace Excl.',
  'Amphib.',
  'Commander',
  'Close Combat',
  'Mid-Range',
  'Long-Range',
  'High Mobility',
  'High Firepower',
  'Heavy Armor',
  'Transformer',
  'Gundam Type',
  'Mobile Fighter',
  'Support Type',
  'Federation',
  'Zeon',
  'Zaku Type',
  'GM Type',
  'For Space',
  'For Desert',
  'For Tundra',
  'For Forest',
  'For Urban Area',
  'For Base',
  'For Computers'
];

const AiRangeIndex = [
  'Short-Range',
  'Mid-Range',
  'Long-Range'
];

const AiPriorityIndex = [
  'Solo',
  'Balanced',
  'Support'
];

const findByName = (index, name) => index.includes(name) ? index.indexOf(name) + 1 : null;
const findByIndex = (index, id) => index[id - 1];
const cleanValue = (val) => typeof val === 'string' && val === '-' ? null : val;

const setValue = (selector, data, format) => document.querySelector(selector).value = format
    ? js_beautify(JSON.stringify(data), js_beautify.defaultOptions())  // JSON.stringify(data, null, 2)
    : JSON.stringify(data);

const populateData = (selector, data, opts = {}) => {
  Promise.resolve(data.data)
      .then(data => opts.process ? opts.process(data) : data)
      .then(data => opts.filter ? data.filter(opts.filter) : data)
      .then(data => opts.groupBy
          ? Object.values(data.reduce((groups, record) => ((key) =>
              Object.assign(groups, {[key]: (groups[key] || []).concat(record)}))
          (typeof opts.groupBy === 'function' ? opts.groupBy(record) : record[opts.groupBy]), {}))
          : data)
      .then(data => opts.transformer ? data.map(record => opts.transformer(record)) : data)
      .then(data => opts.sorter ? data.sort(opts.sorter) : data)
      .then(data => setValue(selector, data, opts.format));
}

const fetchSheetData = (filename) => {
  return fetch(filename)
      .then(response => response.text())
      .then(csv => {
        return Papa.parse(csv, parseOpts);
      });
};

const main = () => {
  Object.keys(stores).forEach(key => {
    let store = stores[key];
    fetchSheetData(store.filename)
        .then(json => {
          store.data = json.data
          if (Object.values(stores).every(store => store.data)) {
            onReady();
          }
        })
  });
};

const saveToDisk = (text, filename) => saveAs(new File([text], filename, {type: "text/plain;charset=utf-8"}));
