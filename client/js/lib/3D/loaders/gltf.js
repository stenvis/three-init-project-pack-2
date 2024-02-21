import { DRACOLoader } from '/dependencies/three/loaders/DRACOLoader.js';
import { GLTFLoader as _GLTFLoader } from '/dependencies/three/loaders/GLTFLoader.js';

const DRACO_PATH = '/dependencies/three/draco/';
const draco_loader = new DRACOLoader().setDecoderPath(DRACO_PATH);

class GLTFLoader {
   #gltf;
   #counter = 0;

   constructor() {
      this.#gltf = new _GLTFLoader();
      this.#gltf.setDRACOLoader(draco_loader);
   }

   load(path) {
      const promise = new Promise(res => {
         this.#gltf.load(path, gltf => {
            this.loadDone();

            const 
               { loaded_count } = this,
               { scene } = gltf,
               response = {
                  scene,
                  loaded_count,
               };

            res(response);
         });
      });
      return promise;
   }

   loadDone() {
      this.#counter += 1;
   }

   get loaded_count() {
      return this.#counter;
   }
};

const GLTF = new GLTFLoader();

export default GLTF;