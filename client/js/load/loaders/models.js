import GLTF from '/js/lib/3D/loaders/gltf.js';
import Model from '/js/lib/abstractions/model/model.js';
import collections from '/js/lib/API/collections.js';

const {
   getModelCollection,
} = collections;

const loadModels = {
   start,
   getReadyCount,
};

let ready_count;

function getReadyCount() {
   return ready_count;
}; 

function start(models, done) {
   ready_count = 0;
   for (const key in models) {
      const target = models[key], { model_url, model_name } = target;
      GLTF.load(model_url, target).then(res => {
         const 
            { scene, loaded_count } = res,
            model_collection = getModelCollection(),
            model = new Model(scene, model_name); 

         model_collection.addObject(model_name, model);
         ready_count = loaded_count;
         done();
      });
   };
};

export default loadModels;