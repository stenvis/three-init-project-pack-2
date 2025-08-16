import Orbtial from "./extensions/orbital.js";
import Panning from "./extensions/panning-xy.js";
import Zoom from "./default/zoom.js";

const {
   max, min,
} = Math;

const
	DIR_LIMIT = 128;

class OrbitalCamera {
   #zoom;
   #extensions = {};
   #state = {
      dirX: 0,
      dirY: 0,
      distance: 0,

      origin: new THREE.Vector3(),
      direction: new THREE.Vector3(),
      cross: new THREE.Vector3(),
      last_camera_pos: new THREE.Vector3(),
      last_centroid_pos: new THREE.Vector3(),
      dst_camera_pos: new THREE.Vector3(),
      dst_centroid_pos: new THREE.Vector3(),
      centroid_offset: new THREE.Vector3(),
      src_euler: new THREE.Euler(0, 0, 0, 'YXZ'),
      dst_euler: new THREE.Euler(0, 0, 0, 'YXZ'),
      vec3: new THREE.Vector3(),
   };
   #mode;
   
   constructor(camera) {
      this.#extensions['orbital'] = new Orbtial(camera, this.#state); 
      this.#extensions['panning'] = new Panning(camera, this.#state); 

      this.#zoom = new Zoom(camera, this.#state);
      this.#state.distance = camera.position.distanceTo(this.#state.origin);

      this.setMode('orbital');
   }

   setMode(mode) {
      this.#mode = this.#extensions[mode];
      this.#mode.enable();
   }

   update(ev) {
      const dirX = ev.movementX || ev.mozMovementX || ev.webkitMovementX || 0;
      const dirY = ev.movementY || ev.mozMovementY || ev.webkitMovementY || 0;
      this.#state.dirX = max(-DIR_LIMIT, min(DIR_LIMIT, dirX));
      this.#state.dirY = max(-DIR_LIMIT, min(DIR_LIMIT, dirY));
      this.move();
   }

   move() { this.#mode.move(); }
   pointerUp() { this.#mode.pointerUp(); }
   pointerDown() { this.#mode.pointerDown(); }

	get is_orbital() { return this.#mode == 'orbital'; }
	get is_panning() { return this.#mode == 'panning'; }

   get zoom() { 
      if (!this.#zoom) {
         console.warn('%c Zoom not found!', 'color: red');
         return;
      }
      return this.#zoom;
   }
}

export default OrbitalCamera;