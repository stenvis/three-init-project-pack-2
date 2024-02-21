import element from "/js/lib/helpers/browser/dom-elements.js";

const {
   GEBI,
   GEBCN,
} = element;

const 
   canvas = GEBI('canvas'),
   progress_bar = GEBI('progress-bar'),
   loading_percentage = GEBI('loading-percentage'),
   app_version = GEBI('app-version');


const DOM = {
   canvas,
   progress_bar,
   loading_percentage,
   app_version,
};

export default DOM;