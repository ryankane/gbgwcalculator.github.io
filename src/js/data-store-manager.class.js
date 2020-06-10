class DataStoreManager {
  constructor() {
    this.stores = {};
    this.allLoadedFn = null;
  }

  getStore(name) {
    return this.stores[name];
  }

  getStoreData(name) {
    return this.getStore(name).getData();
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