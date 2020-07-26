const DEBUG = true;

const parseOpts = {
  header: true,
  dynamicTyping: true
}

const currWeek = moment().startOf('week').add('days', 3).format('yyyy-MM-DD');

document.addEventListener('DOMContentLoaded', () => {
  let worksheet = document.querySelector('textarea[name="worksheet"]');
  worksheet.addEventListener('keyup', update);
});

if (DEBUG === true) {
  fetchSheetData('./data/sample.tsv')
      .then(json => parseParts(json.data));
}

const update = (event) => {
  try {
    parseParts(Papa.parse(event.target.value, parseOpts).data);
  } catch (err) {
    console.log(err);
    return;
  }
};

const parseParts = (parts) => {
  const resultCache = {
    units: [],
    parts: [],
    pilots: [],
    skills: []
  };
  try {
    parts.forEach(part => parsePart(part, resultCache));
  } catch (err) {
    console.log(err);
    return;
  }
  Object.keys(resultCache).forEach(key => renderText(key, resultCache[key]));
};

const renderText = (key, data) => {
  const output = document.querySelector(`textarea[name="${key}"]`);
  output.value = data.map(entry => Object.values(entry).map(v => v == null ? '' : v).join('\t')).join('\n');
};

const parsePart = (part, resultCache) => {
  if (part['Part Type'] === 'Pilot') { applyPilot(part, resultCache); return; }
  if (part['Part Type'] === 'Head') applyUnit(part, resultCache);
  if (part['EX/TRAIT'] === 'EX') applySkill(part, resultCache);
  applyPart(part, resultCache);
};

const applyPart = (part, resultCache) => {
  let meleeType = MeleeWeaponTypeLookup[part['Weapon Category']];
  let rangedType = RangedWeaponTypeLookup[part['Weapon Category']];
  let tokens = part['Part Type'].match(/(\w[\w ]+)(?:\(\+ (\w+)\))?/);
  let partType = tokens[1];
  let xPartType = tokens[2];
  let rarity = parseInt(part['Obtained As'], 10);
  let type = findByName(PartTypeAltIndex, partType);
  let xtype = xPartType ? findByName(PartTypeAltIndex, xPartType) : null;
  type = meleeType != null ? 6 : rangedType != null ? 7 : type;
  let collectionType = meleeType ? meleeType : rangedType ? rangedType : type;

  resultCache.parts.push({
    'Index' : resultCache.parts.length + 1,
    'Name': part['Part Name'],
    'Collection ID' : `00-00-${collectionType}-01`,
    'Unit ID' : resultCache.units.length,
    'Part Type' : type,
    'X Part' : xtype,
    'Rarity' : rarity,
    'Attr': findByName(AttributeIndex, part['Attribute']),
    'W Tag 1': findByName(WordTagIndex, part['Word Tags']),
    'W Tag 2': findByName(WordTagIndex, part['Word Tags 2']),
    'Armor': part['Armor'],
    'Melee ATK': part['Melee ATK'],
    'Shot ATK': part['Shot ATK'],
    'Melee DEF': part['Melee DEF'],
    'Shot DEF': part['Shot DEF'],
    'Beam RES': part['Beam RES'],
    'Phys. RES': part['Phys. RES'],
    'EX ID' : part['EX/TRAIT'] === 'EX' ? resultCache.skills.length : null,
    'Trait': part['EX/TRAIT'] === 'TRAIT' ? part['Details'] : null,
    'Wep Type' : findByName(WeaponTypeIndex, part['Weapon Type']),
    'Wep Cat' : findByName(WeaponCategoryIndex, part['Weapon Category']),
    'Notes': part['Obtained From']
  });
};

const applySkill = (part, resultCache) => {
  let cd = part['Cooldown'].match(/(\d+)\s*\((\d+)\)/).slice(1).map(v => parseInt(v, 10));

  resultCache.skills.push({
    'Index': resultCache.skills.length + 1,
    'Name': part['EX Name'],
    'Description': part['Details'],
    'Cat': findByName(ExCategoryIndex, part['Category']),
    'Prc': cleanValue(part['Pierce']),
    'Pow': cleanValue(part['Power']),
    'Dur': cleanValue(part['Duration']),
    'Mag': cleanValue(part['Magazine']),
    'Cd': cd[0],
    'Cd I': cd[1]
  });
};

const applyPilot = (part, resultCache) => {
  let rarity = parseInt(part['Obtained As'], 10);
  resultCache.pilots.push({
    'Index': resultCache.pilots.length + 1,
    'Name': part['Part Name'],
    'Series': null,
    'Issue': null,
    'Japanese': null,
    'Rarity': rarity,
    'Attr': findByName(AttributeIndex, part['Attribute']),
    'W Tag 1': findByName(WordTagIndex, part['Word Tags']),
    'W Tag 2': findByName(WordTagIndex, part['Word Tags 2']),
    'Armor': part['Armor'],
    'Melee ATK': part['Melee ATK'],
    'Shot ATK': part['Shot ATK'],
    'Melee DEF': part['Melee DEF'],
    'Shot DEF': part['Shot DEF'],
    'Beam RES': part['Beam RES'],
    'Phys. RES': part['Phys. RES'],
    'Trait': part['Details'],
    'Job Lic': findByName(JobLicenseIndex, part['Job License']),
    'AI Range': findByName(AiRangeIndex, part['AI Type']),
    'AI Priority': findByName(AiPriorityIndex, part['AI Type 2']),
    'Capsule': null,
    'Exchange': null,
    'Other': null,
    'Release Date': currWeek,
    'Link': null
  });
}

const applyUnit = (part, resultCache) => {
  let name = part['Part Name'];
  let subname = null;
  let rarity = parseInt(part['Obtained As'], 10);

  if (name.includes('[')) {
    subname = name.substring(name.indexOf('[') + 1, name.indexOf(']'));
    name = name.substring(0, name.indexOf('['));
  }

  resultCache.units.push({
    'Index': resultCache.units.length + 1,
    'Model': null,
    'Name': name,
    'Subname': subname,
    'Series': null,
    'Issue': null,
    'Japanese': null,
    'Rarity': rarity,
    'Attr': findByName(AttributeIndex, part['Attribute']),
    'Marks': 5 - rarity,
    'Capsule': null,
    'Exchange': null,
    'Mission': null,
    'Other': null,
    'Limited': null,
    'Release Date': currWeek,
    'Notes': part['Obtained From']
  });
};