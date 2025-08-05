import easing from "/js/lib/helpers/math/easing.js";

const {
   abs,
} = Math;

const {
   lerp,
} = easing;

const
	MOVE_SPEED = 0.2,
   CENTROID_THRESHOLD = 0.002,
	DAMPING_FACTOR = 0.1;

const CAMERA_DAMPING_INDEX = 'camera_id';

class Centroid {
   #camera;
   #state;

   constructor(camera, state) {
      this.#camera = camera;
      this.#state = state;
   }

	enable() {
      const { origin, direction, cross, last_camera_pos, last_centroid_pos, centroid_offset } = this.#state;
		this.#camera.getWorldDirection(direction);
		cross.crossVectors(direction, this.#camera.up);
		last_camera_pos.copy(this.#camera.position);
		last_centroid_pos.copy(origin);
		centroid_offset.set(0, 0, 0);
	}

	move() {
		const camera = this.#camera, { aspect } = camera;
      const { centroid_offset, dirX, dirY, cross, direction, dst_centroid_pos, dst_camera_pos, last_centroid_pos, last_camera_pos } = this.#state;

		centroid_offset.x -= dirX * 0.1 * MOVE_SPEED;
		centroid_offset.y -= dirY * 0.1 * MOVE_SPEED;

		const
			rx = cross.x * centroid_offset.x,
			ry = cross.y * centroid_offset.x,
			fx = direction.x * centroid_offset.y,
			fy = direction.y * centroid_offset.y;

		dst_centroid_pos.x = last_centroid_pos.x + rx + fx;
		dst_centroid_pos.y = last_centroid_pos.y + ry + fy;
		dst_camera_pos.x = last_camera_pos.x + rx + fx;
		dst_camera_pos.y = last_camera_pos.y + ry + fy;
	}

	helper(origin) {
		THREE_APP.system.sphere.position.copy(origin);
	}

	damping = () => {
      const { origin, dst_centroid_pos, dst_camera_pos } = this.#state, camera = this.#camera;
		origin.x = lerp(origin.x, dst_centroid_pos.x, DAMPING_FACTOR);
		origin.y = lerp(origin.y, dst_centroid_pos.y, DAMPING_FACTOR);
		camera.position.x = lerp(camera.position.x, dst_camera_pos.x, DAMPING_FACTOR);
		camera.position.y = lerp(camera.position.y, dst_camera_pos.y, DAMPING_FACTOR);

		camera.lookAt(origin);
		this.helper(origin);

		const threshold = this.offsetThreshold(camera.position);

		if (threshold) this.clear(); 
	}

   clear() {
		THREE_APP.system.pool.removeTarget(CAMERA_DAMPING_INDEX);
	}

	offsetThreshold(src_camera_pos) {
      const { dst_camera_pos } = this.#state;
		const
			dx = abs(src_camera_pos.x - dst_camera_pos.x),
			dy = abs(src_camera_pos.y - dst_camera_pos.y),
			tx = dx < CENTROID_THRESHOLD,
			ty = dy < CENTROID_THRESHOLD;

		return tx * ty;
	}

   pointerUp = () => {};
   pointerDown = () => {};
}

export default Centroid;