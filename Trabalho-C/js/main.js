/*global THREE, requestAnimationFrame, console*/

var cameras = Array(3); // 3 cameras

var container, camera, scene, controls, renderer;


function createScene() {
  'use strict';

  scene = new THREE.Scene();


  // Create the field geometry
  const fieldGeometry = new THREE.PlaneGeometry(500, 500, 500, 500);

  // Rotate the field geometry to the zx plane
  fieldGeometry.rotateX(-Math.PI / 2);

  // Generate the initial field texture and material
  fieldMaterial = generateInitialFieldMaterial();

  // Create the field mesh
  const fieldMesh = new THREE.Mesh(fieldGeometry, fieldMaterial);
  scene.add(fieldMesh);
  fieldMesh.position.y = -5;


  // Generate the initial sky texture with no stars
  skyTexture = generateInitialSkyTexture();

  // Create the sky material with the initial skyTexture
  const skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });

  // Create the sky geometry
  const skyGeometry = new THREE.SphereGeometry(500, 32, 32); // Adjust the size as needed

  // Create the sky mesh
  skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
  scene.add(skyMesh);



  casa = createCasa(0, 0, 0);
  casa.name = 'Casa';

  createRandomSobreiros(100);

  ovni = createOVNI(0, 30, 0);
  ovni.name = 'OVNI';

  createLua();
}


const ovniKeyStates = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};



function onKeyDown(e) {
  'use strict';
  
  switch (e.keyCode) {
    case 49: // 1
      // Update the field texture with more flowers
          updateFieldTexture(fieldMaterial.map);

          // Render the scene to see the updated texture
          renderer.render(scene, camera);
          camera = cameras[0];
          break;
    case 50: // 2
          // Update the sky texture with more stars
          updateSkyTexture(skyTexture);

          // Render the scene to see the updated texture
          renderer.render(scene, camera);
          camera = cameras[1];
          break;
    case 51: //3
          camera = cameras[2];
          break;
        //up arrow
    case 38:
        ovniKeyStates.ArrowUp = true;
          break;
      //down arrow
    case 40:
        ovniKeyStates.ArrowDown = true;
        break;
        //left arrow
    case 37:
          ovniKeyStates.ArrowLeft = true;
          break;
      //right arrow
    case 39:
          ovniKeyStates.ArrowRight = true;
          break;
    case 80: // P or p for point lights
      togglePointLights();
      break;
    case 83: // S or s for spotlight
      toggleSpotlight();
      break;
    // d
    case 68:
      directionalLight.visible = !directionalLight.visible;
      break;
    // D
    case 100:
      directionalLight.visible = !directionalLight.visible;
      break;
    case 81: // Q or q for Gouraud (diffuse) shading
      shadingType = 'diffuse';
      updateMaterials();
      break;
    case 87: // W or w for Phong shading
      shadingType = 'phong';
      updateMaterials();
      break;
    case 69: // E or e for Cartoon shading
      shadingType = 'toon';
      updateMaterials();
      break;
    case 82: // R or r for toggling lighting
      lightingEnabled = !lightingEnabled;
      updateMaterials();
      break;
    }
}



function onKeyUp(e) {
'use strict';

switch (e.keyCode) {
  //up arrow
  case 38:
    ovniKeyStates.ArrowUp = false;
    break;
  //down arrow
  case 40:
    ovniKeyStates.ArrowDown = false;
    break;
    //left arrow
    case 37:
      ovniKeyStates.ArrowLeft = false;
    break;
    //right arrow
  case 39:
    ovniKeyStates.ArrowRight = false;
    break;
  }
}



function updateMaterials() {
  'use strict';

  const updateObjectMaterials = (object) => {
    if (object instanceof THREE.Mesh) {
      switch (object.name) {
        case 'Telhado':
          object.material = sceneMaterials.Telhado[shadingType];
          object.material.flatShading = lightingEnabled;
          break;
        case 'Chamine':
          object.material = sceneMaterials.Chamine[shadingType];
          object.material.flatShading = lightingEnabled;
          break;
        case 'Estrutura':
          object.material = sceneMaterials.Estrutura[shadingType];
          object.material.flatShading = lightingEnabled;
          break;
        case 'Tronco':
          object.material = sceneMaterials.Tronco[shadingType];
          object.material.flatShading = lightingEnabled;
          break;
        case 'Folhas':
          object.material = sceneMaterials.Folhas[shadingType];
          object.material.flatShading = lightingEnabled;
          break;
        case 'Cockpit':
          object.material = sceneMaterials.OVNIcockpit[shadingType];
          object.material.flatShading = lightingEnabled;
          break;
        case 'OVNIbase':
          object.material = sceneMaterials.OVNIbase[shadingType];
          object.material.flatShading = lightingEnabled;
          break;
        case 'OVNIluzes':
          object.material = sceneMaterials.OVNIluzes[shadingType];
          object.material.flatShading = lightingEnabled;
          break;
        case 'OVNIcili':
          object.material = sceneMaterials.OVNIcili[shadingType];
          object.material.flatShading = lightingEnabled;
          break;
        case 'Lua':
          object.material = sceneMaterials.Lua[shadingType];
          object.material.flatShading = lightingEnabled;
          break;
      }
    }
  };

  const traverseObjects = (object) => {
    if (object instanceof THREE.Object3D) {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          updateObjectMaterials(child);
        }
      });
    }
  };

  traverseObjects(scene);
}




function moveOVNI() {
    ovni.position.x += ovniVelocityX;
  ovni.position.z += ovniVelocityZ;
}



function updateOVNIVelocity() {
  const speed = 0.5; // Adjust the speed as desired

  ovniVelocityX = 0;
  ovniVelocityZ = 0;
  
  if (ovniKeyStates['ArrowUp']) {
    ovniVelocityZ -= speed;
  }
  if (ovniKeyStates['ArrowDown']) {
    ovniVelocityZ += speed;
  }
  if (ovniKeyStates['ArrowLeft']) {
    ovniVelocityX -= speed;
  }
  if (ovniKeyStates['ArrowRight']) {
    ovniVelocityX += speed;
  }
  
  // Normalize diagonal movement
  const diagonalSpeed = Math.sqrt(ovniVelocityX * ovniVelocityX + ovniVelocityZ * ovniVelocityZ);
  if (diagonalSpeed > speed) {
    const factor = speed / diagonalSpeed;
    ovniVelocityX *= factor;
    ovniVelocityZ *= factor;
  }
}



function togglePointLights() {
  const pointLights = ovni.children.filter(child => child instanceof THREE.PointLight);
  pointLights.forEach(pointLight => {
    pointLight.visible = !pointLight.visible;
  });
}

function toggleSpotlight() {
  const spotlight = ovni.children.find(child => child instanceof THREE.SpotLight);
  spotlight.visible = !spotlight.visible;
}


function render() {
  'use strict';
  renderer.render(scene, camera);
}

function init() {
  'use strict';

  container = document.createElement('div');
  document.body.appendChild(container);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;

  container.appendChild(renderer.domElement);

  // Create and configure the camera
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(200, 200, 200);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  cameras[2] = camera;

  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();

  setupVR();
  createScene();
  createCameras();
  
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener("resize", onResize);
}


function setupVR() {
  'use strict';
  renderer.xr.enabled = true;
  document.body.appendChild(VRButton.createButton(renderer));
}



function animate() {
  'use strict';
  render();

  // Rotate the OVNI
  ovni.rotation.y += ovniRotationSpeed;
  
  updateOVNIVelocity();
  moveOVNI();
  
  requestAnimationFrame(animate);
}



function createCameras(){
    const cameraPositions = Array(Array(3));

    cameraPositions[2] = [200, 200, 200] //camera global1
    
    cameras[0] = createOrthographicCamera(170, 10, 200);
    cameras[1] = createOrthographicCamera(0, 200, 200);
}


function createPerspCamera(array) {
    'use strict';

    let cameraTemp = new THREE.PerspectiveCamera(70,
                                          window.innerWidth / window.innerHeight,
                                          1,
                                          1000);
    cameraTemp.position.x = array[0];
    cameraTemp.position.y = array[1];
    cameraTemp.position.z = array[2];
    cameraTemp.lookAt(scene.position);
    return cameraTemp;
}


function createOrthographicCamera(targetX, targetY, targetZ) {

  const cameraSize = 25;

  const camera = new THREE.OrthographicCamera(
      window.innerWidth / -cameraSize, // left
      window.innerWidth / cameraSize,  // right
      window.innerHeight / cameraSize, // top
      window.innerHeight / -cameraSize,// bottom
    1,                      // near
    1000                    // far
  );

  camera.position.set(targetX, 20, targetZ);
  camera.lookAt(new THREE.Vector3(targetX, targetY, targetZ));

  return camera;
}




function onResize() {
  'use strict';
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (window.innerHeight > 0 && window.innerWidth > 0) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

    console.log("Resized");

}