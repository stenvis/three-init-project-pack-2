class HemisphereLight {
   light;

   constructor({ skyColor, groundColor, intensity }) {
      this.light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      return this.light;
   }
};

export default HemisphereLight;