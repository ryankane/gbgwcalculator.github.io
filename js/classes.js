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

class DataStoreManager {
  constructor() {
    this.stores = {};
    this.allLoadedFn = null;
  }

  getStore(name) {
    return this.stores[name];
  }

  addStore(name, requestUrl) {
    let self = this;
    self.stores[name] = new DataStore({
      url : requestUrl,
      manager : self
    });
  }

  addStores(config) {
    let self = this;
    Object.keys(config).forEach(storeName => {
      self.addStore(storeName, config[storeName]);
    });
  }

  reloadAllStores(allLoadedFn) {
    this.allLoadedFn = allLoadedFn;
    Object.values(this.stores).forEach(store => store.load());
  }

  checkAllLoaded() {
    if (Object.values(this.stores).every(store => store.isLoaded())) {
      if (this.allLoadedFn) {
        this.allLoadedFn();
      }
    }
  }
}