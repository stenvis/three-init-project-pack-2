import DOM from '/js/storage/dom.js';
import SYSTEM_PRESETS from '/js/system/presets.js';
import Configer from '/js/lib/configer/configer.js';
import Camera from '/js/lib/camera/camera.js';
import OrbitControl from '/js/lib/camera/controls/orbit.js';
import HemisphereLight from '/js/lib/light/hemisphere.js';
import PointLight from '/js/lib/light/point.js';

const 
   { canvas } = DOM,
   { CTX_PRESETS,
     CHARACTER_CAMERA_PRESETS,
     ORBIT_CONTROL_PRESETS,
     HEMISPHERE_LIGHT_PRESETS,
     POINT_LIGHT_L_PRESETS,
     POINT_LIGHT_R_PRESETS,
     POINT_LIGHT_F_PRESETS,
     POINT_LIGHT_B_PRESETS,
   } = SYSTEM_PRESETS;

const 
   configer = new Configer(),
   scene = new THREE.Scene(),
   renderer = new THREE.WebGLRenderer({
      canvas,
      ...CTX_PRESETS,
   });

configer.setRenderer(renderer);

example_controller.setScene(scene);

const 
   camera = new Camera(CHARACTER_CAMERA_PRESETS),
   orbit_control = new OrbitControl(camera.src, canvas, ORBIT_CONTROL_PRESETS),
   hemisphere_light = new HemisphereLight(HEMISPHERE_LIGHT_PRESETS),
   point_light_L = new PointLight(POINT_LIGHT_L_PRESETS),
   point_light_R = new PointLight(POINT_LIGHT_R_PRESETS),
   point_light_F = new PointLight(POINT_LIGHT_F_PRESETS),
   point_light_B = new PointLight(POINT_LIGHT_B_PRESETS);


orbit_control.src.update();

scene.add(point_light_L);
scene.add(point_light_R);
scene.add(point_light_F);
scene.add(point_light_B);
scene.add(hemisphere_light);

const system = {
   scene,
   renderer,
   camera,
   orbit_control,
};

export default system;