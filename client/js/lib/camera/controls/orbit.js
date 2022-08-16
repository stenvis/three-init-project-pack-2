class OrbitControl {
   orbit;

   constructor(camera, canvas, presets) {
      this.orbit = new THREE.OrbitControls(camera, canvas);

      for (const key in presets)
         this.orbit[key] = presets[key];
   }

   get src() {
      return this.orbit;
   }

   setPosition(pos) {
      this.orbit.position.set(pos);
   }

   setDistance(min, max) {
      this.trackball.minDistance = min;
      this.trackball.maxDistance = max;
   }
};

export default OrbitControl;