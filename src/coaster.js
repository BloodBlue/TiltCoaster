var scene, camera, renderer, controls;


init();
render();

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  var element = renderer.domElement;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  var light = new THREE.PointLight(0x999999, 100, 1000);
  light.position.set(0, 0, 0);
  scene.add(light);

  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(100, 32, 32),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('../assets/360scenery.jpg')
    })
  );
  sphere.scale.x = -1
  scene.add(sphere);
  
  controls = new THREE.OrbitControls(camera, element);
//  controls.enableDamping = true;
//  controls.dampingFactor = 0.25;
//  controls.enableZoom = false;
//  controls.addEventListener( 'change', render );
//  
//  function setOrientationControls() {
    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();
//  }
  
//  window.addEventListener('deviceorientation', setOrientationControls, true);
  window.addEventListener( 'resize', onWindowResize, false );
  
  document.body.appendChild(element);
}

function render() {
  console.log('rendering');
  controls.update();
	requestAnimationFrame(render);
	renderer.render(scene, camera);
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}