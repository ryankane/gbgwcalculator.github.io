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

const tables = {
  events: {
    name: 'event',
    columns: [
      {name: 'id', field: 'Index', type: 'int'},
      {name: 'name', field: 'Name'},
      {name: 'exchange', field: 'Exchange'},
      {name: 'blueprints', field: 'Blueprints', type: 'boolean'},
      {name: 'start_date', field: 'Date'}
    ]
  },
  parts: {
    name: 'part',
    columns: [
      {name: 'id', field: 'Index', type: 'int'},
      {name: 'name', field: 'Part Name'},
      {name: 'collection_id', field: 'Collection ID'},
      {name: 'unit_id', field: 'Unit ID', type: 'int'},
      {name: 'part_type_id', field: 'Part Type', type: 'int'},
      {name: 'part_augment_type_id', field: 'X Part', type: 'int'},
      {name: 'rarity', field: 'Rarity', type: 'int'},
      {name: 'attribute_id', field: 'Attr', type: 'int'},
      {name: 'word_tag_1_id', field: 'W Tag 1', type: 'int'}, // Comment this out, when ready to use a join table...
      {name: 'word_tag_2_id', field: 'W Tag 2', type: 'int'}, // Comment this out, when ready to use a join table...
      {name: 'armor', field: 'Armor', type: 'int'},
      {name: 'melee_attack', field: 'Melee ATK', type: 'int'},
      {name: 'shot_attack', field: 'Shot ATK', type: 'int'},
      {name: 'melee_defense', field: 'Melee DEF', type: 'int'},
      {name: 'shot_defense', field: 'Shot DEF', type: 'int'},
      {name: 'beam_resistance', field: 'Beam RES', type: 'int'},
      {name: 'physical_resistance', field: 'Phys. RES', type: 'int'},
      {name: 'ex_skill_id', field: 'EX ID', type: 'int'},
      {name: 'trait', field: 'Trait'},
      {name: 'weapon_type_id', field: 'Wep Type', type: 'int'},
      {name: 'weapon_category_id', field: 'Wep Cat', type: 'int'},
      {name: 'notes', field: 'Notes'}
    ]
  },
  pilots: {
    name: 'pilot',
    columns: [
      {name: 'id', field: 'Index', type: 'int'},
      {name: 'name', field: 'Name'},
      {name: 'series_id', field: 'Series', type: 'int'},
      {name: 'issue', field: 'Issue', type: 'int'},
      {name: 'name_japanese', field: 'Japanese'},
      {name: 'rarity', field: 'Rarity', type: 'int'},
      {name: 'attribute_id', field: 'Attr', type: 'int'},
      {name: 'word_tag_1_id', field: 'W Tag 1', type: 'int'}, // Comment this out, when ready to use a join table...
      {name: 'word_tag_2_id', field: 'W Tag 2', type: 'int'}, // Comment this out, when ready to use a join table...
      {name: 'armor', field: 'Armor', type: 'int'},
      {name: 'melee_attack', field: 'Melee ATK', type: 'int'},
      {name: 'shot_attack', field: 'Shot ATK', type: 'int'},
      {name: 'melee_defense', field: 'Melee DEF', type: 'int'},
      {name: 'shot_defense', field: 'Shot DEF', type: 'int'},
      {name: 'beam_resistance', field: 'Beam RES', type: 'int'},
      {name: 'physical_resistance', field: 'Phys. RES', type: 'int'},
      {name: 'trait', field: 'Trait'},
      {name: 'job_license_id', field: 'Job Lic', type: 'int'},
      {name: 'ai_range_id', field: 'AI Range', type: 'int'},
      {name: 'ai_priority_id', field: 'AI Priority', type: 'int'},
      {name: 'obtained_capsule', field: 'Capsule'},
      {name: 'obtained_exchange', field: 'Exchange'},
      {name: 'release_date', field: 'Release Date'},
    ]
  },
  series: {
    name: 'series',
    columns: [
      {name: 'id', field: 'Id', type: 'int'},
      {name: 'title', field: 'Title'},
      {name: 'alternate', field: 'Alternate'}
    ]
  },
  skills: {
    name: 'ex_skill',
    columns: [
      {name: 'id', field: 'Index', type: 'int'},
      {name: 'name', field: 'Name'},
      {name: 'description', field: 'Description'},
      {name: 'ex_category_id', field: 'Cat', type: 'int'},
      {name: 'pierce', field: 'Prc'},
      {name: 'power', field: 'Pow'},
      {name: 'duration', field: 'Dur', type: 'int'},
      {name: 'magazine', field: 'Mag', type: 'int'},
      {name: 'cooldown', field: 'Cd', type: 'int'},
      {name: 'cooldown_initial', field: 'Cd I', type: 'int'}
    ]
  },
  units: {
    name: 'unit',
    columns: [
      {name: 'id', field: 'Index', type: 'int'},
      {name: 'model', field: 'Model'},
      {name: 'name', field: 'Name'},
      {name: 'subname', field: 'Subname'},
      {name: 'series_id', field: 'Series', type: 'int'},
      {name: 'issue', field: 'Issue', type: 'int'},
      {name: 'name_japanese', field: 'Japanese'},
      {name: 'rarity', field: 'Rarity', type: 'int'},
      {name: 'attribute_id', field: 'Attr', type: 'int'},
      {name: 'marks', field: 'Marks', type: 'int'},
      {name: 'obtained_capsule', field: 'Capsule'},
      {name: 'obtained_exchange', field: 'Exchange'},
      {name: 'obtained_banner', field: 'Limited'},
      {name: 'obtained_sokai', field: 'Sokai', type: 'boolean'},
      {name: 'release_date', field: 'Release Date'}
    ]
  },
  partTags: {
    name: 'part_tag',
    join: {store: 'parts', field: 'Index'},
    columns: [
      {name: 'part_id', field: 'Index'},
      {name: 'tag_id', fields: ['W Tag 1', 'W Tag 2']}
    ]
  },
  pilotTags: {
    name: 'pilot_tag',
    join: {store: 'pilots', field: 'Index'},
    columns: [
      {name: 'part_id', field: 'Index'},
      {name: 'tag_id', fields: ['W Tag 1', 'W Tag 2']}
    ]
  }
};

const onReady = () => {
  Object.keys(tables).forEach(key => loadSql(key));
}

const loadSql = (key) => {
  document.querySelector('#' + key).value = jsonToSql(key);
};

const jsonToSql = (key) => {
  if (tables[key].join) {
    return joinTable(key);
  }
  return oneToOneInsert(key);
};

const joinTable = (key) => {
  const table = tables[key],
      store = stores[table.join.store];
  return `INSERT INTO \`${table.name}\` (${table.columns.map(col => `\`${col.name}\``).join(', ')}) VALUES\n${store.data.flatMap(record => {
    return table.columns[1].fields.map(joinField => {
      return `(${[ record[table.columns[0].field], record[joinField] ].join(', ')})`;
    });
  }).join(',\n')};`;
};

const oneToOneInsert = (key) => {
  const table = tables[key],
      store = stores[key],
      columns = table.columns;
  return `INSERT INTO \`${table.name}\` (${columns.map(col => `\`${col.name}\``).join(', ')}) VALUES\n${store.data.map(record => {
    return `(${columns.map(column => {
      let value = record[column.field];
      if (value.trim().length === 0 && column.nullable !== true) {
        switch (column.type) {
          case 'boolean':
            return 0;
          default:
            return `NULL`;
        }
      } else {
        switch (column.type) {
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