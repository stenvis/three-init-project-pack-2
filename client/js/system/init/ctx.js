import Scene from '/js/lib/helpers/collection/scene.js';

const collection = ['models', 'hdrs', 'textures'];

const dataset = new Scene(collection);

window.THREE_APP = {
   dataset,
};

export default THREE_APP;