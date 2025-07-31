import listener from '/js/lib/helpers/browser/listener.js';
import DOM from '/js/storage/dom.js';

const {
   canvas,
} = DOM;

const {
   addEv,
   delEv,
} = listener;

let is_locked = true, was_move = false;
let camera, orbital, pool;

// need some way without id;
const CAMERA_DAMPING_INDEX = 'camera_id';

function move(ev) {
   if (is_locked) return;
   orbital.update(ev);
   pool.addTarget(CAMERA_DAMPING_INDEX, orbital.damping);
   was_move = true;
   // window.render.update();
}

function pointerDown(ev) {
   if (ev.which == 3) {
      if (!orbital.is_orbital) return;
      orbital.enableCentroid(ev);
   }
   is_locked = false;
   pool.removeTarget(CAMERA_DAMPING_INDEX);
   orbital.pointerDown();
}

function pointerUp(ev) {
   if (ev.which == 3) {
      if (!orbital.is_centroid) return;
      orbital.disableCentroid();
      is_locked = true;
      return;
   }
   if (was_move) orbital.pointerUp();
   is_locked = true;
   was_move = false;
}

function register() {
   initVariables();
   _register();
}

function _register() {
   addEv(canvas, 'pointerdown', pointerDown);
   addEv(canvas, 'pointermove', move);
   addEv(canvas, 'pointerup', pointerUp);
}

function _unregister() {
   delEv(canvas, 'pointerdown', pointerDown);
   delEv(canvas, 'pointermove', move);
   delEv(canvas, 'pointerup', pointerUp);
}

function initVariables() {
   camera = THREE_APP.system.camera;
   orbital = THREE_APP.system.orbital;
   pool = THREE_APP.system.pool;
}

const orbital_ui = {
   register,
};

export default orbital_ui;