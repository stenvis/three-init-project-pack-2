import BLMonitor from '/js/lib/helpers/monitor.js';
import stage_1 from '/js/preload/stages/stage1.js';

const 
   { setProgressLineWidth } = stage_1;

const 
   preload = new BLMonitor(setProgressLineWidth);

const monitors = {
   preload,
};

export default monitors;