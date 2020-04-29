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