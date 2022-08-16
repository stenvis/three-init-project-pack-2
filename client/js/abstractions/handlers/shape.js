// const material = new THREE.MeshPhysicalMaterial({
//    color: new THREE.Color(0xa5a5a2),
//    metalness: 1.,
//    roughness: 1.,
//    side: THREE.DoubleSide,
// });

const material = new THREE.MeshLambertMaterial({
   color: new THREE.Color(0x807f85),
   side: THREE.DoubleSide,
});

function handler(_model, model) {
   saveScene(_model, model);
   saveMeshes(_model, model);
   setMaterial(_model);
};

function saveScene(_model, model) {
   _model.scene = model.scene;
   console.log(_model);
};

function setMaterial(_model) {
   for (const key in _model.meshes)
      _model.meshes[key].material = material;
};

function saveMeshes(_model) {
   const meshes = {};
   for (const child of _model.scene.children)
      meshes[child.name] = child;
   _model.meshes = meshes;
};

export default handler;