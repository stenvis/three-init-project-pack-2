import listener from '/js/lib/helpers/browser/listener.js';

const {
   addEv,
} = listener;

function disableContextMenu(ev) {
   ev.preventDefault();
}

function register() {
   addEv(document, 'contextmenu', disableContextMenu); 
}

const system_ui = {
   register,
};

export default system_ui;