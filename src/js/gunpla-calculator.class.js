class GunplaCalculator {
  constructor(dataStoreManager) {
    this.dataStoreManager = dataStoreManager;

    this.wordTagsTally = {};
    this.parametersTotal = {};
    this.attributesTally = {
      p: 0,
      t: 0,
      s: 0
    };
    this.inputs = {};
    this.comboParts = [];
    this.parts = {};
    this.partList = document.querySelector('.js-part-list');
    this.partNameCont = document.querySelector('.js-part-name');
    this.partParamCont = {};
    this.partWTCont = document.querySelector('.js-part-wt');
    this.partSkillTraitCont = document.querySelector('.js-part-skill-trait');
    this.partCont = {};
    this.filters = {
      'attr': '',
      'wt1': '',
      'wt2': '',
      'ex-cat': '',
      'part-trait': '',
      'weapon-type': ''
    };
    this.applyMapBonus = false;
    this.searchPart = '';
    this.sort = '';
    this.currentPart = '';
  }

  init() {
    Sorters.filter(s => s.isParam !== false).forEach(sorter => {
      this.partParamCont[sorter.slug] = document.querySelector('.js-part-total-' + sorter.slug);
    });
    AllSlots.forEach(slot => {
      this.inputs[slot] = document.querySelector('.js-input-' + slot);
      this.parts[slot] = [];
      this.partCont[slot] = this.inputs[slot].closest('.js-part-cont');
    });
    this._parseParts();
    this._sortParts();
    this._initInputClick();
    this._initFilters();
    this._initSort();
    this._initApplyMapBonus();
    this._initSearchPart();
    this._initRemove();
  }

  _generateSkillIcon(exData) {
    return `<span class='ex-cat-icon gbgw-skill-${exData.category.toLowerCase().replace(/\s/g, '-')}'></span>`;
  }

  _generateAttrIcon(attr) {
    return `<span class='attr-icon gbgw-attribute-${attr.toLowerCase()}'></span>`;
  }

  _parseParts() {
    if (AllSlots && Array.isArray(AllSlots)) {
      let Collections = this.dataStoreManager.getStoreData('Collections');
      if (Collections && Array.isArray(Collections)) {
        Collections.forEach(gunpla => {
          if (gunpla.parts && Array.isArray(gunpla.parts)) {
            const currGunpla = {
              ms: gunpla.name,
              level: gunpla.level
            };
            for (let part in gunpla) {
              if (gunpla.hasOwnProperty(part) && part !== 'parts' && part !== 'name') {
                currGunpla[part] = gunpla[part];
              }
            }
            gunpla.parts.forEach(part => {
              const gunplaClone = Object.assign({}, currGunpla);
              for (let prop in part) {
                if (part.hasOwnProperty(prop)) {
                  gunplaClone[prop] = part[prop];
                }
              }
              if (part.part) {
                this.parts[part.part].push(gunplaClone);
              }
            });
          }
        });
      }
      let Pilots = this.dataStoreManager.getStoreData('Pilots');
      if (Pilots && Array.isArray(Pilots)) {
        Pilots.forEach(currPilot => {
          const pilotClone = {
            part: 'pilot'
          };
          for (let prop in currPilot) {
            if (currPilot.hasOwnProperty(prop)) {
              pilotClone[prop] = currPilot[prop];
            }
          }
          this.parts.pilot.push(pilotClone);
        });
      }
      let GearTypes = this.dataStoreManager.getStoreData('GearTypes');
      if (GearTypes && typeof GearTypes === 'object') {
        Object.values(GearTypes).forEach((gears, index) => {
          let gearIndex = 'gear-slot-' + (index + 1);
          gears.forEach(currGear => {
            const gearClone = {
              part: gearIndex
            };
            for (let prop in currGear) {
              if (currGear.hasOwnProperty(prop)) {
                gearClone[prop] = currGear[prop];
              }
            }
            this.parts[gearIndex].push(gearClone);
          });
        });
      }
    }
  }

  _sortParts() {
    for (let type in this.parts) {
      switch (type) {
        case 'melee':
        case 'range':
        case 'shield':
          this.parts[type].sort((a, b) => {
            return a.name.localeCompare(b.name) || a.ms.localeCompare(b.ms);
          });
      }
    }
  }

  _initInputClick() {
    const inputs = this.inputs;
    for (let input in inputs) {
      if (inputs.hasOwnProperty(input) && inputs[input]) {
        inputs[input].addEventListener('click', e => this._handleInputClick(e.currentTarget));
      }
    }
  }

  _handleInputClick(input) {
    const slot = input.dataset.part;
    this.currentPart = slot;
    this._setSelectedPart(slot);
    this._showPartList(slot);
    this._displayPartInfo(input);
  }

  _checkFilter(part) {
    const filters = this.filters;
    if (this.filters.attr && part.attribute && part.attribute != this.filters.attr) {
      return false;
    }
    if (this.filters.wt1 && part.wt && part.wt.indexOf(this.filters.wt1) < 0) {
      return false;
    }
    if (this.filters.wt2 && part.wt && part.wt.indexOf(this.filters.wt2) < 0) {
      return false;
    }
    if (this.filters['part-trait']) {
      // The ex.name is can be the Part Trait or the EX Skill
      if (part.ex && part.ex.name) {
        return new RegExp(this.filters['part-trait'], 'i').test(part.ex.name);
      }
    }
    if (this.filters['ex-cat']) {
      if (part.ex && !part.jl) {
        return part.ex.category && part.ex.category === this.filters['ex-cat'];
      }
    }
    if (this.filters['weapon-type']) {
      switch (part.part) {
        case 'melee':
        case 'range':
          return part.type === this.filters['weapon-type'];
      }
    }
    if (this.searchPart.trim().length > 0) {
      let msMatches = part.ms ? GunplaCalculator.containsNormalized(part.ms, this.searchPart) : false;
      let nameMatches = part.name ? GunplaCalculator.containsNormalized(part.name, this.searchPart) : false;
      if (!(msMatches || nameMatches)) {
        return false;
      }
    }
    return true;
  }

  _showPartList(partToShow) {
    let Collections = this.dataStoreManager.getStoreData('Collections');
    if (this.partList && Collections && Array.isArray(Collections)) {
      this.partList.innerHTML = '';
      if (this.parts && this.parts[partToShow] && Array.isArray(this.parts[partToShow])) {
        const filteredParts = this._sortPartList([...this.parts[partToShow]]);
        filteredParts.forEach(currPart => {
          if (!this._checkFilter(currPart)) {
            return;
          }
          const partEntry = document.createElement('div');
          partEntry.dataset.partname = this._getDisplayText(currPart);
          partEntry.innerHTML = this._renderPartListItem(currPart);
          partEntry.classList.add('part-list__item');
          for (let prop in currPart) {
            partEntry.dataset[prop] = currPart[prop] instanceof Object ? JSON.stringify(currPart[prop]) : currPart[prop];
          }
          partEntry.addEventListener('click', e => this._handlePartSelection(e.currentTarget));
          partEntry.addEventListener('mouseover', e => this._displayPartInfo(e.currentTarget));
          this.partList.appendChild(partEntry);
        });
      }
    }
  }

  _sortPartList(parts) {
    const sortType = this.sort;
    const isGear = GearSlot.indexOf(parts) !== -1;
    if (sortType && (!isGear || (isGear && sortType === 'rarity'))) {
      parts.sort((partA, partB) => {
        return (partA[sortType] || 0) > (partB[sortType] || 0) ? -1 : 1;
      });
    }
    return parts;
  }

  _renderPartListItem(part) {
    let result = part.attribute ? this._generateAttrIcon(part.attribute) : '';
    result += this._getDisplayText(part);
    if (part.combo) {
      result += `<span class="combo-plus"><span class="gbgw gbgw-slot-${part.combo.type}"></span></span>`;
    }
    if (part.level) {
      result += `<span class="part-level" data-level="${part.level}">${part.level}</span>`;
    }
    return result;
  }

  _getDisplayText(part) {
    if (part.jl) {
      return `${part.name} (${part.jl.join('/')})`; // Pilot
    } else if (part.part.startsWith('gear-') || part.ms.startsWith('Unassigned [')) {
      return `${part.name}`; // Gear or no assigned unit
    } else if (part.name) {
      return `${part.name} (${part.ms})`; // Armament
    } else {
      return `${part.ms}`; // Any other part
    }
  }

  _handlePartSelection(currTarget) {
    let partInput, partData;
    if (currTarget.dataset.part && this.inputs[currTarget.dataset.part]) {
      partData = currTarget.dataset.part;
      partInput = this.inputs[partData];
      partInput.value = partInput.title = currTarget.dataset.partname;
      this._removeAllAttributes(partInput);
      Object.assign(partInput.dataset, currTarget.dataset);
      this._deleteMarks(partData);
      if (MarksAllowed.includes(partData)) {
        this._addMarks();
      }
      this._displayPartInfo(currTarget);

      // Update the icons.
      let slotText = partInput.dataset.category ? partInput.dataset.category : partInput.dataset.jl ? JSON.parse(partInput.dataset.jl).join('/') : SlotTextMap[partInput.dataset.part];
      let parentRow = partInput.closest('.row');
      let slotIconWrapper = parentRow.querySelector('.part-slot-type');
      slotIconWrapper.innerHTML = `<span class="slot-icon ${this._getPartSlotClass(currTarget.dataset)}" data-rarity="${currTarget.dataset.rarity}" title="${slotText}"></span>`;
      let attrIconWrapper = parentRow.querySelector('.part-slot-attr');
      if (attrIconWrapper) {
        attrIconWrapper.innerHTML = `<span class="gbgw-attribute-${currTarget.dataset.attribute.toLowerCase()}" data-rarity="${currTarget.dataset.rarity}" title="${currTarget.dataset.attribute}"></span>`;
      }

      if (WeaponSlots.includes(currTarget.dataset.part)) {
        let cls = WeaponIconMap[`${currTarget.dataset.part}-${currTarget.dataset.type.toLowerCase()}`];
        let weaponTypeWrapper = parentRow.querySelector('.weapon-type');
        weaponTypeWrapper.innerHTML = `<span class="gbgw-${cls}" data-rarity="${currTarget.dataset.rarity}" title="${currTarget.dataset.type}"></span>`;
      }
    }
    this._calculate(partData);
  }

  _getPartSlotClass(dataset, forcePart) {
    let partClass = 'gbgw-';
    if (forcePart) {
      partClass += SlotIconMap[forcePart];
    } else {
      if (dataset.category) {
        switch (dataset.part) {
          case 'melee': partClass += 'short-range-' ; break;
          case 'range': partClass += 'long-range-'  ; break;
        }
        partClass += dataset.category.toLowerCase().replace(/\s/g, '-');
      } else if (dataset.jl) {
        const [job] = JSON.parse(dataset.jl);
        partClass += 'job-' + job.toLowerCase();
      } else {
        partClass += SlotIconMap[dataset.part];
      }
    }
    return partClass;
  }

  _setSelectedPart(partId) {
    const partClass = 'selected-part';
    Array.from(document.querySelectorAll('.selected-part')).forEach(selectedPart => {
      selectedPart.classList.remove(partClass);
    });
    if (this.partCont[partId]) {
      this.partCont[partId].classList.add(partClass);
    }
  }

  _calculate(partData) {
    this._toggleComboPart(partData);
    this._displaySkillTraits(partData);
    this._loopThroughInput();
    this._displayPartsWordTags();
  }

  _toggleComboPart(partData) {
    if (this.inputs[partData]) {
      const partInput = this.inputs[partData];
      if (Array.isArray(this.comboParts)) {
        for (let i = 0; i < this.comboParts.length; i++) {
          const comboPart = this.comboParts[i];
          if (comboPart.part && comboPart.combo && partInput.dataset.part) {
            if (comboPart.part == partInput.dataset.part) {
              this._clearComboPart(comboPart.combo, i);
              break;
            } else if (partInput.dataset.combo) {
              const comboData = JSON.parse(partInput.dataset.combo);
              if  (comboData.type === comboPart.combo) {
                this._clearParts(comboPart.part);
                this._clearComboPart(comboPart.combo, i);
                break;
              }
            }
          }
        }
      }
      if (partInput.dataset.combo && partInput.dataset.part) {
        const partRarity = partInput.dataset.rarity;
        const comboData = JSON.parse(partInput.dataset.combo);
        this._clearParts(comboData.type);
        this.comboParts.push({
          part: partInput.dataset.part,
          combo: comboData.type
        });

        let comboInput = this.inputs[comboData.type];
        comboInput.value = comboData.name;
        comboInput.dataset.rarity = partRarity;
        comboInput.disabled = true;

        // Update the icons.
        let slotText = SlotTextMap[comboData.type];
        let slotIconWrapper = comboInput.closest('.row').querySelector('.part-slot-type');
        slotIconWrapper.innerHTML = `<span class="slot-icon ${this._getPartSlotClass(null, comboData.type)}" data-rarity="${partInput.dataset.rarity}" title="${slotText}"></span>`;
        let attrIconWrapper = comboInput.closest('.row').querySelector('.part-slot-attr');
        attrIconWrapper.innerHTML = `<span class="gbgw-attribute-${partInput.dataset.attribute.toLowerCase()}" data-rarity="${partInput.dataset.rarity}" title="${partInput.dataset.attribute}"></span>`;
      }
    }
  }

  _clearComboPart(part, index) {
    this.inputs[part].disabled = false;
    this.comboParts.splice(index, 1);
    this._clearParts(part);
  }

  _applyAttributes(el, attrs) {
    for (let attr in attrs) {
      el.setAttribute(attr, attrs[attr]);
    }
    return el;
  }

  _removeAttributes(el, attrs) {
    attrs.forEach(attr => el.removeAttribute(attr));
    return el;
  }

  _displaySkillTraits(partData) {
    if (this.inputs[partData]) {
      const partInput = this.inputs[partData];
      let exData, partTrait;
      if (partInput && partInput.dataset.part && partInput.dataset.ex) {
        partTrait = document.querySelector('.js-skill-trait-' + partInput.dataset.part);
        exData = JSON.parse(partInput.dataset.ex);
        if (exData.type && exData.name && partTrait) {
          partTrait.innerHTML = exData.type === 'EX Skill' ?
              this._generateSkillIcon(exData) + exData.name + this._appendExStats(exData) : exData.name.replace(/,/, '<br>');
          if (exData.description) {
            this._applyAttributes(partTrait, {
              'aria-label': '[' + exData.category + '] ' + exData.description,
              'data-balloon-pos': 'down',
              'data-balloon-length': 'fit'
            });
            partTrait.addEventListener('click', toggleTooltip);
            partTrait.addEventListener('touchstart', toggleTooltip);
          } else {
            this._removeAttributes(partTrait, ['aria-label', 'data-balloon-pos', 'data-balloon-length']);
            partTrait.removeEventListener('click', toggleTooltip);
            partTrait.removeEventListener('touchstart', toggleTooltip);
          }
        }
      } else {
        this._clearSkillTrait(partData);
      }
    }
  }

  _appendExStats(exSkill) {
    if (exSkill.stats) {
      let result = [];

      if (exSkill.stats.Prc) {
        result.push(`Prc: ${exSkill.stats.Prc}`);
      }

      if (exSkill.stats.Pow) {
        result.push(`Pow: ${exSkill.stats.Pow}`);
      }

      if (exSkill.stats.Dur) {
        result.push(`Dur: ${exSkill.stats.Dur}s`);
      }

      if (exSkill.stats.Mag) {
        result.push(`Mag: ${exSkill.stats.Mag}`);
      }

      if (exSkill.stats.Cd) {
        result.push(`CD: ${exSkill.stats.Cd[0]}s (${exSkill.stats.Cd[1]}s)`);
      }

      return `<div class="ex-stats">${result.map(stat => `<span class="ex-stat">${stat}</span>`).join(`<span class="ex-stat-spacer"></span>`)}</div>`;
    }

    return '';
  }

  _clearSkillTrait(partData) {
    if (partData && document.querySelector('.js-skill-trait-' + partData)) {
      document.querySelector('.js-skill-trait-' + partData).textContent = '';
    }
  }

  _loopThroughInput() {
    const inputList = this.inputs;
    this._resetWordTagTally();
    this._resetParameters();
    this._resetAttributesTally();
    console.log('--------------------');
    for (let inputName in inputList) {
      if (inputList.hasOwnProperty(inputName) && this.inputs[inputName]) {
        const input = this.inputs[inputName];
        if (input) {
          this._tallyWordTags(input);
          this._calculateParameters(input);
          this._tallyAttributes(input);
        }
      }
    }
    this._displayWordTagsTally();
    this._displayParametersTotal();
    this._displayAttributesTally();
  }

  _resetWordTagTally() {
    this.wordTagsTally = {};
  }

  _tallyWordTags(inputName) {
    if (inputName && inputName.dataset.wt) {
      const wordTags = JSON.parse(inputName.dataset.wt),
          doubleForCombo = inputName.dataset.combo ? 2 : 1;
      if (Array.isArray(wordTags)) {
        wordTags.forEach(wordTag => {
          this.wordTagsTally[wordTag] = wordTag in this.wordTagsTally ? this.wordTagsTally[wordTag] + doubleForCombo : doubleForCombo;
        });
      }
    }
  }

  _displayWordTagsTally() {
    const activeWordTag = document.querySelector('.js-active-wt');
    activeWordTag.innerHTML = '';
    for (let tally in this.wordTagsTally) {
      if (this.wordTagsTally[tally] >= ActiveWordTagMin) {
        const tallyDiv = document.createElement('div');
        tallyDiv.textContent = tally;
        activeWordTag.appendChild(tallyDiv);
      }
    }
    console.log('this.wordTagsTally', this.wordTagsTally);
  }

  _resetParameters() {
    this.parametersTotal = {};
    Sorters.filter(s => s.isParam !== false).forEach(sorter => {
      if ('slug' in sorter) {
        this.parametersTotal[sorter.slug] = 0;
      }
    });
  }

  _calculateParameters(inputName) {
    if (inputName && inputName.dataset.part) {
      const markMultiplier = this._getMarkMultiplier(inputName.dataset.part);
      Sorters.filter(s => s.isParam !== false).forEach(sorter => {
        const slug = sorter.slug;
        if (slug && inputName.dataset[slug] && slug in this.parametersTotal) {
          let data = inputName.dataset[slug];
          let partMultiplier = 0;
          if (isNaN(data)) {
            // Gears are sometimes objects that contain a multiplier formula.
            data = JSON.parse(data);
            if (data.attrs) {
              partMultiplier = data.attrs.reduce((sum, slug) => sum + this.parametersTotal[slug], 0) * data.multiplier;
            }
          } else {
            partMultiplier = parseInt(data, 10);
          }
          let finalMultiplier = markMultiplier ?
              partMultiplier + (partMultiplier * markMultiplier) : partMultiplier;
          this.parametersTotal[slug] += Math.floor(finalMultiplier); // Everything at this time is a straight addition.
        }
      });
    }
  }

  _displayParametersTotal() {
    this._applyWordTagBonus();
    this._applyJobLicenseBonus();
    for (let paramTotal in this.parametersTotal) {
      document.querySelector('.js-total-' + paramTotal).textContent = this.parametersTotal[paramTotal];
    }
  }

  _resetAttributesTally() {
    this.attributesTally = {
      p: 0,
      t: 0,
      s: 0
    };
  }

  _tallyAttributes(partData) {
    if (partData && partData.dataset.attribute && partData.dataset.attribute.charAt(0).toLowerCase() in this.attributesTally) {
      const doubleForCombo = partData.dataset.combo ? 2 : 1;
      this.attributesTally[partData.dataset.attribute.charAt(0).toLowerCase()] += doubleForCombo;
    }
  }

  _displayAttributesTally() {
    for (let tally in this.attributesTally) {
      document.querySelector('.js-tally-' + tally).textContent = this.attributesTally[tally];
    }
  }

  _applyWordTagBonus() {
    const tallyMap = {};
    console.log('Total Raw Attributes:', this.parametersTotal);
    let tagTally = 0;
    for (let tagName in this.wordTagsTally) {
      const currTagName = tagName;
      if (this.wordTagsTally[currTagName] >= ActiveWordTagMin) {
        const foundTag = this._getWordTag(currTagName);
        if (WordTagData.some(wt => wt.type === 'map' && wt.name === currTagName)) {
          tagTally++;
        }
        if (foundTag && foundTag.multiplier && foundTag.parameters && Array.isArray(foundTag.parameters)) {
          foundTag.parameters.forEach(tagParam => {
            tallyMap[tagParam] = tagParam in tallyMap ? this._roundValue(tallyMap[tagParam] + foundTag.multiplier) : foundTag.multiplier;
          });
        }
      }
    }
    if (tagTally && this.applyMapBonus && Array.isArray(Sorters)) {
      Sorters.filter(s => s.isParam !== false).forEach(sorter => {
        tallyMap[sorter.slug] = tallyMap[sorter.slug] ? this._roundValue(tallyMap[sorter.slug] + MultiplierBuffMap) : MultiplierBuffMap;
      });
    }
    console.log('Word Tag Multipliers', tallyMap);
    for (let tag in tallyMap) {
      if (tag in this.parametersTotal) {
        this.parametersTotal[tag] = Math.round(this.parametersTotal[tag] + this.parametersTotal[tag] * tallyMap[tag]);
      }
    }
    console.log('Total Attributes With WT Bonus:', this.parametersTotal);
  }

  _getWordTag(wordTag) {
    return WordTagData.find(tag => wordTag === tag.name);
  }

  _applyJobLicenseBonus() {
    const selectedPilot = document.querySelector('.js-select-pilot'),
        pilotInput = this.inputs.pilot;
    if (pilotInput && pilotInput.dataset.jl) {
      const jobLicense = this._getJobLicense(pilotInput.dataset.jl[0]);
      if (jobLicense && jobLicense.multiplier && jobLicense.parameters && Array.isArray(jobLicense.parameters)) {
        jobLicense.parameters.forEach(jobParam => {
          if (jobParam in this.parametersTotal) {
            this.parametersTotal[jobParam] = Math.round(this.parametersTotal[jobParam] + this.parametersTotal[jobParam] * jobLicense.multiplier);
          }
        });
      }
    }
    console.log('Total Attributes With WT Bonus and Job Bonus:', this.parametersTotal);
  }

  _getJobLicense(license) {
    return PilotType.find(type => license === type.name);
  }

  _displayPartsWordTags() {
    const input = this.inputs;
    for (let props in input) {
      if (input.hasOwnProperty(props)) {
        const inputData = this.inputs[props];
        if (inputData) {
          if (!this._displayWordTags(inputData) && input[props].disabled === false) {
            this._clearWordTag(props);
          }
        }
      }
    }
  }

  _clearWordTag(wordTag) {
    let wordTagEl = document.querySelector('.js-wt-' + wordTag);
    if (wordTagEl) {
      wordTagEl.innerHTML = '';
    }
  }

  _clearParts(inputName) {
    if (inputName && inputName in this.inputs) {
      const input = this.inputs[inputName];
      input.value = '';
      input.title = '';
      this._removeAllAttributes(input);
      Object.assign(input.dataset, document.createElement('input').dataset);
      this._clearSkillTrait(inputName);
      this._clearWordTag(inputName);
      this._deleteMarks(inputName);

      let parentRow = input.closest('.row');
      let slotIconWrapper = parentRow.querySelector('.part-slot-type');
      let slotIcon = slotIconWrapper.querySelector('.slot-icon');
      slotIcon.className = `slot-icon gbgw-${SlotIconMap[inputName]}`;
      slotIcon.removeAttribute('data-rarity');
      slotIcon.setAttribute("title", SlotTextMap[inputName]);
      let attrIconWrapper = parentRow.querySelector('.part-slot-attr');
      if (attrIconWrapper) attrIconWrapper.innerHTML = '';
      let weaponTypeWrapper = parentRow.querySelector('.weapon-type');
      if (weaponTypeWrapper) weaponTypeWrapper.innerHTML = '';
    }
  }

  /**
   * @private
   * @param {HTMLElement|string} filterEl
   * @param {Object[]} data
   */
  _populateFilter(filterEl, data) {
    if (typeof filterEl === 'string') {
      filterEl = document.querySelector(filterEl);
    }
    if (Array.isArray(data)) {
      data.forEach(item => filterEl.appendChild(new Option(item, item)));
    }
  }

  _initFilters() {
    let sortedWordTags = WordTagData.map(wt => wt.name).sort();

    this._populateFilter('.js-filter-attr', Attributes);
    this._populateFilter('.js-filter-wt1', sortedWordTags);
    this._populateFilter('.js-filter-wt2', sortedWordTags);
    this._populateFilter('.js-filter-ex-cat', ExCategories);
    this._populateFilter('.js-filter-part-trait', this.dataStoreManager.getStoreData('TraitDescriptions'));
    this._populateFilter('.js-filter-weapon-type', WeaponType);

    for (let key in this.filters) {
      const currKey = key;
      if (this.filters.hasOwnProperty(currKey)) {
        document.querySelector('.js-filter-' + currKey).addEventListener('change', e => {
          let filterEl = e.currentTarget;
          let filterVal = filterEl.value;
          filterEl.classList.toggle('unselected-filter', filterVal === '');
          this.filters[currKey] = filterVal;
          if (this.currentPart) {
            this._showPartList(this.currentPart);
          }
        });
      }
    }
  }

  _initSort() {
    const sort = document.querySelector('.js-sort-param');
    if (Array.isArray(Sorters)) {
      Sorters.forEach(sorter => {
        const opt = document.createElement('option');
        opt.value = sorter.slug;
        opt.text = sorter.name;
        sort.appendChild(opt);
      });
      sort.addEventListener('change', e => {
        this.sort = e.currentTarget.value;
        if (this.currentPart) {
          this._showPartList(this.currentPart);
        }
      });
    }
  }

  _initApplyMapBonus() {
    const applyMapBonusEl = document.querySelector('.js-apply-map-bonus');
    applyMapBonusEl.checked = false;
    applyMapBonusEl.addEventListener('change', e => {
      this.applyMapBonus = e.currentTarget.checked;
      this._loopThroughInput();
    });
  }

  _initSearchPart() {
    const searchEl = document.querySelector('.js-search-part');
    let timerId;
    searchEl.addEventListener('keyup', e => {
      this.searchPart = e.currentTarget.value;
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        if (this.currentPart) {
          this._showPartList(this.currentPart);
        }
      }, 500);
    });
  }

  _clearPartBySlot(currPart, forceLoop) {
    if (currPart && Array.isArray(AllSlots) && AllSlots.indexOf(currPart) > -1) {
      const partInputEl = document.querySelector('.js-input-' + currPart);
      if (partInputEl && partInputEl.dataset.combo) {
        const comboData = JSON.parse(partInputEl.dataset.combo);
        document.querySelector('.js-input-' + comboData.type).disabled = false;
        let found = this.comboParts.find(comboPart => comboPart.part === currPart);
        if (found) this._clearComboPart(found.combo, this.comboParts.indexOf(found));
      }
      this._clearParts(currPart);
      if (forceLoop) {
        this._loopThroughInput();
        this._displayPartsWordTags();
      }
    }
  }

  _initRemove() {
    const removePartEl = document.querySelector('.js-remove-part');
    removePartEl.addEventListener('click', e => {
      this._clearPartBySlot(this.currentPart, true);
    });

    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', e => {
      let slots = Object.keys(this.inputs);
      slots.forEach((currentPart, index) => {
        this._clearPartBySlot(currentPart, index === slots.length - 1);
      });
    });
  }

  _displayPartInfo(part) {
    if (part && part.dataset.partname && MainSlot.indexOf(part.dataset.part) > -1) {
      const wordTag = JSON.parse(part.dataset.wt),
          ex = JSON.parse(part.dataset.ex);
      let markMultiplier = 0;
      this.partNameCont.textContent = part.dataset.partname ? part.dataset.partname : '';
      if (part.nodeName.toLowerCase() === 'input') {
        markMultiplier = this._getMarkMultiplier(part.dataset.part);
      }
      Sorters.filter(s => s.isParam !== false).filter(s => s.isParam !== false).forEach(sorter => {
        let partMultiplier = +part.dataset[sorter.slug];
        this.partParamCont[sorter.slug].textContent = 0;
        if (partMultiplier) {
          this.partParamCont[sorter.slug].textContent = markMultiplier ? partMultiplier + Math.floor(partMultiplier * markMultiplier) : partMultiplier;
        }
      });
      if (Array.isArray(wordTag)) {
        this.partWTCont.innerHTML = wordTag.reduce((result, tag) => {
          return result + '<div>' + tag + '</div>';
        }, '');
      } else {
        this.partWTCont.innerHTML = '';
      }
      this.partSkillTraitCont.innerHTML = ex.type && ex.name ?
          ex.type === 'EX Skill' ?
              `<span>${(this._generateSkillIcon(ex) + ex.name)}</span>` + this._appendExStats(ex) : ex.name : '';
    }
  }

  _createMark(markSlot, currPart) {
    if (markSlot && markSlot.append && currPart) {
      const markEl = document.createElement('div'),
          partItem = document.querySelector('.js-input-' + currPart);
      markEl.classList.add('parts-marks__item');
      markEl.classList.add('js-mark-item');
      markEl.dataset.value = '0';
      markEl.addEventListener('click', e => {
        this._updateMark(e.currentTarget);
        this._setSelectedPart(currPart);
        this._displayPartInfo(partItem);
        this._loopThroughInput();
      });
      markSlot.append(markEl);
    }
  }

  _updateMark(mark) {
    let rarity = parseInt(mark.dataset.value, 10),
        newRarity = rarity === 0 ? 6 : rarity - 1;
    mark.dataset.value = newRarity.toString(10);
  }

  _deleteMarks(partData) {
    const markSlot = document.querySelector('.js-marks-' + partData);
    if (markSlot && markSlot.innerHTML) {
      markSlot.innerHTML = '';
    }
  }

  _calculateMarkCount(part) {
    return parseInt(part.dataset.mark ? part.dataset.mark : (6 - part.dataset.rarity), 10);
  }

  _addMarks() {
    const currPart = this.currentPart,
        markSlot = document.querySelector('.js-marks-' + currPart),
        markPart = markSlot ? document.querySelector('.js-input-' + currPart) : null,
        markCount = this._calculateMarkCount(markPart);
    if (markCount) {
      for (let i = 0; i < markCount; i++) {
        this._createMark(markSlot, currPart);
      }
    }
  }

  _getMarkMultiplier(currPart) {
    let multiplier = 0;
    Array.from(document.querySelectorAll('.js-marks-' + currPart + ' .js-mark-item')).forEach(markItem => {
      if (markItem.dataset.value) {
        multiplier = this._roundValue(multiplier + MarkWeights[markItem.dataset.value]);
      }
    });
    return multiplier;
  }

  /**
   * @private
   * @deprecated
   * This used to be used in {@link GunplaCalculator#_getMarkMultiplier} when returning the multiplier.
   * If the part had integrated parts, it halved the return value.
   * @param currPart
   * @returns {boolean}
   */
  _hasComboParts(currPart) {
    const partInput = document.querySelector('.js-input-' + currPart);
    return !!(partInput && partInput.dataset.combo);
  }

  _hasSelectedPart(currPart) {
    const partInput = document.querySelector('.js-input-' + currPart);
    return !!(partInput && partInput.value.length > 0);
  }

  _displayWordTags(part) {
    if (!(part && part.dataset.part && part.dataset.wt)) {
      return false;
    }
    const partEl = document.querySelector('.js-wt-' + part.dataset.part),
        wordTags = JSON.parse(part.dataset.wt);
    if (Array.isArray(wordTags) && partEl) {
      partEl.innerHTML = wordTags.reduce((result, wordTag) => {
        const currentTally = this.wordTagsTally[wordTag];
        return result + ((result == '' ? '' : '<br />') + '<span class="' + (currentTally >= ActiveWordTagMin ? 'activated-wt' : '') + '">(' + currentTally + ') ' + wordTag + '</span>');
      }, '');
      if (part.dataset.combo) {
        const comboData = JSON.parse(part.dataset.combo);
        document.querySelector('.js-wt-' + comboData.type).innerHTML = partEl.innerHTML;
      }
    }
    return true;
  }

  _formatDataTag(value) {
    return value.replace(/([A-Z])/g, match => '-' + match[0].toLowerCase());
  }

  _removeAllAttributes(el) {
    if (el.dataset) {
      for (let prop in el.dataset) {
        // Do not remove the part property.
        if (prop !== 'part') {
          el.removeAttribute('data-' + this._formatDataTag(prop));
        }
      }
    }
  }

  _roundValue(value) {
    return Math.round(value * 1000000000000) / 1000000000000;
  }
}

/**
 * Used to normalize search strings.
 */
GunplaCalculator.greekDict = {
  'Α': { upper: 'Α', lower: 'α', name: 'alpha',   romanized: 'a'  },
  'Β': { upper: 'Β', lower: 'β', name: 'beta',    romanized: 'b'  },
  'Γ': { upper: 'Γ', lower: 'γ', name: 'gamma',   romanized: 'g'  },
  'Δ': { upper: 'Δ', lower: 'δ', name: 'delta',   romanized: 'd'  },
  'Ε': { upper: 'Ε', lower: 'ε', name: 'epsilon', romanized: 'e'  },
  'Ζ': { upper: 'Ζ', lower: 'ζ', name: 'zeta',    romanized: 'z'  },
  'Η': { upper: 'Η', lower: 'η', name: 'eta',     romanized: 'h'  },
  'Θ': { upper: 'Θ', lower: 'θ', name: 'theta',   romanized: 'th' },
  'Ι': { upper: 'Ι', lower: 'ι', name: 'iota',    romanized: 'i'  },
  'Κ': { upper: 'Κ', lower: 'κ', name: 'kappa',   romanized: 'k'  },
  'Λ': { upper: 'Λ', lower: 'λ', name: 'lambda',  romanized: 'l'  },
  'Μ': { upper: 'Μ', lower: 'μ', name: 'mu',      romanized: 'm'  },
  'Ν': { upper: 'Ν', lower: 'ν', name: 'nu',      romanized: 'n'  },
  'Ξ': { upper: 'Ξ', lower: 'ξ', name: 'xi',      romanized: 'x'  },
  'Ο': { upper: 'Ο', lower: 'ο', name: 'omicron', romanized: 'o'  },
  'Π': { upper: 'Π', lower: 'π', name: 'pi',      romanized: 'p'  },
  'Ρ': { upper: 'Ρ', lower: 'ρ', name: 'rho',     romanized: 'r'  },
  'Σ': { upper: 'Σ', lower: 'σ', name: 'sigma',   romanized: 's', alt: 'ς' },
  'Τ': { upper: 'Τ', lower: 'τ', name: 'tau',     romanized: 't'  },
  'Υ': { upper: 'Υ', lower: 'υ', name: 'upsilon', romanized: 'u'  },
  'Φ': { upper: 'Φ', lower: 'φ', name: 'phi',     romanized: 'ph' },
  'Χ': { upper: 'Χ', lower: 'χ', name: 'chi',     romanized: 'ch' },
  'Ψ': { upper: 'Ψ', lower: 'ψ', name: 'psi',     romanized: 'ps' },
  'Ω': { upper: 'Ω', lower: 'ω', name: 'omega',   romanized: 'o'  },
};
GunplaCalculator.greekPattern = new RegExp(`[${Object.keys(GunplaCalculator.greekDict).join('')}]`, 'i');
GunplaCalculator.replaceGreek = symbol => GunplaCalculator.greekDict[symbol.toUpperCase()].name;
GunplaCalculator.normalizeString = (str) => {
  return str.toLowerCase().trim()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(GunplaCalculator.greekPattern, GunplaCalculator.replaceGreek)
      .replace(/[\s.-]/g, '');
};
GunplaCalculator.containsNormalized = (str, term) => {
  return GunplaCalculator.normalizeString(str).indexOf(GunplaCalculator.normalizeString(term)) !== -1;
};
