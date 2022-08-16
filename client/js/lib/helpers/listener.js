const add = (element, evType, handler, obj = {
   add: (element, evType, handler) => (element.addEventListener(evType, handler), obj),
}) => (element.addEventListener(evType, handler), obj);

const addList = (elements, evType, handler, obj = {
   addByLoop: (elements, evType, handler) => { for (const element of elements) element.addEventListener(evType, handler); return obj },
}) => { for (const element of elements) element.addEventListener(evType, handler); return obj };

const del = (element, evType, handler, obj = {
   rm: (element, evType, handler) => (element.removeEventListener(evType, handler), obj),
}) => (element.removeEventListener(evType, handler), obj);

const delList = (elements, evType, handler, obj = {
   rmByLoop: (elements, evType, handler) => { for (const element of elements) element.removeEventListener(evType, handler); return obj },
}) => { for (const element of elements) element.removeEventListener(evType, handler); return obj };


const listener = {
   add,
   addList,
   del,
   delList,
};

export default listener;
