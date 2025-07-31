import easing from '/js/lib/helpers/math/easing.js';

const CAMERA_DAMPING_INDEX = 'camera_id';

const 
	ORBITAL_VIEWER_ROTATION_SPEED = 0.2,
	ORBITAL_VIEWER_DAMPING_FACTOR_INNER = 0.2,
	ORBITAL_VIEWER_DAMPING_FACTOR_OUTER = 0.1,
	ORBITAL_VIEWER_MAX_POLAR_ANGLE = 80,
	ORBITAL_VIEWER_MIN_POLAR_ANGLE = 20,
	ORBITAL_VIEWER_INERTIA_FACTOR = 0.5;

const
	CENTROID_VIEWER_MOVE_SPEED = 0.2,
	CENTROID_VIEWER_DAMPING_FACTOR = 0.1;

const 
	{ lerp } = easing,
	{ abs, PI, cos, sin, min, max, atan2 } = Math,
	DIR_LIMIT = 128,
	HALF_PI = PI / 2,
	RAD = PI / 180;

const 
	origin = new THREE.Vector3(),
	direction = new THREE.Vector3(),
	cross = new THREE.Vector3(),
	last_camera_pos = new THREE.Vector3(),
	last_centroid_pos = new THREE.Vector3(),
	dst_camera_pos = new THREE.Vector3(),
	dst_centroid_pos = new THREE.Vector3(),
	centroid_offset = new THREE.Vector3(),
	src_euler = new THREE.Euler(0, 0, 0, 'YXZ'),
	dst_euler = new THREE.Euler(0, 0, 0, 'YXZ'),
	_vector = new THREE.Vector3();

class OrbitalCamera {
	#camera;
	#pointerSpeed;
	#dampingInner;
	#dampingOuter;
	#dampingFactor;
	#inertiaFactor;
	#centroidDampingFactor;
	#dirX = 0;
	#dirY = 0;
	#distance = 0;
	#centroid;
	#angleThreshold;
	#centroidThreshold;
	#maxPolarAngle;
	#minPolarAngle;
	#touchForceRate = 1;
	#mode;

	constructor(camera) {
		this.#camera = camera;
		this.#dampingFactor = ORBITAL_VIEWER_DAMPING_FACTOR_OUTER || .1;
		this.#angleThreshold = 0.002;
		this.#centroidThreshold = 0.002;
		this.#centroid = new THREE.Vector3();

		this.#maxPolarAngle = ORBITAL_VIEWER_MAX_POLAR_ANGLE * RAD;
		this.#minPolarAngle = ORBITAL_VIEWER_MIN_POLAR_ANGLE * RAD;

		// if (THREE_APP.device_status.is_mobile) this.#touchForceRate = AROUND_VIEWER_TOUCH_FORCE_RATE_MOBILE;
		// if (THREE_APP.device_status.is_tablet) this.#touchForceRate = AROUND_VIEWER_TOUCH_FORCE_RATE_TABLET;

		this.#centroidDampingFactor = CENTROID_VIEWER_DAMPING_FACTOR;

		this.last_dirX = 0;
		this.last_dirY = 0;

		this.enableOrbital();
	}

	getDirection(v) {
		return v.set(0, 0, -1).applyQuaternion(this.#camera.quaternion);
	}

	angleThreshold() {
		const 
			dx = abs(src_euler.x - dst_euler.x),
			dy = abs(src_euler.y - dst_euler.y),
			tx = dx < this.#angleThreshold,
			ty = dy < this.#angleThreshold;

		return tx * ty;
	} 

	centroidThreshold(src_camera_pos) {
		const
			dx = abs(src_camera_pos.x - dst_camera_pos.x),
			dy = abs(src_camera_pos.z - dst_camera_pos.z),
			tx = dx < this.#centroidThreshold,
			ty = dy < this.#centroidThreshold;

		return tx * ty;
	}

	defineAngles() {
		this.#distance = this.#camera.position.distanceTo(origin);
		_vector.copy(this.#camera.position);
		dst_euler.x = src_euler.x = atan2(-_vector.x, _vector.z);
		dst_euler.y = src_euler.y = atan2(_vector.y, Math.sqrt(_vector.x * _vector.x + _vector.z * _vector.z));
	}

	updateByTouch(dirX, dirY) {
		dirX *= this.#touchForceRate;
		dirY *= this.#touchForceRate;
		this.#dirX = dirX || 0;
		this.#dirY = dirY || 0;
		this.move();
	}

	update(ev) {
		const dirX = ev.movementX || ev.mozMovementX || ev.webkitMovementX || 0;
		const dirY = ev.movementY || ev.mozMovementY || ev.webkitMovementY || 0;
		this.#dirX = max(-DIR_LIMIT, min(DIR_LIMIT,  dirX));
		this.#dirY = max(-DIR_LIMIT, min(DIR_LIMIT,  dirY));
		this.move();
	}

	setCentroid(centroid) {
		this.#centroid = centroid;
	}

	enableOrbital() {
		this.move = this.moveOrbital;
		this.damping = this.dampingOrbital;
		this.pointerUp = this.pointerUpOrbital;
		this.pointerDown = this.pointerDownOrbital;
		this.#pointerSpeed = ORBITAL_VIEWER_ROTATION_SPEED || 0.4;
		this.#dampingInner = ORBITAL_VIEWER_DAMPING_FACTOR_INNER || 0.3;
		this.#dampingOuter = ORBITAL_VIEWER_DAMPING_FACTOR_OUTER || 0.1;
		this.#inertiaFactor = ORBITAL_VIEWER_INERTIA_FACTOR || 0.4;
		this.#mode = 'orbital';
	}

	enableCentroid() {
		this.move = this.moveCentroid;
		this.damping = this.dampingCentroid;
		this.pointerUp = () => {};
		this.pointerDown = () => {};
		this.#camera.getWorldDirection(direction);
		cross.crossVectors(direction, this.#camera.up);
		last_camera_pos.copy(this.#camera.position);
		last_centroid_pos.copy(this.#centroid);
		centroid_offset.set(0, 0, 0);
		this.#pointerSpeed = CENTROID_VIEWER_MOVE_SPEED || 0.2;
		this.#mode = 'centroid';
	}

	disableCentroid() {
		this.move = this.moveOrbital;
		this.damping = this.dampingOrbital;
		this.pointerUp = this.pointerUpOrbital;
		this.pointerDown = this.pointerDownOrbital;
		this.#pointerSpeed = ORBITAL_VIEWER_ROTATION_SPEED || 0.4;
		this.#mode = 'orbital';
	}

	moveOrbital() {
		dst_euler.x += this.#dirX * this.#pointerSpeed * RAD;
		dst_euler.y += this.#dirY * this.#pointerSpeed * RAD;
		dst_euler.y = max(this.#minPolarAngle, min(this.#maxPolarAngle,  dst_euler.y));
	}

	moveCentroid() {
		const camera = this.#camera, { aspect } = camera;

		centroid_offset.x -= this.#dirX * 0.1 * this.#pointerSpeed;
		centroid_offset.z += this.#dirY * 0.1 * this.#pointerSpeed * aspect;

		const 
			rx = cross.x * centroid_offset.x,
			rz = cross.z * centroid_offset.x,
			fx = direction.x * centroid_offset.z,
			fz = direction.z * centroid_offset.z;

		dst_centroid_pos.x = last_centroid_pos.x + rx + fx;
		dst_centroid_pos.z = last_centroid_pos.z + rz + fz;
		dst_camera_pos.x = last_camera_pos.x + rx + fx;
		dst_camera_pos.z = last_camera_pos.z + rz + fz;
	}

	dampingOrbital = () => {
		const camera = this.#camera,
			x = src_euler.x = lerp(src_euler.x, dst_euler.x, this.#dampingFactor),
			y = src_euler.y = lerp(src_euler.y, dst_euler.y, this.#dampingFactor);

		_vector.x = -sin(x) * cos(y); _vector.y = sin(y); _vector.z = cos(x) * cos(y);
		_vector.multiplyScalar(this.#distance);

		camera.position.copy(_vector);
		camera.lookAt(this.#centroid);

		const threshold = this.angleThreshold();

		if (threshold) this.clearDamping(); 
	}

	dampingCentroid = () => {
		const centroid = this.#centroid, camera = this.#camera;
		centroid.x = lerp(centroid.x, dst_centroid_pos.x, this.#centroidDampingFactor);
		centroid.z = lerp(centroid.z, dst_centroid_pos.z, this.#centroidDampingFactor);
		camera.position.x = lerp(camera.position.x, dst_camera_pos.x, this.#centroidDampingFactor);
		camera.position.z = lerp(camera.position.z, dst_camera_pos.z, this.#centroidDampingFactor);

		camera.lookAt(centroid);

		const threshold = this.centroidThreshold(camera.position);

		if (threshold) this.clearDamping(); 
	}

	pointerUpOrbital() {
		this.#dampingFactor = this.#dampingOuter;
		dst_euler.y += this.#dirX * 0.01 * this.#inertiaFactor;
		dst_euler.x += this.#dirY * 0.01 * this.#inertiaFactor;
		dst_euler.y = max(this.#minPolarAngle, min(this.#maxPolarAngle,  dst_euler.y));
	}

	pointerDownOrbital() {
		this.defineAngles();
		this.#dampingFactor = this.#dampingInner;
	}

	clearDamping() {
		THREE_APP.system.pool.removeTarget(CAMERA_DAMPING_INDEX);
	}

	stubExecution() {
		this.move = () => {};
		this.damping = () => {};
	}

	moveForward(distance) {
		// move forward parallel to the xz-plane
		// assumes camera.up is y-up
		const camera = this.#camera;
		_vector.setFromMatrixColumn(camera.matrix, 0);
		_vector.crossVectors(camera.up, _vector);
		camera.position.addScaledVector(_vector, distance);
	}

	moveRight(distance) {
		const camera = this.#camera;
		_vector.setFromMatrixColumn(camera.matrix, 0);
		camera.position.addScaledVector(_vector, distance);
	}

	get centroid() {
		return this.#centroid;
	}

	get distance() {
		return this.#distance;	
	}

	get is_orbital() {
		return this.#mode == 'orbital';
	}
	
	get is_centroid() {
		return this.#mode == 'centroid';
	}
};

export default OrbitalCamera;