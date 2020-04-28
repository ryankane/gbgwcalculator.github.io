const formatDataTag = value => {
  return value.replace(/([A-Z])/g, match => '-' + match[0].toLowerCase());
};

const removeAllAttributes = el => {
  if (el.dataset) {
    for (let prop in el.dataset) {
      el.removeAttribute('data-' + formatDataTag(prop));
    }
  }
};

const roundValue = value => {
  return Math.round(value * 1000000000000) / 1000000000000;
};

const triggerEvent = (el, eventName) => {
  var event = document.createEvent('HTMLEvents');
  event.initEvent(eventName, true, false);
  el.dispatchEvent(event);
};

class GunplaCalculator {
  constructor() {
    this.container = document.querySelector(".js-container");
    if (this.container) {
      this._generateHTML();
    }
  }

  _generateHTML() {
    this._generate();
  }

  _createElement(config, targetEl) {
    const retEl = document.createElement(config.el);
    if ("class" in config) {
      if (Array.isArray(config.class)) {
        config.class.forEach(prop => retEl.classList.add(prop));
      } else if (typeof config.class === "string") {
        config.class.split(/\s+/g).forEach(className => retEl.classList.add(className));
      }
    }
    if ('text' in config) {
      retEl.textContent = config.text;
    }
    if ('html' in config) {
      retEl.innerHTML = config.html;
    }
    if ("type" in config) {
      retEl.type = config.type;
    }
    if ("readOnly" in config) {
      retEl.readOnly = config.readOnly;
    }
    if ("placeholder" in config) {
      retEl.placeholder = config.placeholder;
    }
    if ('disabled' in config) {
      retEl.disabled = config.disabled;
    }
    if ('hidden' in config && config.hidden === true) {
      retEl.style.display = 'none';
    }
    if ('data' in config && Array.isArray(config.data)) {
      config.data.forEach(prop => {
        retEl.dataset[prop.name] = prop.value;
      });
    }
    if ("children" in config && Array.isArray(config.children)) {
      config.children.forEach(child => {
        this._createElement(child, retEl);
      });
    }
    if (targetEl && targetEl.append) {
      targetEl.append(retEl);
    }
  }

  _generate() {
    const columns = [this._wordTags(), this._partTrait(), this._info(), this._parts(), this._gears(), this._partList()];
    columns.forEach(column => {
      this._createElement(column, this.container);
    });
  }

  _info() {
    return {
      'el': 'div',
      'class': "info",
      'children': [{
        'el': 'h3',
        'text': "Parameters"
      }, ...this._paramChildren(), {
        'el': 'h3',
        'text': 'Active Word Tag'
      }, {
        'el': "div",
        'class': ["row", "active-word-tag-list", "js-active-wt"]
      }, {
        'el': 'h3',
        'class': ["part-name", "js-part-name"]
      }, {
        'el': 'h3',
        'text': "Parameters",
        'class': "bg-red"
      }, ...this._paramChildren("part"), {
        'el': 'h3',
        'text': "Word Tag",
        'class': 'bg-red'
      }, {
        'el': "div",
        'class': ["row", "part-word-tag-list", "js-part-wt"]
      }, {
        'el': 'h3',
        'text': "Traits / EX Skill",
        'class': "bg-red"
      }, {
        'el': 'div',
        'class': ['row', 'part-skill-trait', "js-part-skill-trait"]
      }, {
        'el': 'button',
        'html' : 'Equipped<br>Reset',
        'class': 'reset-btn'
      }]
    };
  }

  _paramChildren(type) {
    if (Array.isArray(Sorters)) {
      let sortClassPrefix = "js-total-",
          alternateRowClass = "alt-bg--blue";
      if (type && type == "part") {
        sortClassPrefix = 'js-part-total-';
        alternateRowClass = "alt-bg--red";
      }
      return Sorters.map(sorter => {
        return {
          'el': 'div',
          'class': ["row", alternateRowClass],
          'children': [{
            'el': 'div',
            'children': [{
              'el': "label",
              'text': sorter.name
            }, {
              'el': "span",
              'class': ['info__total', 'float-right', sortClassPrefix + sorter.slug],
              'text': 0
            }]
          }]
        };
      });
    }
  }

  _wordTags() {
    return {
      'el': "div",
      'class': "word-tags",
      'children': [{
        'el': 'h3',
        'text': "Word Tags"
      }, ...MainSlot.map(wordTag => {
        return {
          'el': "div",
          'class': ["row", "height-50", "alt-bg"],
          'children': [{
            'el': "span",
            'class': "js-wt-" + wordTag
          }]
        };
      })]
    };
  }

  _partTrait() {
    return {
      'el': "div",
      'class': "part-trait-ex-skill",
      'children': [{
        'el': 'h3',
        'text': "Part Traits / EX Skill"
      }, ...MainSlot.map(trait => {
        return {
          'el': "div",
          'class': ["row", 'height-50', "alt-bg"],
          'children': [{
            'el': "span",
            'class': ["part-trait-ex-skill__text", 'js-skill-trait-' + trait]
          }]
        };
      })]
    };
  }

  _parts() {
    return {
      'el': "div",
      'class': "parts",
      'children': [{
        'el': 'h3',
        'text': "Parts"
      }, ...this._partsChildren(), this._attributeTally()]
    };
  }

  _gears() {
    return {
      'el' : 'div',
      'class': "gears",
      'children' : [{
        'el': 'h3',
        'text': 'Gear'
      }, ...this._gearsChildren()]
    }
  }

  _partsChildren() {
    if (Array.isArray(MainSlot)) {
      return MainSlot.map(slot => {
        return {
          'el': "div",
          'class': ['row', 'alt-bg', "height-50", 'js-part-cont'],
          'children': [{
            'el': "div",
            'children': [{
              'el': "label",
              'text': slot != "backpack" ? slot : "back"
            }, {
              'el': 'input',
              'type': 'text',
              'class': 'js-input js-input-' + slot,
              'readOnly':  true
            }]
          }, {
            'el': "div",
            'children': [{
              'el': 'div',
              'class': ["parts-marks", "js-marks-" + slot]
            }],
            'hidden' : slot === 'pilot'
          }]
        };
      });
    }
  }

  _gearsChildren() {
    if (Array.isArray(GearSlot)) {
      return GearSlot.map((slotClass, slotIndex) => {
        let disabled = Object.values(GearTypes)[slotIndex].length === 0;
        return {
          'el': 'div',
          'class': ["row", 'alt-bg', "height-50", "js-part-cont"],
          'children': [{
            'el': "div",
            'children': [{
              'el': 'label',
              'text': GearSlotText[slotIndex]
            }, {
              'el': "input",
              'type': "text",
              'class': "js-input js-input-" + slotClass,
              'readOnly':  true,
              'disabled': disabled
            }]
          }]
        };
      });
    }
  }

  _attributeTally() {
    return {
      'el': "div",
      'class': "attribute-tally",
      'children': Attributes.map(attr => {
        return {
          'el': "label",
          'text': '[' + attr.charAt(0) + '] ',
          'children': [{
            'el': "span",
            'class': "js-tally-" + attr.charAt(0).toLowerCase(),
            'text': 0
          }]
        };
      })
    };
  }

  _partList() {
    return {
      'el': "div",
      'class': "part-list",
      'children': [{
        'el': "input",
        'type': "text",
        'placeholder': 'Search Part/Pilot',
        'class': ['part-list__search', "js-search-part"]
      }, {
        'el': 'h3',
        'text': "Part List",
        'children': [{
          'el': "span",
          'text': "Remove",
          'class': ["part-list__remove", "js-remove-part"]
        }]
      }, {
        'el': "div",
        'class': ["part-list__list", "js-part-list"]
      }]
    };
  }
}

class GunplaBuild {
  constructor() {
    this.wordTagsTally = {};
    this.parametersTotal = {};
    this.attributesTally = {
      'p': 0,
      't': 0,
      's': 0
    };
    this.inputs = {};
    this.comboParts = [];
    this.parts = {};
    this.partList = document.querySelector(".js-part-list");
    this.partNameCont = document.querySelector('.js-part-name');
    this.partParamCont = {};
    this.partWTCont = document.querySelector(".js-part-wt");
    this.partSkillTraitCont = document.querySelector(".js-part-skill-trait");
    this.partCont = {};
    this.filters = {
      'attr': '',
      'wt1': '',
      'wt2': '',
      'ex-cat': '',
      'pt': ''
    };
    this.applyMapBonus = false;
    this.searchPart = '';
    this.sort = '';
    this.currentPart = '';
  }

  init() {
    Sorters.forEach(sorter => {
      this.partParamCont[sorter.slug] = document.querySelector(".js-part-total-" + sorter.slug);
    });
    AllSlots.forEach(slot => {
      this.inputs[slot] = document.querySelector(".js-input-" + slot);
      this.parts[slot] = [];
      this.partCont[slot] = this.inputs[slot].closest(".js-part-cont");
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

  _parseParts() {
    if (AllSlots && Array.isArray(AllSlots)) {
      if (Collections && Array.isArray(Collections)) {
        Collections.forEach(gunpla => {
          if (gunpla.parts && Array.isArray(gunpla.parts)) {
            const currGunpla = {
              'ms': gunpla.name
            };
            for (let part in gunpla) {
              if (gunpla.hasOwnProperty(part) && part !== 'parts' && part !== 'name') {
                currGunpla[part] = gunpla[part];
              }
            }
            gunpla.parts.forEach(part => {
              const gunplaClone = {
                ...currGunpla
              };
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
      if (Pilots && Array.isArray(Pilots)) {
        Pilots.forEach(currPilot => {
          const pilotClone = {
            'part': "pilot"
          };
          for (let prop in currPilot) {
            if (currPilot.hasOwnProperty(prop)) {
              pilotClone[prop] = currPilot[prop];
            }
          }
          this.parts.pilot.push(pilotClone);
        });
      }
      if (GearTypes && typeof GearTypes === 'object') {
        Object.values(GearTypes).forEach((gears, index) => {
          let gearIndex = 'gear-s1ot-' + (index + 1);
          gears.forEach(currGear => {
            const gearClone = {
              'part': gearIndex
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
        inputs[input].addEventListener("click", e => {
          this.currentPart = input;
          this._setSelectedPart(input);
          this._showPartList(input);
          this._displayPartInfo(e.currentTarget);
        });
      }
    }
  }

  _checkFilter(part) {
    const filters = this.filters;
    if (this.filters['attr'] && part.attribute && part.attribute != this.filters['attr']) {
      return false;
    }
    if (this.filters['wt1'] && part.wt && part.wt.indexOf(this.filters['wt1']) < 0) {
      return false;
    }
    if (this.filters['wt2'] && part.wt && part.wt.indexOf(this.filters['wt2']) < 0) {
      return false;
    }
    if (this.filters['pt'] && part.ex && part.ex.name && !new RegExp(this.filters['pt'], 'i').test(part.ex.name)) {
      return false;
    }
    if (this.filters['ex-cat'] && part.ex && !(part.ex.category && part.ex.category === this.filters['ex-cat'])) {
      return false;
    }
    if (this.searchPart.trim().length > 0) {
      const value = (part.ms ? part.ms : '') + ' ' + (part.name ? part.name : '');
      if (!new RegExp(this.searchPart.trim(), 'i').test(value)) {
        return false;
      }
    }
    return true;
  }

  _showPartList(partToShow) {
    if (this.partList && Collections && Array.isArray(Collections)) {
      this.partList.innerHTML = '';
      if (this.parts && this.parts[partToShow] && Array.isArray(this.parts[partToShow])) {
        const partClone = [...this.parts[partToShow]],
            sortType = this.sort;
        if (sortType && GearSlot.indexOf(partToShow) < 0) {
          partClone.sort((partA, partB) => {
            return partA[sortType] > partB[sortType] ? -1 : 1;
          });
        }
        partClone.forEach(partFilter => {
          if (!this._checkFilter(partFilter)) {
            return;
          }
          const partEntry = document.createElement("div");
          let displayText = partFilter.attribute ? '[' + partFilter.attribute.charAt(0) + ']' : '';
          if (partFilter.jl) {
            displayText += ` ${partFilter.name} (${partFilter.jl})`;
          } else if (partFilter.part.startsWith('gear-')) {
            displayText += ` ${partFilter.name}`;
          } else if (partFilter.name) {
            displayText += ` ${partFilter.name} (${partFilter.ms})`;
          } else {
            displayText += ` ${partFilter.ms}`;
          }
          partEntry.textContent = partEntry.dataset.partname = displayText;
          partEntry.classList.add("part-list__item");
          for (let prop in partFilter) {
            partEntry.dataset[prop] = partFilter[prop] instanceof Object ? JSON.stringify(partFilter[prop]) : partFilter[prop];
          }
          partEntry.addEventListener("click", e => {
            const currTarget = e.currentTarget;
            let partInput, partData;
            if (currTarget.dataset.part && this.inputs[currTarget.dataset.part]) {
              partData = currTarget.dataset.part;
              partInput = this.inputs[partData];
              partInput.value = partInput.title = currTarget.dataset.partname;
              removeAllAttributes(partInput);
              Object.assign(partInput.dataset, currTarget.dataset);
              this._deleteMarks(partData);
              if (["pilot", "gear-s1ot-1", "gear-s1ot-2", "gear-s1ot-3", "gear-s1ot-4", "gear-s1ot-5"].indexOf(partData) === -1) {
                this._addMarks();
              }
              this._displayPartInfo(currTarget);
            }
            this._calculate(partData);
          });
          if (screen.width >= 992) {
            partEntry.addEventListener("mouseover", e => {
              this._displayPartInfo(e.currentTarget);
            });
          }
          this.partList.appendChild(partEntry);
        });
      }
    }
  }

  _setSelectedPart(partId) {
    const partClass = "selected-part";
    Array.prototype.slice.call(document.querySelectorAll(".selected-part")).forEach(selectedPart => {
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
              document.querySelector('.js-input-' + comboPart.combo).disabled = false;
              this.comboParts.splice(i, 1);
              break;
            } else if (partInput.dataset.combo && partInput.dataset.combo == comboPart.combo) {
              this._clearParts(comboPart.part);
              document.querySelector(".js-input-" + comboPart.combo).disabled = false;
              this.comboParts.splice(i, 1);
              break;
            }
          }
        }
      }
      if (partInput.dataset.combo && partInput.dataset.part) {
        this._clearParts(partInput.dataset.combo);
        this.comboParts.push({
          'part': partInput.dataset.part,
          'combo': partInput.dataset.combo
        });
        document.querySelector(".js-input-" + partInput.dataset.combo).disabled =  true;
      }
    }
  }

  _applyAttributes(el, attrs) {
    for (let attr in attrs) { el.setAttribute(attr, attrs[attr]); }
    return el;
  }

  _removeAttributes(el, attrs) {
    attrs.forEach(attr => el.removeAttribute(attr));
    return el;
  }

  _generateSkillIcon(exData) {
    return `<span class="ex-cat-icon gbgw-${exData.category.toLowerCase().replace(/\s/g, '-')}"></span>`;
  }

  _displaySkillTraits(partData) {
    if (this.inputs[partData]) {
      const partInput = this.inputs[partData];
      let exData, partTrait;
      if (partInput && partInput.dataset.part && partInput.dataset.ex) {
        partTrait = document.querySelector(".js-skill-trait-" + partInput.dataset.part), exData = JSON.parse(partInput.dataset.ex);
        if (exData.type && exData.name && partTrait) {
          partTrait.innerHTML = exData.type === 'EX Skill'
              ? this._generateSkillIcon(exData) + exData.name
              : exData.name.replace(/,/, '<br>');
          if (exData.description) {
            this._applyAttributes(partTrait, {
              'aria-label' : '[' + exData.category + '] ' + exData.description,
              'data-balloon-pos' : 'down',
              'data-balloon-length' : 'fit'
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

  _clearSkillTrait(partData) {
    if (partData && document.querySelector(".js-skill-trait-" + partData)) {
      document.querySelector('.js-skill-trait-' + partData).textContent = '';
    }
  }

  _loopThroughInput() {
    const inputList = this.inputs;
    this._resetWordTagTally();
    this._resetParameters();
    this._resetAttributesTally();
    console.log("--------------------");
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
        const tallyDiv = document.createElement("div");
        tallyDiv.textContent = tally;
        activeWordTag.appendChild(tallyDiv);
      }
    }
    console.log("this.wordTagsTally", this.wordTagsTally);
  }

  _resetParameters() {
    this.parametersTotal = {};
    Sorters.forEach(sorter => {
      if ("slug" in sorter) {
        this.parametersTotal[sorter.slug] = 0;
      }
    });
  }

  _calculateParameters(inputName) {
    if (inputName && inputName.dataset.part) {
      const markMultiplier = this._getMarkMultiplier(inputName.dataset.part);
      Sorters.forEach(sorter => {
        const slug = sorter.slug;
        if (slug && inputName.dataset[slug] && slug in this.parametersTotal) {
          let data = inputName.dataset[slug];
          let partMultiplier = 0;
          if (isNaN(data)) {
            data = JSON.parse(data); // Gears are sometimes objects that contain a multiplier formula.
            partMultiplier = data.attrs.reduce((sum, slug) => sum + this.parametersTotal[slug], 0) * data.multiplier;
          } else {
            partMultiplier = parseInt(data, 10);
          }
          let finalMultiplier = markMultiplier
              ? partMultiplier + (partMultiplier * markMultiplier)
              : partMultiplier;
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
      'p': 0,
      't': 0,
      's': 0
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
      document.querySelector(".js-tally-" + tally).textContent = this.attributesTally[tally];
    }
  }

  _applyWordTagBonus() {
    const tallyMap = {};
    console.log("Total Raw Attributes:", this.parametersTotal);
    let tagTally = 0;
    for (let tagName in this.wordTagsTally) {
      if (this.wordTagsTally[tagName] >= ActiveWordTagMin) {
        const foundTag = this._getWordTag(tagName);
        if (MapWordTags.indexOf(tagName) > -1) {
          tagTally++;
        }
        if (foundTag && foundTag.multiplier && foundTag.parameters && Array.isArray(foundTag.parameters)) {
          foundTag.parameters.forEach(tagParam => {
            tallyMap[tagParam] = tagParam in tallyMap ? roundValue(tallyMap[tagParam] + foundTag.multiplier) : foundTag.multiplier;
          });
        }
      }
    }
    if (tagTally && this.applyMapBonus && Array.isArray(Sorters)) {
      Sorters.forEach(sorter => {
        tallyMap[sorter.slug] = tallyMap[sorter.slug] ? roundValue(tallyMap[sorter.slug] + MultiplierBuffMap) : MultiplierBuffMap;
      });
    }
    console.log("Word Tag Multipliers", tallyMap);
    for (let tag in tallyMap) {
      if (tag in this.parametersTotal) {
        this.parametersTotal[tag] = Math.round(this.parametersTotal[tag] + this.parametersTotal[tag] * tallyMap[tag]);
      }
    }
    console.log("Total Attributes With WT Bonus:", this.parametersTotal);
  }

  _getWordTag(wordTag) {
    return WordTagData.find(tag => wordTag === tag.name);
  }

  _applyJobLicenseBonus() {
    const selectedPilot = document.querySelector(".js-select-pilot"),
        pilotInput = this.inputs.pilot;
    if (pilotInput && pilotInput.dataset.jl) {
      const jobLicense = this._getJobLicense(pilotInput.dataset.jl);
      if (jobLicense && jobLicense.multiplier && jobLicense.parameters && Array.isArray(jobLicense.parameters)) {
        jobLicense.parameters.forEach(jobParam => {
          if (jobParam in this.parametersTotal) {
            this.parametersTotal[jobParam] = Math.round(this.parametersTotal[jobParam] + this.parametersTotal[jobParam] * jobLicense.multiplier);
          }
        });
      }
    }
    console.log("Total Attributes With WT Bonus and Job Bonus:", this.parametersTotal);
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
          if (!this._displayWordTags(inputData) && input[props].disabled == false) {
            this._clearWordTag(props);
          }
        }
      }
    }
  }

  _clearWordTag(wordTag) {
    if (document.querySelector(".js-wt-" + wordTag)) {
      document.querySelector(".js-wt-" + wordTag).innerHTML = '';
    }
  }

  _clearParts(inputName) {
    if (inputName && inputName in this.inputs) {
      const input = this.inputs[inputName];
      input.value = '';
      input.title = '';
      removeAllAttributes(input);
      Object.assign(input.dataset, document.createElement("input").dataset);
      this._clearSkillTrait(inputName);
      this._clearWordTag(inputName);
      this._deleteMarks(inputName);
    }
  }

  _initFilters() {
    const attrFilter = document.querySelector('.js-filter-attr'),
        wtFilter1 = document.querySelector(".js-filter-wt1"),
        wtFilter2 = document.querySelector(".js-filter-wt2"),
        exFilter = document.querySelector(".js-filter-ex-cat"),
        ptFilter = document.querySelector(".js-filter-pt");
    if (Array.isArray(Attributes)) {
      Attributes.forEach(attr => {
        const opt = document.createElement("option");
        opt.value = attr;
        opt.text = attr;
        attrFilter.appendChild(opt);
      });
    }
    if (Array.isArray(GeneralWordTags)) {
      GeneralWordTags.sort();
      GeneralWordTags.forEach(wt => {
        const opt = document.createElement('option');
        opt.value = wt;
        opt.text = wt;
        wtFilter2.appendChild(opt.cloneNode( true));
        wtFilter1.appendChild(opt);
      });
    }
    if (Array.isArray(ExCategories)) {
      ExCategories.forEach(category => {
        const opt = document.createElement("option");
        opt.value = category;
        opt.text = category;
        exFilter.appendChild(opt);
      });
    }
    if (Array.isArray(TraitDescriptions)) {
      TraitDescriptions.forEach(pt => {
        const opt = document.createElement("option");
        opt.value = pt;
        opt.text = pt;
        ptFilter.appendChild(opt);
      });
    }
    for (let key in this.filters) {
      if (this.filters.hasOwnProperty(key)) {
        document.querySelector(".js-filter-" + key).addEventListener("change", e => {
          let filterEl = e.currentTarget;
          let filterVal = filterEl.value;
          filterEl.classList.toggle('unselected-filter', filterVal === '');
          this.filters[key] = filterVal;
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
        const opt = document.createElement("option");
        opt.value = sorter.slug;
        opt.text = sorter.name;
        sort.appendChild(opt);
      });
      sort.addEventListener("change", e => {
        this.sort = e.currentTarget.value;
        if (this.currentPart) {
          this._showPartList(this.currentPart);
        }
      });
    }
  }

  _initApplyMapBonus() {
    const applyMapBonusEl = document.querySelector(".js-apply-map-bonus");
    applyMapBonusEl.checked = false;
    applyMapBonusEl.addEventListener("change", e => {
      this.applyMapBonus = e.currentTarget.checked;
      this._loopThroughInput();
    });
  }

  _initSearchPart() {
    const searchEl = document.querySelector(".js-search-part");
    let timerId;
    searchEl.addEventListener("keyup", e => {
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
        document.querySelector(".js-input-" + partInputEl.dataset.combo).disabled = false;
        for (let i = 0; i < this.comboParts.length; i++) {
          if (this.comboParts[i].part == currPart) {
            this.comboParts.splice(i, 1);
            break;
          }
        }
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
    removePartEl.addEventListener("click", e => {
      this._clearPartBySlot(this.currentPart, true);
    });

    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', e => {
      let slots = Object.keys(this.inputs);
      slots.forEach((currentPart, index) => {
        this._clearPartBySlot(currentPart, index === slots.length - 1)
      });
    });
  }

  _displayPartInfo(part) {
    if (part && part.dataset.part && MainSlot.indexOf(part.dataset.part) > -1) {
      const wordTag = JSON.parse(part.dataset.wt),
          ex = JSON.parse(part.dataset.ex);
      let markMultiplier = 0;
      this.partNameCont.textContent = part.dataset.partname ? part.dataset.partname : '';
      if (part.nodeName.toLowerCase() === 'input') {
        markMultiplier = this._getMarkMultiplier(part.dataset.part);
      }
      Sorters.forEach(sorter => {
        let partMultiplier = +part.dataset[sorter.slug];
        this.partParamCont[sorter.slug].textContent = 0;
        if (partMultiplier) {
          this.partParamCont[sorter.slug].textContent = markMultiplier ? partMultiplier + Math.floor(partMultiplier * markMultiplier) : partMultiplier;
        }
      });
      if (Array.isArray(wordTag)) {
        this.partWTCont.innerHTML = wordTag.reduce((result, tag) => {
          return result + "<div>" + tag + "</div>";
        }, '');
      } else {
        this.partWTCont.innerHTML = '';
      }
      this.partSkillTraitCont.innerHTML = ex.type && ex.name
          ? ex.type === 'EX Skill'
              ? `<span>${(this._generateSkillIcon(ex) + ex.name)}</span>`
              : ex.name
          : '';
    }
  }

  _createMark(markSlot, currPart) {
    if (markSlot && markSlot.append && currPart) {
      const markEl = document.createElement("div"),
          partItem = document.querySelector(".js-input-" + currPart);
      markEl.classList.add('parts-marks__item');
      markEl.classList.add("js-mark-item");
      markEl.dataset.value = 0;
      markEl.addEventListener("click", e => {
        const currTarget = e.currentTarget,
            rarity = +currTarget.dataset.value;
        currTarget.dataset.value = rarity == 0 ? 5 : rarity - 1;
        this._setSelectedPart(currPart);
        this._displayPartInfo(partItem);
        this._loopThroughInput();
      });
      markSlot.append(markEl);
    }
  }

  _deleteMarks(partData) {
    const markSlot = document.querySelector(".js-marks-" + partData);
    if (markSlot && markSlot.innerHTML) {
      markSlot.innerHTML = '';
    }
  }

  _calculateMarkCount(part) {
    return parseInt(part.dataset.mark ? part.dataset.mark : (5 - part.dataset.rarity), 10);
  }

  _addMarks() {
    const currPart = this.currentPart,
        markSlot = document.querySelector(".js-marks-" + currPart),
        markPart = markSlot ? document.querySelector(".js-input-" + currPart) : null,
        markCount = this._calculateMarkCount(markPart);
    if (markCount) {
      for (let i = 0; i < markCount; i++) {
        this._createMark(markSlot, currPart);
      }
    }
  }

  _getMarkMultiplier(currPart) {
    let multiplier = 0;
    Array.prototype.slice.call(document.querySelectorAll(".js-marks-" + currPart + " .js-mark-item")).forEach(markItem => {
      if (markItem.dataset.value) {
        multiplier = roundValue(multiplier + MarkWeights[markItem.dataset.value]);
      }
    });
    return multiplier && this._hasComboParts(currPart) ? multiplier / 2 : multiplier;
  }

  _hasComboParts(currPart) {
    const partInput = document.querySelector(".js-input-" + currPart);
    return !!(partInput && partInput.dataset.combo);
  }

  _hasSelectedPart(currPart) {
    const partInput = document.querySelector(".js-input-" + currPart);
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
        return result + ((result == '' ? '' : "<br />") + "<span class=\"" + (currentTally >= ActiveWordTagMin ? "activatedWT" : '') + "\">(" + currentTally + ') ' + wordTag + "</span>");
      }, '');
      if (part.dataset.combo) {
        document.querySelector('.js-wt-' + part.dataset.combo).innerHTML = partEl.innerHTML;
      }
    }
    return  true;
  }
}