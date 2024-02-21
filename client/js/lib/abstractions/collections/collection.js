class Collection {
   #objects = {};
   #keys= [];

   getObject(key) {
      return this.#objects[key];
   }

   addObject(key, object) {
      this.#objects[key] = object;
      this.#keys.push(key);
   }

   delObject(key) {
      if (!this.#objects[key]) console.warn(`Can't delete object in collection, key: ${key} doesn't found`);
      delete this.#objects[key];
      const index = this.#keys.indexOf(key);
      this.#keys.splice(index, 1);
   }

   reset() {
      this.#objects = {};
      this.#keys = [];
   }

   get count() {
      return this.#keys.length; 
   }
   
   get keys() {
      return this.#keys;
   }

   get objects() {
      return this.#objects;
   }
};

export default Collection;