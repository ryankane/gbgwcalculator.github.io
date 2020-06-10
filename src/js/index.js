const BASE_DATA_DIR = 'dist/data';
const dataStoreManager = new DataStoreManager();

dataStoreManager.addStores({
  Collections: `${BASE_DATA_DIR}/gunpla.json`,
  GearTypes: `${BASE_DATA_DIR}/gears.json`,
  Pilots: `${BASE_DATA_DIR}/pilots.json`,
  TraitDescriptions: `${BASE_DATA_DIR}/traits.json`
});

dataStoreManager.reloadAllStores(onAllStoresLoaded);

function onAllStoresLoaded() {
  main();
}

function main() {
  new GunplaCalculatorUiClass(dataStoreManager);
  new GunplaCalculator(dataStoreManager).init();

  toggleTheme();
  resize();
}

/**
 * Stretch the application viewport to fit the min width of the rendered container.
 * Without this, the filters will wrap.
 */
function resize() {
  const container = document.querySelector('.container');

  if (container.offsetWidth < 1500) {
    document.querySelector('.app').style.minWidth = `calc(${container.offsetWidth}px + 1em)`;
  }
}

function toggleTheme() {
  // Theme toggle button.
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  function switchTheme(e) {
    let darkModeEnabled = e.target.checked;
    document.documentElement.setAttribute('data-theme', darkModeEnabled ? 'dark' : 'light');
    localStorage.setItem('theme', darkModeEnabled ? 'dark' : 'light');
  }
  toggleSwitch.addEventListener('change', switchTheme, false);

// Restore theme state.
  const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
    }
  }
}

function toggleTooltip(event) {
  let el = event.currentTarget;
  if (el.getAttribute('data-balloon-visible')) {
    el.removeAttribute('data-balloon-visible');
  } else {
    el.setAttribute('data-balloon-visible', true);
    setTimeout(() => {
      if (el.getAttribute('data-balloon-visible')) {
        el.removeAttribute('data-balloon-visible');
      }
    }, 5000); // After 5 seconds, auto-hide.
  }
  document.querySelector('.part-list').focus(); // Force focus away from the element.
}