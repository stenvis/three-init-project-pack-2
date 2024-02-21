const { keys } = Object;

const object = {
   isEmptyObject,
   getObjectCount,
};

function isEmptyObject(obj) {
   if (!obj) return false;
   return !!keys(obj).length;
};

function getObjectCount(obj) {
   return Object.keys(obj).length;
};

export default object;