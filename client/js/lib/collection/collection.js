class Collection {
   objects = {};

   getObject(key) {
      return this.objects[key];
   }

   setObject(key, object) {
      this.objects[key] = object; 
   }

   get getObjectCount() {
      return Object.keys(this.objects).length;
   }
   
   get getObjectKeys() {
      return Object.keys(this.objects);
   }
};

export default Collection;