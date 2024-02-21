import DOM from '/js/storage/dom.js';
import models from '/js/storage/onload/models.js';
import loadFonts from './loaders/fonts.js';
import loadModels from './loaders/models.js';
import percentage from '/js/lib/helpers/math/percentage.js'; 
import object from '/js/lib/helpers/object/object.js'; 
import basic_stage from '/js/load/stages/basic-stage.js';

const
   { loading_percentage, } = DOM,
   { calcLoading } = percentage,
   { getObjectCount } = object;

let loading_is_done = false;

const loader = {
   start,
};

function checkLoadStatus() {
   const
      items_count =  loadFonts.fontCount + getObjectCount(models),
      loaded_count = loadFonts.getReadyCount() + loadModels.getReadyCount(),
      percentage = calcLoading(loaded_count, items_count);

   loading_percentage.innerText = percentage + '%';

   if (items_count == loaded_count) {
      if (loading_is_done) console.warn('%c Simple stage already executed, loading leak!', 'color: red');
      basic_stage.start();
      loading_is_done = true;
   };
};

function start() {
   loadFonts.start(checkLoadStatus);
   loadModels.start(models, checkLoadStatus);
};

export default loader;