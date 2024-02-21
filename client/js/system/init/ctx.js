import Scene from '/js/lib/abstractions/collections/scene-collections.js';
import facades from '/js/facades/facades.js';

const 
   collections_scene_1 = ['models'];

const
   scene_1 = new Scene(collections_scene_1);

const collections = {
   scene_1,
};

window.THREE_APP = {
   collections,
   facades,
};

export default {};
