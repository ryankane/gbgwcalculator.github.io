// ==UserScript==
// @name         Dengeki GBM Table
// @namespace    com.dengekionline.wiki.gbm
// @version      1.2.0
// @description  Parses data from a Gunpla page on Dengeki and transforms it into a table.
// @author       rmkane
// @match        https://wiki.dengekionline.com/gbm/*
// @require      https://cdn.jsdelivr.net/npm/handsontable@7.4.2/dist/handsontable.full.min.js
// @resource     handsontableCSS https://cdn.jsdelivr.net/npm/handsontable@7.4.2/dist/handsontable.full.min.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==
(function() {
  /* global Handsontable */
  /* jshint sub:true */
  'use strict';

  const handsontableCSS = GM_getResourceText('handsontableCSS');

  GM_addStyle(handsontableCSS + [
    '.display-button {',
    '  position: absolute;',
    '  top: 1em;',
    '  right: 1em;',
    '  background: #4833E0;',
    '  background: -webkit-gradient(linear, center bottom, center top, from(#5a42f8), to(#130097));',
    '  background: linear-gradient(to bottom, #5a42f8, #130097);',
    '  background-color: #5a42f8;',
    '  border: 0.05em solid #555;',
    '  border-radius: 25%;',
    '  color: #FFF;',
    '  padding: 0.67em;',
    '  font-size: 1.25em;',
    '  font-weight: bold;',
    '  text-shadow: #000 0.05em 0.05em 0.1em;',
    '  cursor: pointer;',
    '}',
    '.display-button:hover {',
    '  background: -webkit-gradient(linear, center bottom, center top, from(#624ff7), to(#1400ad));',
    '  background: linear-gradient(to bottom, #624ff7, #1400ad);',
    '  background-color: #624ff7;',
    '}',
    'button:focus {',
    '  outline: none;',
    '}',
    '.modal {',
    '  display: none; /* Hidden by default */',
    '  position: fixed; /* Stay in place */',
    '  z-index: 1; /* Sit on top */',
    '  padding-top: 100px; /* Location of the box */',
    '  left: 0;',
    '  top: 0;',
    '  width: 100%; /* Full width */',
    '  height: 100%; /* Full height */',
    '  overflow: auto; /* Enable scroll if needed */',
    '  background-color: rgb(0,0,0); /* Fallback color */',
    '  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */',
    '}',
    '.modal-content {',
    '  position: relative;',
    '  background-color: #222;',
    '  margin: auto;',
    '  border: 1px solid #888;',
    '  width: 80%;',
    '  max-height: 50vh;',
    '}',
    '.modal-content-heading {',
    '  margin: 1em 0 0 0;',
    '  font-size: 2em;',
    '  font-weight: bold;',
    '  text-align: center;',
    '}',
    '.modal-title[data-rarity="1"] {',
    '  --title-color: #d1d1d1;',
    '}',
    '.modal-title[data-rarity="2"] {',
    '  --title-color: #63D297;',
    '}',
    '.modal-title[data-rarity="3"] {',
    '  --title-color: #649ed1;',
    '}',
    '.modal-title[data-rarity="4"] {',
    '  --title-color: #d164c2;',
    '}',
    '.modal-title {',
    '  color: var(--title-color);',
    '  text-shadow: #000 0.033em 0.033em 0.025em;',
    '}',
    '.modal-content-html {',
    '  padding: 1em;',
    '  padding-top: 2.5em;',
    '}',
    '.close {',
    '  display: inline-block;',
    '  position: absolute;',
    '  top: 0;',
    '  right: 0.33em;',
    '  color: #aaaaaa;',
    '  font-size: 2em;',
    '  font-weight: bold;',
    '}',
    '.close:hover, .close:focus {',
    '  color: #000;',
    '  text-decoration: none;',
    '  cursor: pointer;',
    '}',
    '#data-sheet {',
    '  --table-border-color: #444;',
    '  --table-header-background: #333;',
    '  --table-header-color: #FFF;',
    '}',
    /* Sheet row theme */
    '#data-sheet[data-rarity="1"] {',
    '  --background-color-row-first: #d1d1d1;',
    '  --background-color-row-odd:   #f7f7f7;',
    '  --background-color-row-even:  #FFFFFF;',
    '}',
    '#data-sheet[data-rarity="2"] {',
    '  --background-color-row-first: #63D297;',
    '  --background-color-row-odd:   #E7F9EE;',
    '  --background-color-row-even:  #FFFFFF;',
    '}',
    '#data-sheet[data-rarity="3"] {',
    '  --background-color-row-first: #649ed1;',
    '  --background-color-row-odd:   #e6f0f7;',
    '  --background-color-row-even:  #FFFFFF;',
    '}',
    '#data-sheet[data-rarity="4"] {',
    '  --background-color-row-first: #d164c2;',
    '  --background-color-row-odd:   #f7e6f6;',
    '  --background-color-row-even:  #FFFFFF;',
    '}',
    '#data-sheet .htCore tbody tr:nth-of-type(odd) > td {',
    '  background-color: var(--background-color-row-odd);',
    '}',
    '#data-sheet .htCore tbody tr:nth-of-type(even) > td {',
    '  background-color: var(--background-color-row-even);',
    '}',
    '#data-sheet .htCore tbody tr:first-child > td {',
    '  background-color: var(--background-color-row-first);',
    '  color: #FFF;',
    '}',
    /* All headers */
    '#data-sheet .handsontable th {',
    '  background-color: var(--table-header-background);',
    '  color: var(--table-header-color);',
    '}',
    /* Row headers */
    '#data-sheet .ht_clone_left th {',
    '  background-color: var(--table-header-background);',
    '  color: var(--table-header-color);',
    '}',
    /* Column headers */
    '#data-sheet .ht_clone_top th {',
    '  background-color: var(--table-header-background);',
    '  color: var(--table-header-color);',
    '}',
    /* Row headers */
    '#data-sheet .ht_clone_top_left_corner th {',
    '  border-bottom: 1px solid var(--table-border-color);',
    '}',
    '#data-sheet .ht_clone_left th {',
    '  border-right: 1px solid var(--table-border-color);',
    '  border-left: 1px solid var(--table-border-color);',
    '}',
    /* Column headers */
    '#data-sheet .ht_clone_top th {',
    '  border-top: 1px solid var(--table-border-color);',
    '  border-right: 1px solid var(--table-border-color);',
    '  border-bottom: 1px solid var(--table-border-color);',
    '}',
    '#data-sheet .ht_clone_top_left_corner th {',
    '  border-right: 1px solid var(--table-border-color);',
    '}',
    '#data-sheet .handsontable .changeType {',
    '  background: #555;',
    '  border-color: #666;',
    '}',
    /* Borders */
    '#data-sheet .handsontable th,',
    '#data-sheet .handsontable td {',
    '  border-right: 1px solid var(--table-border-color);',
    '  border-bottom: 1px solid var(--table-border-color);',
    '}',
    '#data-sheet .handsontable tr:first-child td,',
    '#data-sheet .handsontable tr:first-child th {',
    '  border-top: 1px solid var(--table-border-color);',
    '}',
    '#data-sheet .ht_master tr > td {',
    '  border-bottom: 1px solid var(--table-border-color);',
    '}',
    /* Right */
    '#data-sheet .ht_master tr > td {',
    '  border-right: 1px solid var(--table-border-color);',
    '}',
    '#data-sheet #data-sheet .handsontable .htNoFrame+td,',
    '#data-sheet .handsontable .htNoFrame+th,',
    '#data-sheet .handsontable.htRowHeaders thead tr th:nth-child(2),',
    '#data-sheet .handsontable td:first-of-type,',
    '#data-sheet .handsontable th:first-child,',
    '#data-sheet .handsontable th:nth-child(2) {',
    '    border-left: 1px solid var(--table-border-color);',
    '}',
    '#data-sheet .ht_clone_top_left_corner thead tr th:nth-last-child(2) {',
    '  border-right: 1px solid var(--table-border-color);',
    '}',
    '#data-sheet .handsontable th:last-child {',
    '  border-right: 1px solid var(--table-border-color);',
    '  border-bottom: 1px solid var(--table-border-color);',
    '}',
    /* Scroll bar */
    '::-webkit-scrollbar {', /* width */
    '  width: 6px;',
    '  height: 6px;',
    '}',
    '::-webkit-scrollbar-track {', /* Track */
    '  background: #111;',
    '}',
    '::-webkit-scrollbar-thumb {', /* Handle */
    '  background: #333;',
    '}',
    '::-webkit-scrollbar-thumb:hover {', /* Handle on hover */
    '  background: #555;',
    '}'
  ].join(''));

  const translations = {
    '頭' : 'Head',
    '体' : 'Body',
    '腕' : 'Arms',
    '足' : 'Legs',
    'バック' : 'Back',
    'シールド' : 'Shield',
    'Short_W' : 'Melee Wep.',
    'Short_W1' : 'Melee Wep. 1',
    'Short_W2' : 'Melee Wep. 2',
    'Short_W3' : 'Melee Wep. 3',
    'Short_W4' : 'Melee Wep. 4',
    'Long_W' : 'Ranged Wep.',
    'Long_W1' : 'Ranged Wep. 1',
    'Long_W2' : 'Ranged Wep. 2',
    'Long_W3' : 'Ranged Wep. 3',
    'Long_W4' : 'Ranged Wep. 4',
    '一体型パーツ' : 'Integerated Part',
    // Weapon types
    'サーベル' : 'Saber',
    'ダブルサーベル' : 'Dual Sabers',
    'アックス' : 'Axe',
    '大剣' : 'Blade',
    'ランス' : 'Lance',
    'モジュール' : 'Module',
    'ムチ' : 'Whip',
    'ライフル' : 'Rifle',
    'ロングライフル' : 'Long Rifle',
    'マシンガン' : 'Machine Gun',
    'バズーカ' : 'Bazooka',
    'ガトリングガン' : 'Gatling Gun',
    // Columns
    '部位' : 'Part',
    'パーツ名' : 'Part Name',
    'パーツ特性' : 'Trait',
    '備考' : 'Notes',
    '耐久力' : 'Armor',
    '攻撃力' : 'ATK',
    '防御力' : 'DEF',
    '耐性' : 'Res.',
    '格闘' : 'Melee',
    '射撃' : 'Shot',
    'ビーム' : 'Beam',
    '物理' : 'Phys.',
    'タグ' : 'Word Tag',
    // Skills
    'ビーム射撃' : 'Beam Shot',
    '物理射撃' : 'Physical Shot',
    'ビーム格闘' : 'Beam Melee',
    '物理格闘' : 'Physical Melee',
    '強化' : 'Buff',
    '覚醒' : 'Awakening',
    '弱体化' : 'Debuff',
    '回復' : 'Recovery',
    // Tags
    '主人公機' : 'Protag.',
    'ヒーロー・マシン' : 'Protag.',
    '量産機' : 'Mass P.',
    'エース専用機' : 'Ace Excl.',
    '水陸両用' : 'Amphib.',
    '司令マシン' : 'Commander',
    '指揮官機' : 'Commander',
    '接近戦' : 'Close Combat',
    '中距離戦' : 'Mid-Range',
    '遠距離戦' : 'Long-Range',
    '高機動' : 'High Mobility',
    '高火力' : 'High Firepower',
    '重装甲' : 'Heavy Armor',
    '可変' : 'Transformer',
    'ガンダムタイプ' : 'Gundam Type',
    'モビルファイター' : 'Mobile Fighter',
    'サポートマシン' : 'Support Type',
    '連邦' : 'Federation',
    'ジオン' : 'Zeon',
    'ザクタイプ' : 'Zaku Type',
    'ジムタイプ' : 'GM Type',
    '宇宙適正' : 'For Space',
    '砂漠適正' : 'For Desert',
    '寒冷地適正' : 'For Tundra',
    '森林適正' : 'For Forest',
    '市街地適正' : 'For Urban Area',
    '基地適正' : 'For Base',
    '電脳適正' : 'For Computers'
  };

  const keyDict = { };

  const globals = {
    hot : null
  };

  let displayButton = document.createElement('button');
  displayButton.innerHTML = 'Show<br>Table';
  displayButton.classList.add('display-button');
  displayButton.addEventListener('click', displayButtonClickHandler);
  document.body.appendChild(displayButton);

  modalWindow({ show: false }); // pre-initialize...

  // Adapted from: https://stackoverflow.com/a/51759691/1762224
  function modalWindow(options) {
    let opts = Object.assign({}, options);
    let modal = document.querySelector('.modal');
    if (modal == null) {
      modal = document.createElement('div');
      modal.classList.add('modal');
      let modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');
      modal.appendChild(modalContent);
      let modalCloseButton = document.createElement('span');
      modalCloseButton.classList.add('close');
      modalCloseButton.innerHTML = '&times;';
      modalCloseButton.addEventListener('click', (e) => modalWindow({ show : false }));
      modalContent.appendChild(modalCloseButton);
      let modalHeading = document.createElement('div');
      modalHeading.classList.add('modal-content-heading');
      modalHeading.textContent = 'Gunpla Data';
      modalContent.appendChild(modalHeading);
      let modalContentHtml = document.createElement('div');
      modalContentHtml.classList.add('modal-content-html');
      modalContent.appendChild(modalContentHtml);
      let dataSheet = document.createElement('div');
      dataSheet.setAttribute('id', 'data-sheet');
      modalContentHtml.appendChild(dataSheet);
      document.body.append(modal);

      const container = document.getElementById('data-sheet');
      globals.hot = new Handsontable(container, {
        width: '100%',
        height: 320,
        rowHeaders: true,
        colHeaders: true,
        filters: true,
        dropdownMenu: true,
        contextMenu: true,
        fixedRowsTop: 1,
        fixedColumnsLeft: 2,
        manualColumnMove: true,
        manualRowMove: true,
        manualColumnResize: true,
        manualRowResize: true,
        currentRowClassName: 'curr-row',
        licenseKey: 'non-commercial-and-evaluation',
        cells: function (row, col) {
          var cellProperties = {};
          cellProperties.renderer = cellRenderer;
          return cellProperties;
        }
      });

      function cellRenderer(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        if (row === 0) {
          //td.style.background = '#63D297';
          td.style.fontWeight = 'bold';
          td.style.textAlign = 'center';
        } else {
          if (row % 2 === 0) {
            //td.style.background = '#FFFFFF';
          } else {
            //td.style.background = '#E7F9EE';
          }
        }
        //td.style.color = '#000000';

        if (value === '―' || typeof value === 'boolean') {
          td.style.textAlign = 'center';
        } else if (!isNaN(value)) {
          td.style.textAlign = 'right';
        }
      }
    }

    modal.querySelector('.modal-content-heading').innerHTML = opts.title;
    if (opts.data) {
      globals.hot.loadData(opts.data.csv);
      modal.querySelector('#data-sheet').setAttribute('data-rarity', opts.data.rarity);
    }
    modal.style.display = opts.show ? 'block' : 'none';
  }

  function formatPower(value) {
    return value ? value.replace(/[－]/, '-').replace(/[＋]/, '+') : '';
  }

  function formatCooldown(value) {
    return value ? value.replace(/(\d+)秒（初回 (\d+)秒）/, '$1 ($2)') : '';
  }

  function parseEffectValues(effectValues) {
    let values = [];
    if (effectValues != null) {
      values = typeof effectValues === 'string' ? effectValues.split('／').map(v => parseInt(v, 10)) : [effectValues];
    }
    return values;
  }

  function skillTextWrapper(skillText) {
    let wrapper = {
      text : skillText,
      tokens : []
    };
    let index = 0;
    wrapper.text = wrapper.text.replace(/(\d+)/g, (match, p1, offset, string) => {
      let flag = '$' + index;
      wrapper.tokens.push({ value : parseInt(p1, 10), index : index });
      index += 1;
      return flag;
    });
    return wrapper;
  }

  function unwrapSkillText(wrapper, minValues, maxValues) {
    let result = wrapper.text;
    let index = 0;
    let valueIndex = -1;
    return result.replace(/(\$\d+)/g, (match, p1, offset, string) => {
      let value = wrapper.tokens[index].value;
      if (value === minValues[0]) {
        valueIndex = 0;
      }
      if (valueIndex > -1) {
        value = maxValues[valueIndex];
        valueIndex += 1;
      }
      index += 1;
      return value;
    });
  }

  function upgradeSkillText(text, minStats, maxStats) {
    let minEffectValues = parseEffectValues(minStats['効果値']);
    let maxEffectValues = parseEffectValues(maxStats['効果値']);
    return unwrapSkillText(skillTextWrapper(text), minEffectValues, maxEffectValues);
  }

  function displayButtonClickHandler() {
    const tables = [...document.querySelectorAll('table')];
    const info = tableToJsonDict(tables[0]);
    const partsJson = tableToJson(tables[1]);
    const statsJson = tableToJson(tables[2], 2);
    const wordsJson = tableToJson(tables[3]);
    const allJson = zipJsonArrays(partsJson, statsJson, wordsJson);

    let rarity = info['レアリティ'].split('').length;
    let star = info['レアリティ'].charAt(0);

    const traitTables = getTraitTables(tables);
    const skillTables = getSkillTables(tables);

    const traits = traitTables.map(table => tableToJsonDict(table, { multiline : true, delimiter : '、' }));
    const skills = skillTables.map(table => tableToJsonDict(table, { multiline : true, delimiter : '。' }));

    const counters = {
      trait : 0,
      skill : 0
    };

    allJson.forEach(record => {
      Object.assign(record, {
        'EX/TRAIT' : record['EXskill'] === true ? 'EX' : 'TRAIT',
        'EX Name'  : '-',
        'Details'  : '-',
        'Category' : '-',
        'Pierce'   : '-',
        'Power'    : '-',
        'Duration' : '-',
        'Magazine' : '-',
        'Cooldown' : '-'
      });

      if (record['EXskill'] === true) {
        let skill = skills[counters.skill];
        let skillTable = skillTables[counters.skill];
        let skillStatTable = tables[tables.indexOf(skillTable) + 1];
        let skillStats = tableToJson(skillStatTable);
        let minSkill = skillStats[0];
        let maxSkill = skillStats[skillStats.length - 1];
        let skillText = upgradeSkillText(skill['説明'], minSkill, maxSkill);

        let recoveryAmount = maxSkill['回復量（％）'];
        if (recoveryAmount != null) skillText = skillText.replace(/\d+％/, recoveryAmount + '%');

        Object.assign(record, {
          'EX Name'  : skill['名称'],
          'Details'  : skillText,
          'Category' : skill['カテゴリ'],
          'Pierce'   : formatPower(maxSkill['貫通']),
          'Power'    : formatPower(maxSkill['威力']),
          'Duration' : maxSkill['効果時間（秒）'],
          'Magazine' : maxSkill['弾数'],
          'Cooldown' : formatCooldown(maxSkill['クールタイム'])
        });

        counters.skill += 1;
      } else if (record['パーツ特性'] === true) {
        let trait = traits[counters.trait];
        let traitTable = traitTables[counters.trait];
        let traitStatTable = tables[tables.indexOf(traitTable) + 1];
        let traitStats = tableToJson(traitStatTable);
        let minTrait = traitStats[0];
        let maxTrait = traitStats[traitStats.length - 1];
        let traitText = upgradeSkillText(trait['説明'], minTrait, maxTrait);

        Object.assign(record, {
          'Details' : traitText,
        });

        counters.trait += 1;
      }

      delete record['EXskill'];
      delete record['パーツ特性'];
    });

    // Move the shield to the bottom.
    let shield = allJson.find(record => record['部位'] === 'Shield');
    if (shield) allJson.push(allJson.splice(allJson.indexOf(shield), 1)[0]);

    modalWindow({
      title : `<span class="modal-title" data-rarity="${rarity}">［${star}${rarity}］ ${info['型番']} ${info['名称']} （${info['属性']}）</span>`,
      data: {
        csv : translate(jsonToCsv(allJson, true)),
        rarity : rarity
      },
      show: true
    });
  }

  function getTraitTables(tables) {
    return getDictTables(tables, 1, '説明');
  }

  function getSkillTables(tables) {
    return getDictTables(tables, 2, 'カテゴリ');
  }

  function getDictTables(tables, index, text) {
    return [...tables].filter(table => {
      let th = table.querySelector(`tbody tr:nth-child(${index}) th`);
      return th != null && th.textContent === text;
    });
  }

  function textNodesAsText(node, options) {
    let opts = Object.assign({
      multiline : false,
      delimiter : ''
    }, options);
    return opts.multiline ? [...node.childNodes]
        .filter(child => child.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent.trim())
        .join(opts.delimiter) : node.textContent;
  }

  function jsonToCsv(data, includeHeader) {
    return (keys => (data => includeHeader ? [keys].concat(data) : data)(data.map(record => keys.map(key => record[key]))))(Object.keys(data[0]));
  }

  function translate(data) {
    return data.map(row => row.map(col => typeof col === 'string' ? col.split(/[\s-]/g).map(val => translations[val] ? translations[val] : val).join(' ') : col));
  }

  function csvToText(data) {
    return data.map(row => row.join('\t')).join('\n');
  }

  function tableToJson(table, skipRows=1) {
    let rows = [...table.querySelectorAll('tr')];
    for (let i = 0; i < skipRows; i++) rows.shift();
    let fields = skipRows === 1 ? getSingleHeaderFields(table) : getMultiHeaderFields(table);
    return rows.map(tr => {
      return [...tr.querySelectorAll('td')].reduce((record, td, index) => {
        return {...record, [fields[index]] : formatValue(fields[index], td.textContent)};
      }, {})
    }, []);
  }

  function tableToJsonDict(table, opts) {
    return [...table.querySelectorAll('tr')].reduce((result, row) => {
      //return Object.assign(result, { [row.querySelector('th').textContent] : textNodesAsText(row.querySelector('td'), opts)});
      const ths = [...row.querySelectorAll('th')];
      const tds = [...row.querySelectorAll('td')];
      return ths.reduce((res, th, index) => {
        return Object.assign(res, { [th.textContent] : textNodesAsText(tds[index], opts)})
      }, result);
    }, {});
  }

  function formatValue(field, value) {
    if (isNumeric(value)) {
      return parseInt(value, 10);
    } else if (value === '〇') {
      return true;
    } else if (value === '-' || value === '―') {
      return '';
    }
    return value;
  }

  function getSingleHeaderFields(table) {
    return [...table.querySelectorAll('th')].map(th => lookupKey(keyDict, th.textContent));
  }

  function getMultiHeaderFields(table) {
    let fields = [];
    let headers = [...table.querySelectorAll('th')];
    let subHeaders = [...table.querySelectorAll('tr:nth-child(2) td')];
    let tmp = [], cols = 0;
    headers.forEach(header => {
      cols += header.rowSpan;
      tmp.push({ name: header.textContent, count: 3 - header.rowSpan })
    });
    let step = 0;
    for (let col = 0; col < tmp.length; col++) {
      if (tmp[col].count === 1) {
        fields.push(lookupKey(keyDict, tmp[col].name));
      } else {
        for (let span = 0; span < tmp[col].count; span++) {
          fields.push(lookupKey(keyDict, tmp[col].name + '-' + subHeaders[step].textContent));
          step++;
        }
      }
    }
    return fields;
  }

  function zipJsonArrays(...tables) {
    return tables[0].map((record, index) => {
      return tables.reduce((result, table) => {
        return Object.assign(result, table[index])
      }, record);
    });
  }

  function lookupKey(dict, key, alphanumOnly=false) {
    return (lkey => dict[alphanumOnly ? lkey.replace(/[^0-9a-z]/gi, '') : lkey] || key)(key.toLowerCase());
  }

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
})();