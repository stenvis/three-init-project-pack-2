import player from "./environment/player.js";

let last_time;

function init() {
   player.create();
};

function update(time) {
   const dt = time - last_time;
   last_time = time;
};

function resize(w, h, aspect) {

};

const temp_name = {
   init,
   update,
   resize,
};

export default temp_name;