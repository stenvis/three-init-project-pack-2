import DOM from '/js/storage/dom.js';
import listener from '/js/lib/helpers/browser/listener.js';
import Resize from '/js/lib/3D/resize/resize.js';
import system from '/js/system/system.js';

let _renderRequested = false;

const
   { canvas } = DOM,
   { scene, renderer, camera, orbit_control } = system,
   { addEv } = listener;

const resize = new Resize(system, canvas);

const checkResize = () => {
   resize.update();
   update();
};

const update = () => {
   if (_renderRequested) return;
   _renderRequested = true;
   requestAnimationFrame(tick, canvas);
};

function tick() {
   _renderRequested = false;
   renderer.render(scene, camera.src);
   orbit_control.src.update();
};

function start() {
   tick();
   checkResize();
   addEv(window, 'resize', checkResize);
   addEv(orbit_control.src, 'change', update);
};

const render = {
   start,
   update,
   checkResize,
};

window.render = render;
export default render;
