class RectangleLight {
   light;

   constructor({ color, intensity, width, height, position, rotation }) {
      this.light = new THREE.RectAreaLight(color, intensity, width, height);
      this.light.position.set(...position);
      this.light.rotation.set(...rotation);
      return this.light;
   }
};

export default RectangleLight;