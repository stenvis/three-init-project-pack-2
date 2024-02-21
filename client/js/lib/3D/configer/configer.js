const 
   CLEAR_COLOR = new THREE.Color(0xd1eaff),
   ALPHA = .5;

const ENCODING_TYPES = {
   sRGB: THREE.sRGBEncoding,
   Linear: THREE.LinearEncoding,
};

const MAPPING_TYPES = {
   ACESFilmic: THREE.ACESFilmicToneMapping,
   Reihard: THREE.ReinhardToneMapping,
   Cineon: THREE.CineonToneMapping,
   NoTone: THREE.NoToneMapping,
};

class Configer {
   #renderer;
   state = {
     encoding: null, 
     mapping: null,
     exposure: null,
   };

   setRenderer(renderer) {
      this.#renderer = renderer;
      this.basicConfiguration();
   }

   basicConfiguration() {
      this.setClearColor(CLEAR_COLOR, ALPHA);
      this.setEncoding('sRGB');
      this.setMapping('NoTone');
   }

   setClearColor(CLEAR_COLOR, ALPHA) {
      this.#renderer.setClearColor(CLEAR_COLOR, ALPHA);
   }

   setEncoding(encoding) {
      this.state.encoding = encoding;
      this.#renderer.colorSpace = ENCODING_TYPES[encoding];
   }

   setMapping(mapping) {
      this.state.mapping = mapping;
      this.#renderer.toneMapping = MAPPING_TYPES[mapping];
   }

   setExposure(_exposure) {
      this.state.exposure = _exposure;
      this.#renderer.toneMappingExposure = _exposure;
   }

   get encoding() {
      return this.state.encoding;
   }

   get mapping() {
      return this.state.mapping;
   }

   get exposure() {
      return this.state.exposure;
   }
};

export default Configer;
