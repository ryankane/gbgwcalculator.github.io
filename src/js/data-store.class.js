class DataStore {
  constructor(options) {
    let opts = Object.assign({}, DataStore.defaultOptions, options);
    this.url = opts.url;
    this.data = opts.data;
    this.manager = opts.manager;
    this.loaded = false;
  }

  setUrl(url) {
    this.url = url;
  }

  load() {
    let self = this;
    fetch (self.url)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          self.data = json;
          self.loaded = true;
          //console.log(json);
          if (self.manager) {
            self.manager.checkAllLoaded();
          }
        });
  }

  isLoaded() {
    return this.loaded;
  }

  getData() {
    return this.data;
  }
}

DataStore.defaultOptions = {
  url : '',
  data : [],
  manager : null
};