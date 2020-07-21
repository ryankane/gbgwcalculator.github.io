const run = () => {
  fetch('./data/data.json')
    .then(response => response.json())
    .then(json => onLoad(json));
};

const onLoad = (data) => {
  setValues({
    markdown: generateMarkdown,
    style: generateStyle,
    variables: generateVariables
  }, data);
};

const setValues = (config, data) => {
  for (let [key, value] of Object.entries(config)) {
    setValue(key, value.call(null, data));
  }
};

const setValue = (name, value) =>
  document.querySelector(`textarea[name="${name}"]`).value = value;

/**
* @param {object} data
* @param {object[]} data.events
* @param {object[]} data.capsules
* @returns {string}
*/
const generateMarkdown = (data) => {
  return `
  
## Current Events

${data.events.map(event => generateMarkdownSection(event)).join('\n\n')}

## Current Capsules

${data.capsules.map(capsule => generateMarkdownSection(capsule)).join('\n\n')}

  `.trim();
};

/**
 * @param {object} section
 * @param {string} section.notice
 * @param {object[]} section.images
 * @param {object[]} section.info
 * @returns {string}
 */
const generateMarkdownSection = (section) => {
  return [
    section.notice,
    section.images.map(image => `[${image.text || section.type}](${image.url})`).join('\n\n'),
    section.info ? section.info.map(info => `* ${info}`).join('\n') : null
  ].filter(content => content != null).join('\n\n');
};

/**
 * @param {object} data
 * @param {object[]} data.events
 * @param {object[]} data.capsules
 * @returns {string}
 */
const generateStyle = (data) => {
  return `

${generateStyleBanner('Events')}

${data.events.map(event => generateStyleSection(event)).join('\n\n')}

${generateStyleBanner('Capsules')}

${data.capsules.map(capsule => generateStyleSection(capsule)).join('\n\n')}

  `.trim();
};

const generateStyleSection = (section) => {
  return `

${generateStyleSubBanner(section.type)}

${section.images.map(image => generateStyleSubSection(section, image)).join('\n\n')}
  `.trim();
};

const generateStyleSubSection = (section, image) => {
  return `

/* Sidebar Image - ${image.text || section.type} */
.side a[href="${image.url}"] {
  display: inline-block;
  height: 120px; width: 100%;
  background: url(%%${image.id}%%) no-repeat;
  background-size: contain;
  color: transparent;
}
a[href="${image.url}"] { background-position: 0 0px; }

  `.trim();
};

const generateStyleBanner = (title) => `
/**
 * ==============================
 * ${title}
 * ==============================
 */
`.trim();

const generateStyleSubBanner = (title) => `
/**
 * ------------------------------
 * ${title}
 * ------------------------------
 */
`.trim();

/**
 * @param {object} data
 * @param {object[]} data.events
 * @param {object[]} data.capsules
 * @returns {string}
 */
const generateVariables = (data) => {
  return [...data.events, ...data.capsules]
      .flatMap(content => content.images)
      .map((image, index) => `

${('' + index).padStart(2, '0')}. ${image.id}

>>> ${image.url}

        `.trim()).join('\n\n')
      };

run();