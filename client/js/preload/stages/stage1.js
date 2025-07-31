import DOM from "/js/storage/dom.js";
import temp_name from '/js/lib/project/index.js';
import render from '/js/system/render.js';
import UI from "/js/UI/ui.js";

const {
   preload_progress,
   preload_line,
   preload_value,
} = DOM;

function setProgressLineWidth(width) {
   preload_line.style.width = width + '%';
   preload_value.textContent = width + '%';
};

function start() {
   preload_progress.classList.add('hidden');
   setTimeout(() => { preload_progress.remove(); }, 450);

   temp_name.init();

   render.start();
   UI.register();
};

const stage_1 = {
   start,
   setProgressLineWidth,
};

export default stage_1;