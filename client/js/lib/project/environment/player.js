let player_mesh;

function create() {
   const 
      { scene } = THREE_APP.system,
      { models } = THREE_APP.dataset;

   const geometry = new THREE.SphereGeometry(1, 64, 32);
   const material = new THREE.MeshStandardMaterial({ color: 0xfe3c4f });
   const sphere = new THREE.Mesh(geometry, material);
   const texture = THREE_APP.dataset.textures.getObject('uv_grid');
   material.map = texture;

   // player_mesh = models.getObject('xbot').scene;

   scene.add(sphere);
};

const player = {
   create,
};

export default player;