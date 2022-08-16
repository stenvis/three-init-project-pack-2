class Controller {
   src_target;
   dst_target;
   collection;
   scene;

   constructor(collection) {
      this.collection = collection;
   }

   setScene(scene) {
      this.scene = scene;
   }

   setTarget(name) {
      this.src_target = this.collection.getObject(name);
   }

   addTarget(name) {
      this.setDstTarget(name);
      if (this.src_target == this.dst_target) return;
      this.replaceModel();
      if (this.src_target.extensions) this.src_target.extensions();
   }

   initFirstTarget(first_name = this.getCollectionKeys[0]) {
      this.setDstTarget(first_name);
      this.addModel();
      this.swapTarget();
      if (this.src_target.extensions) this.src_target.extensions();
   }

   setDstTarget(name) {
      this.dst_target = this.collection.getObject(name); 
   }

   addModel(model = this.dst_target.model.scene) {
      this.scene.add(model);
   }

   delModel(model = this.src_target.model.scene) {
      this.scene.remove(model);
   }

   swapTarget() {
      this.src_target = this.dst_target;
   }

   replaceModel() {
      this.delModel();
      this.addModel();
      this.swapTarget();
   }

   get getCurrentTarget() {
      return this.src_target;
   }

   get getCollectionKeys() {
      return this.collection.getObjectKeys;
   }
};

export default Controller;