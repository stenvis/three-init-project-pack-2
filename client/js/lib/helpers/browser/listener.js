const addEv = (element, evType, handler, options, obj = {
   addEv: (element, evType, handler) => (element.addEventListener(evType, handler), obj),
}) => (element.addEventListener(evType, handler, options), obj);

const addEvArr = (elements, evType, handler, obj = {
   addEvArr: (elements, evType, handler) => { for (const element of elements) element.addEventListener(evType, handler); return obj },
}) => { for (const element of elements) element.addEventListener(evType, handler); return obj };

const delEv = (element, evType, handler, obj = {
   delEv: (element, evType, handler) => (element.removeEventListener(evType, handler), obj),
}) => (element.removeEventListener(evType, handler), obj);

const delEvArr = (elements, evType, handler, obj = {
   delEvArr: (elements, evType, handler) => { for (const element of elements) element.removeEventListener(evType, handler); return obj },
}) => { for (const element of elements) element.removeEventListener(evType, handler); return obj };


const listener = {
   addEv,
   addEvArr,
   delEv,
   delEvArr,
};

export default listener;
