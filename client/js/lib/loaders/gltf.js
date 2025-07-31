import { DRACOLoader } from '/dependencies/three/loaders/DRACOLoader.js';
import { GLTFLoader as _GLTFLoader } from '/dependencies/three/loaders/GLTFLoader.js'; 
import monitors from '/js/lib/controls/monitors.js';

const 
   DRACO_PATH = '/dependencies/three/draco/',
   draco_loader = new DRACOLoader().setDecoderPath(DRACO_PATH);

class GLTFLoader {
   #gltf;
   #counter = 0;

   constructor() {
      this.#gltf = new _GLTFLoader();
      this.#gltf.setDRACOLoader(draco_loader);
   }

   load(name, path, checkLoadStatus) {
      this.#gltf.load(path,
         model => {
            THREE_APP.dataset.models.setObject(name, model);
            this.loadDone();
            checkLoadStatus();
         },
         xhr => {
            if (xhr.lengthComputable) monitors.preload.updateTarget(name, xhr);
         },
      );
   }

   loadDone() {
      this.#counter += 1;
   }

   get getLoadedCount() {
      return this.#counter;
   }
};

const GLTF = new GLTFLoader();

export default GLTF;