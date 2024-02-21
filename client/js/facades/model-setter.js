import collections from '/js/lib/API/collections.js';

const {
   getModelCollection,
} = collections;

const model_setter = {
   setModel,
};

function setModel() {
   const 
      model_collection = getModelCollection(),
      model = model_collection.getObject('model_1');

   THREE_APP.workspace.setModel(model);
};

export default model_setter;