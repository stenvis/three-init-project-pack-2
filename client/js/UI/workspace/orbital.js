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

function move(ev) {
   if (is_locked) return;
   orbital.update(ev);
   was_move = true;
}

function pointerDown(ev) {
   if (ev.which == 3) {
      if (orbital.is_panning) return;
      orbital.setMode('panning');
      orbital.update(ev);
   }
   is_locked = false;
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
}

function pointerLeave() {
   orbital.setMode('orbital');
   is_locked = true;
   was_move = false;
}

function register() {
   initVariables();
   enable();
}

function enable() {
   addEv(canvas, 'pointerdown', pointerDown);
   addEv(window, 'pointermove', move);
   addEv(window, 'pointerup', pointerUp);
   addEv(canvas, 'wheel', changeZoom, { passsive: false });
   addEv(window, 'pointerleave', pointerLeave);
   addEv(window, 'visibilitychange', pointerLeave);
}

function disable() {
   delEv(canvas, 'pointerdown', pointerDown);
   delEv(window, 'pointermove', move);
   delEv(window, 'pointerup', pointerUp);
   delEv(canvas, 'wheel', changeZoom, { passsive: false });
   delEv(window, 'pointerleave', pointerLeave);
   delEv(window, 'visibilitychange', pointerLeave);
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