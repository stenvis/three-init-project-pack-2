class PointLight {
   light;

   constructor({ color, intensity, distance, decay, position }) {
      this.light = new THREE.PointLight(color, intensity, distance, decay);
      this.light.position.set(...position);
      return this.light;
   }
};

export default PointLight;