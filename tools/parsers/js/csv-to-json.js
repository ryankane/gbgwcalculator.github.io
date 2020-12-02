const parseOpts = {
  header: true,
  dynamicTyping: true
};

const stores = {
  units: {
    filename: `../../src/data/csv/units.csv`
  },
  parts: {
    filename:`../../src/data/csv/parts.csv`
  },
  pilots: {
    filename: `../../src/data/csv/pilots.csv`
  },
  skills: {
    filename: `../../src/data/csv/skills.csv`
  },
  integrated: {
    filename: `../../src/data/csv/integrated.csv`
  }
};

const onReady = () => {
  populateData('#pilots', stores.pilots, {
    transformer: transformPilotData,
    sorter: (a, b) => a.name.localeCompare(b.name),
    format: true
  });
  populateData('#gunpla', stores.units, {
    transformer: transformUnitData,
    process: processUnitData,
    //filter: (record) => record['Issue'],
    sorter: (a, b) => a.name.localeCompare(b.name),
    format: true
  });

  setTimeout(() => {
    const gunplaJson = document.querySelector('#gunpla').value;
    saveToDisk(gunplaJson, 'gunpla.json');
  }, 3000);
}

const processUnitData = (units) => units.map(unit => {
  //if (unit['Name'].startsWith('ν')) {
  //  unit['Name'] = unit['Name'].replace('ν', 'Nu');
  //}
  return unit;
});

const formatName = ({Name, Subname}) => `${Name}${Subname ? ` [${Subname}]` : ''}`;

const lookupJobLicense = (jobLicense) =>
  `${jobLicense}`.split('/').map(jl => findByIndex(JobLicenseIndex, parseInt(jl, 10)));

const transformPilotData = (record) => {
  return {
    "name": formatName(record),
    "jl": lookupJobLicense(record['Job Lic']),
    "attribute": findByIndex(AttributeIndex, record['Attr']),
    "rarity": record['Rarity'],
    "level": record['Level'],
    "a": record['Armor'],
    "ma": record['Melee ATK'],
    "sa": record['Shot ATK'],
    "md": record['Melee DEF'],
    "sd": record['Shot DEF'],
    "br": record['Beam RES'],
    "pr": record['Phys. RES'],
    "wt": [record['W Tag 1'], record['W Tag 2']].map(tagId => findByIndex(WordTagIndex, tagId)),
    "ex": {
      "type": "Part Traits",
      "name": record['Trait']
    }
  };
};

const isSokai = (unit) => unit['Limited'] === true && unit['Capsule'] != null && unit['Capsule'].includes('Sokai');

const transformUnitData = (unit) => {
  let resultUnit = {
    "name": formatName(unit),
    "attribute": findByIndex(AttributeIndex, unit['Attr']),
    "rarity": unit['Rarity'],
    "level": unit['Level'],
    "sokai": isSokai(unit) ? 1 : 0,
    "parts": stores.parts.data
        .filter(part => part['Unit ID'] === unit['Index'])
        .map(part => {
          let exSkill = stores.skills.data.find(skill => skill['Index'] === part['EX ID']);
          let result = {
            "part": findByIndex(PartTypeIndex, part['Part Type']),
            "mark" : unit['Marks'],
            "a": part['Armor'],
            "ma": part['Melee ATK'],
            "sa": part['Shot ATK'],
            "md": part['Melee DEF'],
            "sd": part['Shot DEF'],
            "br": part['Beam RES'],
            "pr": part['Phys. RES'],
            "wt": [part['W Tag 1'], part['W Tag 2']].map(tagId => findByIndex(WordTagIndex, tagId)),
            "ex": {
              "type": part['Trait'] ? "Part Traits" : "EX Skill",
              "name": part['Trait']
            }
          };

          if (exSkill != null) {
            Object.assign(result.ex, {
              "name": exSkill['Name'],
              "description": exSkill['Description'],
              "category": ExCategoryIndex[exSkill['Cat'] - 1],
              "stats": {
                "Prc" : exSkill['Prc'],
                "Pow" : exSkill['Pow'],
                "Dur" : exSkill['Dur'],
                "Mag" : exSkill['Mag'],
                "Cd" : [ exSkill['Cd'], exSkill['Cd I'] ]
              }
            });

            // Prune null and undefined key-value pairs
            Object.keys(result.ex.stats).forEach(key => {
              if (result.ex.stats[key] == null) {
                delete result.ex.stats[key];
              }
            });
          }

          if (part['X Part']) {
            const info = stores.integrated.data.find(integrated => integrated['Part ID'] === part['Index']);
            result.combo = {
              type: findByIndex(PartTypeIndex, info['Integrated Part Type']),
              name: info['Integrated Part Name']
            };
          }

          if (part['Part Type'] > 5) {
            result.name = part['Part Name'];

            if (part['Part Type'] !== 8) {
              result.type = findByIndex(WeaponTypeIndex, part['Wep Type'])
              result.category = findByIndex(WeaponCategoryIndex, part['Wep Cat'])
            }
          }
          return result;
        })
  };

  return resultUnit;
};

main();