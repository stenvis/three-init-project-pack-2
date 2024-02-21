class Model {
   #name;
   #scene;

   constructor(scene, name) {
      this.#scene = scene;
      this.#name = name;
   }

   get name() {
      return this.#name;
   }

   get scene() {
      return this.#scene;
   }
};

export default Model;