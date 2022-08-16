import DOM from '/js/storage/dom.js';
import listener from '/js/lib/helpers/listener.js';
import Resize from '/js/lib/resize/resize.js';
import system from '/js/system/system.js';

let _renderRequested = false;

const
   { canvas } = DOM,
   { scene, renderer, camera, orbit_control } = system;

const resize = new Resize(system, canvas);

const checkResize = () => { 
   resize.check();
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
}

function start() {
   tick();
   listener.add(window, 'resize', checkResize);
   listener.add(orbit_control.src, 'change', update)
   checkResize();
};

const render = {
   start,
   update,
};

window.render = render;
export default render;
