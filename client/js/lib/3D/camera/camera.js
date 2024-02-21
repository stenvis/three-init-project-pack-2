class Camera {
   camera;

   constructor({ fov, aspect, near, far, pos, lookAt }) {
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.setPositionXYZ(pos);
      this.setLookAt(lookAt);
   }

   setAspect(aspect) {
      this.camera.aspect = aspect;
   }

   setPositionXYZ(pos) {
      this.camera.position.set(...pos);
   }

   setLookAt(lookAt) {
      this.camera.lookAt(...lookAt);
   }

   get src() {
      return this.camera;
   }
};

export default Camera;