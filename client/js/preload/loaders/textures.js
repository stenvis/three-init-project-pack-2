import Texture from '/js/lib/loaders/texture.js';

let ready_count;

function getReadyCount() {
   return ready_count;
} 

function start(textures, done) {
   ready_count = 0;

   for (const key in textures) {
      const { url } = textures[key];
      Texture.load(key, url).then(({ loaded_count, texture }) => {
         THREE_APP.dataset.textures.setObject(key, texture);
         ready_count = loaded_count;
         done();
      });
   };
}

const loadTextures = {
   start,
   getReadyCount,
};

export default loadTextures;