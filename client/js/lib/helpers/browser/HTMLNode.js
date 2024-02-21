const HTMLNode = {
   insertAdjacent,
   addClass,
   addSrc,
   rmClass,
   toggleClass,
   toggleClasses,
   switchClass,
   removeChilds,
   addChild,
   setContent,
   setAttribute,
   isActive,
};

function insertAdjacent(target, node, adjacent = 'beforeend') {
   target.insertAdjacentHTML(adjacent, node);
};

function addClass(target, _class = 'active') {
   target.classList.add(_class);
};

function rmClass(target, _class = 'active') {
   target.classList.remove(_class);
};

function toggleClass(target, _class = 'active') {
   target.classList.toggle(_class);
};

function toggleClasses(targets, _class = 'active') {
   for (const target of targets)
      target.classList.toggle(_class);
};

function switchClass(src, dst) {
   toggleClass(src);
   toggleClass(dst);
   return dst;
};

function removeChilds(target) {
   let child = target.lastElementChild; 
   if (!child) return;
   while (child) {
      target.removeChild(child);
      child = target.lastElementChild;
   };
};

function addChild(target, child) {
   target.appendChild(child);
};

function setContent(target, value) {
   target.textContent = value;
};

function addSrc(target, src) {
   target.src = src;
};

function setAttribute(target, value, name='name') {
   target.setAttribute(name, value);
};

function isActive(target, _class = 'active') {
   return target.classList.contains(_class);
};

export default HTMLNode;