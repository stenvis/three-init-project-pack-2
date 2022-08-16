class DirectionalLight {
   light;

   constructor({ color, position, castShadow, intensity }) {
      this.light = new THREE.DirectionalLight(color, intensity);
      this.light.position.set(...position);
      this.light.castShadow = castShadow || false;
      return this.light;
   }
};

export default DirectionalLight;