class Camera {
   camera;

   constructor({ fov, aspect, near, far, pos, lookAt }) {
      // const frustum = 10;
      // this.camera = new THREE.OrthographicCamera(frustum * aspect / -2, frustum * aspect / 2, frustum / 2, frustum / -2, near, far);
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