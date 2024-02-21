import CScene from "/js/lib/abstractions/controllers/scene.js";

class Workspace extends CScene {
   #active_model;

   constructor(src_scene) {
      super(src_scene);
   }

   setModel(model) {
      this.#active_model = model;
      this.addModel(model);
   }

   get active_model() {
      return this.#active_model;
   }
};

export default Workspace;