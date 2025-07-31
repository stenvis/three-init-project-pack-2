import GLTF from '/js/lib/loaders/gltf.js';

let onload = 0;

function start(models, checkLoadStatus) {
   let total_models_count = 0;

   for (const name in models) {
      const { path } = models[name];
      GLTF.load(name, path, checkLoadStatus);
      onload++;
   };

   return total_models_count;
}

function getOnloadCount() {
   return onload;
}

function getReadyCount() {
   return GLTF.getLoadedCount;
}

const loadModels = {
   start,
   getOnloadCount,
   getReadyCount,
};

export default loadModels;