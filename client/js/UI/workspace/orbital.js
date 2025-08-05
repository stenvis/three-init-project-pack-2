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
let camera, orbital, pool, zoom;

// need some way without id;
const CAMERA_DAMPING_INDEX = 'camera_id', ZOOM_DAMPING_INDEX = 'zoom_id';

function move(ev) {
   if (is_locked) return;
   orbital.update(ev);
   pool.addTarget(CAMERA_DAMPING_INDEX, orbital.damping);
   was_move = true;
   // window.render.update();
}

function pointerDown(ev) {
   if (ev.which == 3) {
      if (orbital.is_centroid) return;
      orbital.setMode('centroid');
      orbital.update(ev);
   }
   is_locked = false;
   pool.removeTarget(CAMERA_DAMPING_INDEX);
   orbital.pointerDown();
}

function pointerUp(ev) {
   if (ev.which == 3) {
      if (orbital.is_orbital) return;
      orbital.setMode('orbital');
      is_locked = true;
      return;
   }
   if (was_move) orbital.pointerUp();
   is_locked = true;
   was_move = false;
}

function changeZoom({ deltaY }) {
   zoom.change(deltaY);
   pool.addTarget(ZOOM_DAMPING_INDEX, zoom.damping);
}

function pointerLeave() {
   orbital.setMode('orbital');
   is_locked = true;
   was_move = false;
}

function register() {
   initVariables();
   addEvents();
}

function addEvents() {
   addEv(canvas, 'pointerdown', pointerDown);
   addEv(canvas, 'pointermove', move);
   addEv(canvas, 'pointerup', pointerUp);
   addEv(canvas, 'wheel', changeZoom);
   addEv(canvas, 'pointerleave', pointerLeave);
}

function delEvents() {
   delEv(canvas, 'pointerdown', pointerDown);
   delEv(canvas, 'pointermove', move);
   delEv(canvas, 'pointerup', pointerUp);
   delEv(canvas, 'wheel', zoom);
   delEv(canvas, 'pointerleave', pointerLeave);
}

function initVariables() {
   camera = THREE_APP.system.camera;
   orbital = THREE_APP.system.orbital;
   pool = THREE_APP.system.pool;
   zoom = THREE_APP.system.orbital.zoom;
}

const orbital_ui = {
   register,
};

export default orbital_ui;