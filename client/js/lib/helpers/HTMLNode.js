const HTMLNode = {
   insertAdjacent,
   toggleClass,
   toggleClasses,
   switchClass,
   removeChilds,
   setContent,
};

function insertAdjacent(target, node, adjacent = 'beforeend') {
   target.insertAdjacentHTML(adjacent, node);
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

function setContent(target, value) {
   target.textContent = value;
};

export default HTMLNode;