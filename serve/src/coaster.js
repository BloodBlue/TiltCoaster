var scene, camera, renderer, controls;


init();
render();


function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  effect = new THREE.StereoEffect( renderer );
  effect.setSize( window.innerWidth, window.innerHeight );
  
  var element = renderer.domElement;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  var light = new THREE.PointLight('#fff', 1, 1);
  light.position.set(0, 0, 0);
  scene.add(light);

   sphere = new THREE.Mesh(
    new THREE.SphereGeometry(100, 32, 32),
    new THREE.MeshBasicMaterial({
//      map: new THREE.TextureLoader().load('../assets/360scenery.jpg')
      map: new THREE.TextureLoader().load('../assets/360city.jpg')
    })
  );
  sphere.scale.x = -1
  scene.add(sphere);
  
  function setOrbitControls() {
    controls = new THREE.OrbitControls(camera, element);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.target.set(
      camera.position.x,
      camera.position.y,
      camera.position.z + 0.000000001
    );
  }
  
  function setOrientationControls() {
    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
  }
  
//  setOrbitControls();
  setOrientationControls();
  window.addEventListener( 'resize', onWindowResize, false );
  document.body.appendChild(element);
}

function render() {
  console.log('rendering');
	requestAnimationFrame(render);
  controls.update();
//  renderer.render(scene, camera);
  effect.render( scene, camera );
};
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}