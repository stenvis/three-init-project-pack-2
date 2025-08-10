const { keys } = Object;

const clock = new THREE.Clock();

const FIXED_DT = 1 / 60;

// const { render } = window;

class AnimationPool {
   #keys = [];
   #keys_length;
   #pool = {};
   #is_runned;

   addTarget(key, fn) {
      this.#pool[key] = fn;
      this.updateLength();
      if (!this.#is_runned) {
         this.#is_runned = true;
         this.pass();
      }
   }

   removeTarget(key) {
      delete this.#pool[key];
      this.updateLength();
   }

   reset() {
      this.#keys = [];
      this.#pool = {};
      this.#keys_length = 0;
      this.#is_runned = false;

      window.render.cancelAnimationPool();
   }

   updateLength() {
      this.#keys = keys(this.#pool);
      this.#keys_length = this.#keys.length;
   }

   pass() {
      if (!this.#keys_length) {
         this.#is_runned = false;
         return;
      }
      // console.log('[Animation Pool]: pass');

      const t = clock.getElapsedTime();

      for (let i = 0; i < this.#keys_length; i++) {
         this.#pool[this.#keys[i]](t, FIXED_DT);
      }

      window.render.animate();
   }

   isKey(key) {
      return this.#keys.includes(key);
   }

   get is_runned() {
      return this.#keys_length;
   }
};

export default AnimationPool;