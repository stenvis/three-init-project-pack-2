const RGB_COLORS = {};

const color = {
   getRGB,
   precalcRGBColors,
};

function getRGB(key) {
   return RGB_COLORS[key];
};

function parseRGBOfElement(el) {
   const key = el.classList[2];
	const color = window.getComputedStyle(el, null).getPropertyValue('background-color');
   RGB_COLORS[key] = new THREE.Color(color);
};

function precalcRGBColors(elements_list) { 
   for (const el of elements_list) parseRGBOfElement(el);
};

export default color;