class GunplaCalculatorUiClass {
  constructor(dataStoreManager) {
    this.dataStoreManager = dataStoreManager;

    this.container = document.querySelector('.js-container');
    if (this.container) {
      this._generateHTML();
    }
  }

  _generateHTML() {
    this._generate();
  }

  _createElement(config, targetEl) {
    const retEl = document.createElement(config.el);
    if ('class' in config) {
      if (Array.isArray(config.class)) {
        config.class.forEach(prop => retEl.classList.add(prop));
      } else if (typeof config.class === 'string') {
        config.class.split(/\s+/g).forEach(className => retEl.classList.add(className));
      }
    }
    if ('text' in config) {
      retEl.textContent = config.text;
    }
    if ('html' in config) {
      retEl.innerHTML = config.html;
    }
    if ('type' in config) {
      retEl.type = config.type;
    }
    if ('readOnly' in config) {
      retEl.readOnly = config.readOnly;
    }
    if ('placeholder' in config) {
      retEl.placeholder = config.placeholder;
    }
    if ('title' in config) {
      retEl.setAttribute('title', config.title);
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
    if ('children' in config && Array.isArray(config.children)) {
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
      el: 'div',
      class: 'info',
      children: [{
        el: 'h3',
        text: 'Parameters'
      }, ...this._paramChildren(), {
        el: 'h3',
        text: 'Active Word Tag'
      }, {
        el: 'div',
        class: ['row', 'active-word-tag-list', 'js-active-wt']
      }, {
        el: 'h3',
        class: ['part-name', 'js-part-name']
      }, {
        el: 'h3',
        text: 'Parameters',
        class: 'bg-red'
      }, ...this._paramChildren('part'), {
        el: 'h3',
        text: 'Word Tag',
        class: 'bg-red'
      }, {
        el: 'div',
        class: ['row', 'part-word-tag-list', 'js-part-wt']
      }, {
        el: 'h3',
        text: 'Traits / EX Skill',
        class: 'bg-red'
      }, {
        el: 'div',
        class: ['row', 'part-skill-trait', 'js-part-skill-trait']
      }, {
        el: 'button',
        html: 'Equipped<br>Reset',
        class: 'reset-btn'
      }]
    };
  }

  _paramChildren(type) {
    if (Array.isArray(Sorters)) {
      let sortClassPrefix = 'js-total-',
          alternateRowClass = 'alt-bg--blue';
      if (type && type == 'part') {
        sortClassPrefix = 'js-part-total-';
        alternateRowClass = 'alt-bg--red';
      }
      return Sorters.map(sorter => {
        return {
          el: 'div',
          class: ['row', alternateRowClass],
          children: [{
            el: 'div',
            children: [{
              el: 'label',
              html: `${this._generateStatIcon(sorter.key)} ${sorter.name}`
            }, {
              el: 'span',
              class: ['info__total', 'float-right', sortClassPrefix + sorter.slug],
              text: 0
            }]
          }]
        };
      });
    }
  }

  _wordTags() {
    return {
      el: 'div',
      class: 'word-tags',
      children: [{
        el: 'h3',
        text: 'Word Tags'
      }, ...MainSlot.map(wordTag => {
        return {
          el: 'div',
          class: ['row', 'height-50', 'alt-bg'],
          children: [{
            el: 'span',
            class: 'js-wt-' + wordTag
          }]
        };
      })]
    };
  }

  _partTrait() {
    return {
      el: 'div',
      class: 'part-trait-ex-skill',
      children: [{
        el: 'h3',
        text: 'Part Traits / EX Skill'
      }, ...MainSlot.map(trait => {
        return {
          el: 'div',
          class: ['row', 'height-50', 'alt-bg'],
          children: [{
            el: 'span',
            class: ['part-trait-ex-skill__text', 'js-skill-trait-' + trait]
          }]
        };
      })]
    };
  }

  _parts() {
    return {
      el: 'div',
      class: 'parts',
      children: [{
        el: 'h3',
        text: 'Parts'
      }, ...this._partsChildren(), this._attributeTally()]
    };
  }

  _gears() {
    return {
      el: 'div',
      class: 'gears',
      children: [{
        el: 'h3',
        text: 'Gear'
      }, ...this._gearsChildren()]
    };
  }

  _partsChildren() {
    if (Array.isArray(MainSlot)) {
      return MainSlot.map(slot => {
        return {
          el: 'div',
          class: ['row', 'alt-bg', 'height-50', 'js-part-cont'],
          children: [{
            el: 'div',
            children: [{
              el: 'label',
              class: ['part-slot-type'],
              html: this._generateSlotIcon(slot),
              title: SlotTextMap[slot]
            }, {
              el: 'span',
              class: ['part-slot-attr']
            }, {
              el: 'input',
              type: 'text',
              class: 'js-input js-input-' + slot,
              readOnly: true
            }]
          }, {
            el: 'div',
            children: [{
              el: 'div',
              class: ['weapon-type'],
              hidden: !WeaponSlots.includes(slot)
            }, {
              el: 'div',
              class: ['parts-marks', 'js-marks-' + slot],
              hidden: slot === 'pilot'
            }]
          }]
        };
      });
    }
  }

  _gearsChildren() {
    if (Array.isArray(GearSlot)) {
      return GearSlot.map((slotClass, slotIndex) => {
        let GearTypes = this.dataStoreManager.getStoreData('GearTypes');
        let disabled = Object.values(GearTypes)[slotIndex].length === 0;
        let slot = 'gear-slot-' + (slotIndex + 1);
        return {
          el: 'div',
          class: ['row', 'alt-bg', 'height-50', 'js-part-cont'],
          children: [{
            el: 'div',
            children: [{
              el: 'label',
              class: ['part-slot-type'],
              html: `${this._generateSlotIcon(slot)}`,
              title: SlotTextMap[slot]
            }, {
              el: 'input',
              type: 'text',
              class: 'js-input js-input-' + slotClass,
              readOnly: true,
              disabled: disabled
            }]
          }]
        };
      });
    }
  }

  _attributeTally() {
    return {
      el: 'div',
      class: 'attribute-tally',
      children: Attributes.map(attr => {
        return {
          el: 'label',
          html: this._generateAttrIcon(attr.toLowerCase()),
          children: [{
            el: 'span',
            class: 'js-tally-' + attr.charAt(0).toLowerCase(),
            text: 0
          }]
        };
      })
    };
  }

  _partList() {
    return {
      el: 'div',
      class: 'part-list',
      children: [{
        el: 'input',
        type: 'text',
        placeholder: 'Search Part/Pilot',
        class: ['part-list__search', 'js-search-part']
      }, {
        el: 'h3',
        text: 'Part List',
        children: [{
          el: 'span',
          text: 'Remove',
          class: ['part-list__remove', 'js-remove-part']
        }]
      }, {
        el: 'div',
        class: ['part-list__list', 'js-part-list']
      }]
    };
  }

  _generateAttrIcon(attr) {
    return `<span class='attr-icon gbgw-attribute-${attr}'></span>`;
  }

  _generateSlotIcon(slot) {
    return `<span class='slot-icon gbgw-${SlotIconMap[slot]}'></span>`;
  }

  _generateStatIcon(statKey) {
    return `<span class='ex-cat-icon gbgw-stat-${statKey}'></span>`;
  }
}