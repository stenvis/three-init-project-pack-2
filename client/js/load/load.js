import models from '/js/storage/models.js'; 
import Collection from '/js/lib/collection/collection.js';
import CExample from '/js/abstractions/controllers/example.js';
import Example from '/js/abstractions/creational/example.js';
import GLTF from '/js/lib/loaders/gltf.js';
import initModels from '/js/load/init/models.js';

let _interval;
const INTERVAL_MS = 100;

const
   example_collection = new Collection();

window.example_controller = new CExample(example_collection);

const load = {
   start,
};

function loadCharacters() {
   for (const key in models) {
      const url = models[key].url;
      const example = new Example(key, url);
      example_collection.setObject(key, example);
   };
};

function loadResources() {
   loadCharacters();
};

function start() {
   loadResources();
   checkLoadStatus();
};

function checkLoadStatus() {
   const models_count = 
      example_collection.getObjectCount;

   _interval = setInterval(() => {
      if (models_count == GLTF.getLoadedCount) {
         initModels();
         window.render.start();
         clearInterval(_interval);
      };
   }, INTERVAL_MS);
};

export default load;