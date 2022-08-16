import GLTF from '/js/lib/loaders/gltf.js';
import handler from '/js/abstractions/handlers/shape.js';

class Example {
   #name;

   model = {
   };

   constructor(name, url) {
      this.#name = name;
      GLTF.load(url, this.model, handler);
   }

   extensions() {
   }
};

export default Example;