import DOM from '/js/storage/dom.js';
import HTMLNode from '/js/lib/helpers/browser/HTMLNode.js';

const {
   progress_bar,
} = DOM;

const {
   addClass,
} = HTMLNode;

const basic_stage = {
   start,
};

function start() {
   addClass(progress_bar, 'hidden');
   THREE_APP.facades.model_setter.setModel();
   window.render.start();
   setTimeout(() => {
      progress_bar.remove();
   }, 500);
};

export default basic_stage;
