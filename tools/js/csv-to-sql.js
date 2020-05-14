const parseOpts = {
  header: true,
  dynamicTyping: false
};

const stores = {
  events: {
    filename: `../data/csv/events.csv`
  },
  parts: {
    filename: `../data/csv/parts.csv`
  },
  pilots: {
    filename: `../data/csv/pilots.csv`
  },
  series: {
    filename: `../data/csv/series.csv`
  },
  skills: {
    filename: `../data/csv/skills.csv`
  },
  units: {
    filename: `../data/csv/units.csv`
  }
};

const orm = {
  events: {
    name: 'event',
    columns: [
      {column: 'id', field: 'Index', type: 'int'},
      {column: 'name', field: 'Name'},
      {column: 'exchange', field: 'Exchange'},
      {column: 'blueprints', field: 'Blueprints', type: 'boolean'},
      {column: 'start_date', field: 'Date'}
    ]
  },
  parts: {
    name: 'part',
    columns: [
      {column: 'id', field: 'Index', type: 'int'},
      {column: 'name', field: 'Part Name'},
      {column: 'collection_id', field: 'Collection ID'},
      {column: 'unit_id', field: 'Unit ID', type: 'int'},
      {column: 'part_type_id', field: 'Part Type', type: 'int'},
      {column: 'part_augment_type_id', field: 'X Part', type: 'int'},
      {column: 'rarity', field: 'Rarity', type: 'int'},
      {column: 'attribute_id', field: 'Attr', type: 'int'},
      {column: 'word_tag_1_id', field: 'W Tag 1', type: 'int'},
      {column: 'word_tag_2_id', field: 'W Tag 2', type: 'int'},
      {column: 'armor', field: 'Armor', type: 'int'},
      {column: 'melee_attack', field: 'Melee ATK', type: 'int'},
      {column: 'shot_attack', field: 'Shot ATK', type: 'int'},
      {column: 'melee_defense', field: 'Melee DEF', type: 'int'},
      {column: 'shot_defense', field: 'Shot DEF', type: 'int'},
      {column: 'beam_resistance', field: 'Beam RES', type: 'int'},
      {column: 'physical_resistance', field: 'Phys. RES', type: 'int'},
      {column: 'ex_skill_id', field: 'EX ID', type: 'int'},
      {column: 'trait', field: 'Trait'},
      {column: 'weapon_type_id', field: 'Wep Type', type: 'int'},
      {column: 'weapon_category_id', field: 'Wep Cat', type: 'int'},
      {column: 'notes', field: 'Notes'}
    ]
  },
  pilots: {
    name: 'pilot',
    columns: [
      {column: 'id', field: 'Index', type: 'int'},
      {column: 'name', field: 'Name'},
      {column: 'series_id', field: 'Series', type: 'int'},
      {column: 'issue', field: 'Issue', type: 'int'},
      {column: 'name_japanese', field: 'Japanese'},
      {column: 'rarity', field: 'Rarity', type: 'int'},
      {column: 'attribute_id', field: 'Attr', type: 'int'},
      {column: 'word_tag_1_id', field: 'W Tag 1', type: 'int'},
      {column: 'word_tag_2_id', field: 'W Tag 2', type: 'int'},
      {column: 'armor', field: 'Armor', type: 'int'},
      {column: 'melee_attack', field: 'Melee ATK', type: 'int'},
      {column: 'shot_attack', field: 'Shot ATK', type: 'int'},
      {column: 'melee_defense', field: 'Melee DEF', type: 'int'},
      {column: 'shot_defense', field: 'Shot DEF', type: 'int'},
      {column: 'beam_resistance', field: 'Beam RES', type: 'int'},
      {column: 'physical_resistance', field: 'Phys. RES', type: 'int'},
      {column: 'trait', field: 'Trait'},
      {column: 'job_license_id', field: 'Job Lic', type: 'int'},
      {column: 'ai_range_id', field: 'AI Range', type: 'int'},
      {column: 'ai_priority_id', field: 'AI Priority', type: 'int'},
      {column: 'obtained_capsule', field: 'Capsule'},
      {column: 'obtained_exchange', field: 'Exchange'},
      {column: 'release_date', field: 'Release Date'},
    ]
  },
  series: {
    name: 'series',
    columns: [
      {column: 'id', field: 'Id', type: 'int'},
      {column: 'title', field: 'Title'},
      {column: 'alternate', field: 'Alternate'}
    ]
  },
  skills: {
    name: 'ex_skill',
    columns: [
      {column: 'id', field: 'Index', type: 'int'},
      {column: 'name', field: 'Name'},
      {column: 'description', field: 'Description'},
      {column: 'ex_category_id', field: 'Cat', type: 'int'},
      {column: 'pierce', field: 'Prc'},
      {column: 'power', field: 'Pow'},
      {column: 'duration', field: 'Dur', type: 'int'},
      {column: 'magazine', field: 'Mag', type: 'int'},
      {column: 'cooldown', field: 'Cd', type: 'int'},
      {column: 'cooldown_initial', field: 'Cd I', type: 'int'}
    ]
  },
  units: {
    name: 'unit',
    columns: [
      {column: 'id', field: 'Index', type: 'int'},
      {column: 'model', field: 'Model'},
      {column: 'name', field: 'Name'},
      {column: 'subname', field: 'Subname'},
      {column: 'series_id', field: 'Series', type: 'int'},
      {column: 'issue', field: 'Issue', type: 'int'},
      {column: 'name_japanese', field: 'Japanese'},
      {column: 'rarity', field: 'Rarity', type: 'int'},
      {column: 'attribute_id', field: 'Attr', type: 'int'},
      {column: 'marks', field: 'Marks', type: 'int'},
      {column: 'obtained_capsule', field: 'Capsule'},
      {column: 'obtained_exchange', field: 'Exchange'},
      {column: 'obtained_banner', field: 'Limited'},
      {column: 'obtained_sokai', field: 'Sokai', type: 'boolean'},
      {column: 'release_date', field: 'Release Date'}
    ]
  }
};

const onReady = () => {
  Object.keys(orm).forEach(key => loadSql(key));
}

const loadSql = (key) => {
  document.querySelector('#' + key).value = jsonToSql(key);
};

const jsonToSql = (key) => {
  const store = stores[key],
        name = orm[key].name,
        columns = orm[key].columns;

  return `INSERT INTO \`${name}\` (${columns.map(f => `\`${f.column}\``).join(', ')}) VALUES\n${store.data.map(record => {
    return `(${columns.map(f => {
      let value = record[f.field];
      if (value.trim().length === 0 && f.nullable !== true) {
        switch (f.type) {
          case 'boolean':
            return 0;
          default:
            return `NULL`;
        }
      } else {
        switch (f.type) {
          case 'boolean':
            return value === 'TRUE' || value === true ? 1 : 0;
          case 'int':
            return parseInt(value, 10);
          default:
            return `'${value.replace(/'/g, "''")}'`;
        }
      }
    }).join(', ')})`
  }).join(',\n')};`
};

main();