class CScene {
   #basis_scene;

   constructor(scene) {
      this.#basis_scene = scene;
   }

   addScene(scene) {
      this.#basis_scene.add(scene);
   }

   addModel({ scene }) {
      this.addScene(scene);
   }

   delScene(scene) {
      scene.traverse(o => {
         if (o.geometry) o.geometry.dispose();
         if (o.material) {
            if (o.material.length) {
               for (let i = 0; i < o.material.length; ++i) o.material[i].dispose();
               return;
            };
            o.material.dispose();
         }
      });
      this.#basis_scene.remove(scene);
   }

   delModel({ scene }) {
      this.delScene(scene);
   }

   replaceModel(src_model, dst_model) {
      this.delModel(src_model);
      this.addModel(dst_model);
   }

   get scene() {
      return this.#basis_scene;
   }
};

export default CScene;