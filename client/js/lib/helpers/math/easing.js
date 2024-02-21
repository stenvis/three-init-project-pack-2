const easing = {
   lerp,
   easeOutBack,
   easeInBack,
};

const { pow } = Math;

function lerp(pS, pE, diff) {
   return (1 - diff) * pS + diff * pE;
};

function easeOutBack(x) {
   const c1 = 1.70158, c3 = c1 + 1;
   return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
}

function easeInBack(x) {
   const c1 = 1.70158, c3 = c1 + 1;
   return c3 * x * x * x - c1 * x * x;
}

export default easing;
