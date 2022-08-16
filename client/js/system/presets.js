const CTX_PRESETS = {
   antialias: true,
};

const CHARACTER_CAMERA_PRESETS = {
   fov: 75,
   aspect: 2,
   near: .25,
   far: 100,
   pos: [0.24, 0.5, 1],
   lookAt: [0, 1, 0],
};

const ORBIT_CONTROL_PRESETS = {
   minDistance: 7,
   maxDistance: 10,
   rotateSpeed: 0.4,
   zoomSpeed: 0.4,
   maxPolarAngle: (Math.PI / 2) - 0.05,
   enablePan: false,
   enableDamping: true,
};

const HEMISPHERE_LIGHT_PRESETS = {
   skyColor: 0xdef1fc,
   groundColor: 0xa39c91,
   intensity: .2,
};

const POINT_LIGHT_L_PRESETS = {
   color: 0xffffff,
   position: [0, 10, 50],
   intensity: .5,
};

const POINT_LIGHT_R_PRESETS = {
   color: 0xffffff,
   position: [0, 10, -50],
   intensity: .5,
};

const POINT_LIGHT_F_PRESETS = {
   color: 0xffffff,
   position: [10, 1, 0],
   intensity: .3,
};

const POINT_LIGHT_B_PRESETS = {
   color: 0xffffff,
   position: [-10, 1, 0],
   intensity: .3,
};

const SYSTEM_PRESETS = {
   CTX_PRESETS,
   CHARACTER_CAMERA_PRESETS,
   ORBIT_CONTROL_PRESETS,
   HEMISPHERE_LIGHT_PRESETS,
   POINT_LIGHT_L_PRESETS,
   POINT_LIGHT_R_PRESETS,
   POINT_LIGHT_F_PRESETS,
   POINT_LIGHT_B_PRESETS,
};

export default SYSTEM_PRESETS;