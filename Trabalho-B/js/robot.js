/*global THREE, requestAnimationFrame, console*/

var cameras = Array(5); // 5 câmeras
var camera, scene, renderer;

var trailerSpeed = 0.5; // Velocidade de movimento do reboque
var trailerDirection = new THREE.Vector3(); // Direção do movimento do reboque

//list of all materials
var materials = [];

var legGroupArray = []; // Array to store legGroup objects
var footGroupArray = []; // Array to store footGroup objects
var armGroupArray = []; // Array to store armGroup objects

var legRotateSpeed = 0.05; // Rotation speed for the legs
var footRotateSpeed = 0.05; // Rotation speed for the feet
var headRotateSpeed = 0.05; // Rotation speed for the arms



function createGeometry(width, height, depth) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const edges = new THREE.EdgesGeometry(geometry);
  return [geometry, edges];
}

function createMaterial(color) {
  const material = new THREE.MeshBasicMaterial({ color });
  materials.push(material);
  return material;
}

function createMesh(obj, geometry, material, x, y, z) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
  return mesh;
}

function createOutline(mesh, edges, color) {
  const outlineMaterial = new THREE.LineBasicMaterial({ color });
  const outline = new THREE.LineSegments(edges, outlineMaterial);
  mesh.add(outline);
}

function addTronco(obj, x, y, z) {
  const [geometry, edges] = createGeometry(7, 3, 4);
  const material = createMaterial(0xff0000);
  const tronco = createMesh(obj, geometry, material, x, y + 4.5, z + 10);
  createOutline(tronco, edges, 0xffffff);
}

function addAbdomen(obj, x, y, z) {
  const [geometry, edges] = createGeometry(3, 2, 4);
  const material = createMaterial(0xffffff);
  const abdomen = createMesh(obj, geometry, material, x, y + 2, z + 10);
  createOutline(abdomen, edges, 0x23);
}

function addCintura(obj, x, y, z) {
  const [geometry, edges] = createGeometry(7, 2, 4);
  const material = createMaterial(0xffffff);
  const cintura = createMesh(obj, geometry, material, x, y, z + 10);
  cintura.name = 'cintura';
  createOutline(cintura, edges, 0x6B6362);
}

function addHead(obj, x, y, z) {
  
  const [geometry, edges] = createGeometry(2, 2, 2);
  const material = createMaterial(0x0000ff);
  const head = createMesh(obj, geometry, material, x, y + 5, z + 7);
  head.name = 'head';

  const eyeGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.2);
  const eyeMaterial = createMaterial(0xffffff);
  const leftEye = createMesh(head, eyeGeometry, eyeMaterial, x - 5.5, y + 1, z - 6.5);
  const rightEye = createMesh(head, eyeGeometry, eyeMaterial, x - 4.5, y + 1, z - 6.5);

  const antennaGeometry = new THREE.BoxGeometry(0.2, 0.2, 1.2);
  const antennaMaterial = createMaterial(0x0000ff);
  const leftAntenna = createMesh(head, antennaGeometry, antennaMaterial, x - 6, y + 0.5, z - 7.5);
  const rightAntenna = createMesh(head, antennaGeometry, antennaMaterial, x - 4, y + 0.5, z - 7.5);
}

function addArm(obj, side, x, y, z) {
  const [geometry, edges] = createGeometry(2, 3, 2);
  const material = createMaterial(0xff0000);

  // Create the arm group object
  const armGroup = new THREE.Group();
  
  // Create the arm mesh
  const arm = createMesh(armGroup, geometry, material,  x, y + 4.5, z + 7);

  if (side === 'left') {
    arm.position.x -= 2.5;
  } else if (side === 'right') {
    arm.position.x += 2.5;
  }

  // Add the arm to the arm group
  armGroup.add(arm);

  const [loweArmGeometry, loweArmEdges] = createGeometry(2, 2, 6);
  // Create the lower arm mesh
  const lowerArm = createMesh(armGroup, loweArmGeometry, material, x, y + 2, z + 9);

  if (side === 'left') {
    lowerArm.position.x -= 2.5;
  } else if (side === 'right') {
    lowerArm.position.x += 2.5;
  }

  // Add the lower arm to the arm group
  armGroup.add(lowerArm);
  
  // Add the arm group to the scene
  obj.add(armGroup);

  // Store the arm group object in the array
  armGroupArray.push(armGroup);

  createOutline(arm, edges, 0xffffff);
  createOutline(lowerArm, loweArmEdges, 0xffffff);
}


function addLeg(obj, side, x, y, z) {
  const legGroup = new THREE.Group(); // Create a group to hold the leg assembly
  legGroup.position.set(x, y, z); // Set the position of the leg assembly

  const [geometry, edges] = createGeometry(2.5, 2.5, 10);
  const material = createMaterial(0x0000ff);
  const leg = createMesh(legGroup, geometry, material, 0, 0, 1); // Add the leg to the leg group
  leg.position.set(0, 0, 1); // Set the position of the leg relative to the leg group
  if (side === 'left') {
    leg.position.x -= 2;
  } else if (side === 'right') {
    leg.position.x += 2;
  }
  createOutline(leg, edges, 0xffffff);

  const coxaGroup = new THREE.Group(); // Create a group for the coxa
  coxaGroup.position.set(0, 0, 6); // Set the position of the coxa relative to the leg
  leg.add(coxaGroup); // Add the coxa group as a child of the leg

  const [coxaGeometry, coxaEdges] = createGeometry(1.5, 1.5, 4);
  const coxaMaterial = createMaterial(0xffffff);
  const coxa = createMesh(coxaGroup, coxaGeometry, coxaMaterial, 0, 0, 0); // Add the coxa to the coxa group
  createOutline(coxa, coxaEdges, 0x6B6362);

  const footGroup = new THREE.Group(); // Create a group for the foot
  footGroup.position.set(0, 0, -6); // Set the position of the foot relative to the leg
  leg.add(footGroup); // Add the foot group as a child of the leg
  footGroupArray.push(footGroup);

  const [footGeometry, footEdges] = createGeometry(2.5, 2.5, 2);
  const footMaterial = createMaterial(0x0000ff);
  const foot = createMesh(footGroup, footGeometry, footMaterial, 0, 0, 0); // Add the foot to the foot group
  createOutline(foot, footEdges, 0xffffff);

  let wheelPositions; // Declare wheelPositions variable

  if (side === 'left') {
    wheelPositions = [
      [-2, 0, -5], // back-right wheel
      [-2, 0, -2], // backmid-right wheel
    ];
  } else if (side === 'right') {
    wheelPositions = [
      [2, 0, -5], // front-left wheel
      [2, 0, -2], // frontmid-leg wheel
    ];
  }

  for (let i = 0; i < 2; i++) {
    const wheelGroup = new THREE.Group(); // Create a group for each wheel
    wheelGroup.position.set(wheelPositions[i][0], wheelPositions[i][1], wheelPositions[i][2]);
    leg.add(wheelGroup); // Add the wheel group as a child of the leg

    addWheel(wheelGroup, side, 0, 0, 0); // Add the wheel to the wheel group
  }

  legGroupArray.push(legGroup);
  obj.add(legGroup); // Add the leg group to the robot object

}



function addWheel(obj, side, x, y, z) {
  const pneuGeometry = new THREE.CylinderGeometry(1.5, 1.5, 1, 32);
  const pneuMaterial = createMaterial(0x000000);
  const pneu = createMesh(obj, pneuGeometry, pneuMaterial, x, y, z);
  pneu.rotation.x = Math.PI / 2;
  pneu.rotation.z = Math.PI / 2;

  const calotaGeometry = new THREE.CircleGeometry(1, 32);
  const calotaMaterial = createMaterial(0xffffff);
  const calota = createMesh(obj, calotaGeometry, calotaMaterial, x, y, z);
  calota.rotation.y = Math.PI / 2;
  if (side === 'left') {
    calota.position.x = x - 0.6;
  } else if (side === 'right') {
    calota.position.x = x + 0.6;
  }
}


function addEscape(obj, side, x, y, z) {
  const geometry = new THREE.CylinderGeometry(0.3, 0.3, 4, 32);
  const material = createMaterial(0x000000);
  const escape = createMesh(obj, geometry, material, x, y + 5, z + 5.5);
  if (side === 'left') {
    escape.position.x -= 2.5;
  } else if (side === 'right') {
    escape.position.x += 2.5;
  }
}

function createRobot(x, y, z) {
  const robot = new THREE.Object3D();

  addTronco(robot, x, y, z);
  addAbdomen(robot, x, y, z);
  addCintura(robot, x, y, z);
  addArm(robot, 'left', x, y, z);
  addArm(robot, 'right', x, y, z);

  addHead(robot, x, y, z);

  addLeg(robot, 'left', x, y, z);
  addLeg(robot, 'right', x, y, z);

  addWheel(robot, 'right', x + 4, y, z + 8);

  addWheel(robot, 'left', x - 4, y, z + 8);


  /*addEscape(robot, 'left', x, y, z);
  addEscape(robot, 'right', x, y, z);*/

  scene.add(robot);
}

function addContentor(reboque, x, y, z) {
  const [geometry, edges] = createGeometry(6, 7, 20);
  const material = createMaterial(0xC8C5C5);
  const contentor = createMesh(reboque, geometry, material, x, y + 4.8, z + 10);
  createOutline(contentor, edges, 0xffffff);
}

function addSuporte(reboque, x, y, z) {
  const [geometry, edges] = createGeometry(6.5, 2.5, 10);
  const material = createMaterial(0x0000ff);
  const suporte = createMesh(reboque, geometry, material, x, y, z + 5);
  createOutline(suporte, edges, 0xffffff);
}

function addPeçaLigação(reboque, side, x, y, z) {
  const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
  const material = createMaterial(0x000000);
  const peçaLigação = createMesh(reboque, geometry, material, x, y, z+11);
  peçaLigação.rotation.x = Math.PI / 2;
  if (side === 'left') {
    peçaLigação.position.x -= 2;
  } else if (side === 'right') {
    peçaLigação.position.x += 2;
  }
}

function createReboque(x, y, z) {
  const reboque = new THREE.Object3D();
  reboque.name = 'reboque';
  addContentor(reboque, x, y, z);
  addSuporte(reboque, x, y, z);

  addPeçaLigação(reboque, 'left', x, y, z);
  addPeçaLigação(reboque, 'right', x, y, z);

  addWheel(reboque, 'right', x + 4, y, z + 2);
  addWheel(reboque, 'right', x + 4, y, z + 5);

  addWheel(reboque, 'left', x - 4, y, z + 2);
  addWheel(reboque, 'left', x - 4, y, z + 5);

  scene.add(reboque);
}


var trailerKeyStates = {
  left: false,
  right: false,
  up: false,
  down: false
};

var legRotateKeyStates = {
  up: false,
  down: false
};

var footRotateKeyStates = {
  up: false,
  down: false
};

var armTranslateKeyStates = {
  open: false,
  close: false
};

var headRotateKeyStates = {
  up: false,
  down: false,
}


function onKeyDown(e) {
  'use strict';

  switch (e.keyCode) {
    case 54: // 6
      // for material in the list material, change wireframe
      for (var i = 0; i < materials.length; i++) {
        materials[i].wireframe = !materials[i].wireframe;
      }
      break;
    case 55: // 7
      scene.traverse(function (node) {
        if (node instanceof THREE.AxisHelper) {
          node.visible = !node.visible;
        }
      });
      break;
    case 49: // 1
      camera = cameras[0];
      break;
    case 50: // 2
      camera = cameras[1];
      break;
    case 51: // 3
      camera = cameras[2];
      break;
    case 52: // 4
      camera = cameras[3];
      break;
    case 53: // 5
      camera = cameras[4];
      break;
    case 37: // Seta esquerda
      trailerKeyStates.left = true;
      break;
    case 39: // Seta direita
      trailerKeyStates.right = true;
      break;
    case 38: // Seta cima
      trailerKeyStates.up = true;
      break;
    case 40: // Seta baixo
      trailerKeyStates.down = true;
      break;
    case 87: // W
    case 119: // w
      legRotateKeyStates.up = true;
      break;
    case 83: // S
    case 115: // s
      legRotateKeyStates.down = true;
      break;
    case 81: // Q
    case 113: // q
      footRotateKeyStates.up = true;
      break;
    case 65: // A
    case 97: // a
      footRotateKeyStates.down = true;
      break;
    case 69: // E
    case 101: // e
      armTranslateKeyStates.open = true;
      break;
    case 68: // D
    case 100: // d
      armTranslateKeyStates.close = true;
      break;
    case 82: // R
    case 114: // r
      headRotateKeyStates.up = true;
      break;
    case 70: // F
    case 102: // f
      headRotateKeyStates.down = true;
      break;
  }
}

function onKeyUp(e) {
  'use strict';

  switch (e.keyCode) {
    case 37: // Seta esquerda
      trailerKeyStates.left = false;
      break;
    case 39: // Seta direita
      trailerKeyStates.right = false;
      break;
    case 38: // Seta cima
      trailerKeyStates.up = false;
      break;
    case 40: // Seta baixo
      trailerKeyStates.down = false;
      break;
    case 87: // W
    case 119: // w
      legRotateKeyStates.up = false;
      break;
    case 83: // S
    case 115: // s
      legRotateKeyStates.down = false;
      break;
    case 81: // Q
    case 113: // q
      footRotateKeyStates.up = false;
      break;
    case 65: // A
    case 97: // a
      footRotateKeyStates.down = false;
      break;
    case 69: // E
    case 101: // e
      armTranslateKeyStates.open = false;
      break;
    case 68: // D
    case 100: // d
      armTranslateKeyStates.close = false;
      break;
    case 82: // R
    case 114: // r
      headRotateKeyStates.up = false;
      break;
    case 70: // F
    case 102: // f
      headRotateKeyStates.down = false;
      break;
  }
}

function updateTrailerMovement() {
  'use strict';

  var directionX = 0;
  var directionZ = 0;
  if (trailerKeyStates.left) {
    directionX -= 1;
  }
  if (trailerKeyStates.right) {
    directionX += 1;
  }
  if (trailerKeyStates.up) {
    directionZ -= 1;
  }
  if (trailerKeyStates.down) {
    directionZ += 1;
  }
  trailerDirection.set(directionX, 0, directionZ);
}

function moveTrailer() {
  // Movimentar o reboque
  const reboque = scene.getObjectByName('reboque');
  if (reboque) {
    reboque.translateX(trailerSpeed * trailerDirection.x);
    reboque.translateZ(trailerSpeed * trailerDirection.z);
  }
}

function rotateLegs() {
  // Get the cintura mesh by name from the scene
  const cintura = scene.getObjectByName('cintura');

  // Get the center position of the cintura mesh
  const cinturaCenter = cintura.position.clone();

  // Define the maximum rotation angle (in radians)
  const maxRotationAngle = Math.PI / 2; // 90 degrees in radians

  // Rotate each leg group around the center of the cintura
  for (let i = 0; i < legGroupArray.length; i++) {
    const legGroup = legGroupArray[i];

    // Calculate the vector from the cintura center to the leg group
    const direction = legGroup.position.clone().sub(cinturaCenter);

    // Calculate the desired rotation angle based on key states and leg position
    let rotationAngle = 0;
    const currentRotation = legGroup.rotation.x; // Get the current rotation angle around the X-axis
    
    if (legRotateKeyStates.up) { // 'W' key
      const targetRotation = -maxRotationAngle; // Target rotation angle of -90 degrees 
      if (currentRotation > targetRotation) {
        rotationAngle = -legRotateSpeed; // Rotate towards the target angle
      }
    } else if (legRotateKeyStates.down) { // 'S' key
      const targetRotation = -0.04; // Target rotation angle of 0 degrees (original position)
      if (currentRotation < targetRotation) {
        rotationAngle = legRotateSpeed; // Rotate towards the target angle
      }
    }

    // Rotate the leg group around the cintura center
    const rotationAxis = new THREE.Vector3(1, 0, 0); // X-axis
    const rotationMatrix = new THREE.Matrix4().makeRotationAxis(rotationAxis, rotationAngle);
    direction.applyMatrix4(rotationMatrix);
    legGroup.position.copy(cinturaCenter.clone().add(direction));
    legGroup.rotateOnAxis(rotationAxis, rotationAngle);
  }
}


function rotateFeet() {
  // Define the maximum rotation angle (in radians)
  const maxRotationAngle = Math.PI / 2; // 90 degrees in radians

  for (let i = 0; i < footGroupArray.length; i++) {
    const footGroup = footGroupArray[i];
    
    if (footGroup) {
      let rotationAngle = 0;

      const currentRotation = footGroup.rotation.x; // Get the current rotation angle around the X-axis
      
      if (footRotateKeyStates.up) { // 'W' key
      const targetRotation = -maxRotationAngle; // Target rotation angle of -90 degrees 
      if (currentRotation > targetRotation) {
        rotationAngle = -legRotateSpeed; // Rotate towards the target angle
      }
    } else if (footRotateKeyStates.down) { // 'S' key
      const targetRotation = -0.04; // Target rotation angle of 0 degrees (original position)
      if (currentRotation < targetRotation) {
        rotationAngle = legRotateSpeed; // Rotate towards the target angle
      }
    }

      const rotationAxis = new THREE.Vector3(1, 0, 0); // X-axis (adjust if needed)
      footGroup.rotateOnAxis(rotationAxis, rotationAngle);

      const direction = footGroup.position.clone().sub(new THREE.Vector3(0, 0, -3.74));
      
      const rotationMatrix = new THREE.Matrix4().makeRotationAxis(rotationAxis, rotationAngle);
      direction.applyMatrix4(rotationMatrix);
      
      footGroup.position.copy(new THREE.Vector3(0, 0, -3.74).add(direction)); // Set the position of the foot group to the rotation point
    }
  }
}



function rotateHead() {
  // Define the maximum rotation angle (in radians)
  const maxRotationAngle = Math.PI / 2; // 90 degrees in radians

  // Get the head object by name
  const head = scene.getObjectByName('head');

  if (head) {
    let rotationAngle = 0;

    const currentRotation = head.rotation.x; // Get the current rotation angle around the X-axis
    console.log(currentRotation);

    if (headRotateKeyStates.up) { // 'R' key
      const targetRotation = maxRotationAngle; // Target rotation angle of -90 degrees
      if (currentRotation < targetRotation) {
        rotationAngle = headRotateSpeed; // Rotate towards the target angle
      }
    } else if (headRotateKeyStates.down) { // 'F' key
      const targetRotation = 0; // Target rotation angle of 0 degrees (original position)
      if (currentRotation > targetRotation) {
        rotationAngle = -headRotateSpeed; // Rotate towards the target angle
      }
    }

    const rotationAxis = new THREE.Vector3(1, 0, 0); // X-axis (adjust if needed)
    head.rotateOnAxis(rotationAxis, rotationAngle);

    const rotationPoint = new THREE.Vector3(5, 4.9, 16); // Rotation point coordinates
    const direction = head.position.clone().sub(rotationPoint);

    const rotationMatrix = new THREE.Matrix4().makeRotationAxis(rotationAxis, rotationAngle);
    direction.applyMatrix4(rotationMatrix);

    head.position.copy(rotationPoint.clone().add(direction)); // Set the position of the head to the rotation point
  }
}





function translateArms() {
  // Define the translation speed
  var translationSpeed = 0.1; // Adjust the speed as needed

  // Define the rotation speed for lower arm
  var rotationSpeed = 0.2; // Adjust the speed as needed

  // Define the limit of opening
  var openingLimit = 2; // Adjust the limit as needed

  // Loop through each arm group
  for (var i = 0; i < armGroupArray.length; i++) {
    var armGroup = armGroupArray[i];

    if (armGroup) {
      // Determine the translation direction based on key states
      var translationDirection = 0;
      if (armTranslateKeyStates.open) {
        if (i === 0) {
          // Check the opening limit for the left arm
          if (armGroup.position.x > -openingLimit) {
            translationDirection = -1; // Translate to the left
          }
        } else {
          // Check the opening limit for the right arm
          if (armGroup.position.x < openingLimit) {
            translationDirection = 1; // Translate to the right
          }
        }
      } else if (armTranslateKeyStates.close) {
        // Check if the arm is not already at the original position
        if (armGroup.position.x !== -0.2) {
          if (i === 0) {
            // Check if the arm is not going beyond the original position
            if (armGroup.position.x + translationSpeed > 0) {
              translationDirection = -1; // Translate to the left
            } else {
              translationDirection = 1; // Translate to the right
            }
          } else {
            // Check if the arm is not going beyond the original position
            if (armGroup.position.x - translationSpeed < 0) {
              translationDirection = 1; // Translate to the right
            } else {
              translationDirection = -1; // Translate to the left
            }
          }
        }
      }

      // Translate the arm group by the specified speed and direction
      armGroup.position.x += translationSpeed * translationDirection;

      // Rotate the lower arm
      var lowerArm = armGroup.children[1]; // Assuming lower arm is the second child
      if (i === 0) {
        lowerArm.rotation.y = -rotationSpeed * -armGroup.position.x;
      } else {
        lowerArm.rotation.y = rotationSpeed * armGroup.position.x;
      }
    }
  }
}




function render() {
  'use strict';
  renderer.render(scene, camera);
}

function animate() {
  'use strict';

  updateTrailerMovement();
  moveTrailer();

  rotateLegs();

  rotateFeet();

  translateArms();

  rotateHead();

  render();

  requestAnimationFrame(animate);
}

function onResize() {
  'use strict';

  renderer.setSize(window.innerWidth, window.innerHeight);

  if (window.innerHeight > 0 && window.innerWidth > 0) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
}

function createScene() {
  'use strict';

  scene = new THREE.Scene();
  scene.add(new THREE.AxisHelper(20));

  scene.background = new THREE.Color(0xb3e6ff); // Alterar a cor do fundo
  createRobot(5, 0, 6.5);
  createReboque(5, 0, -11);
}

function createCamera(array) {
  'use strict';

  let cameraTemp = new THREE.PerspectiveCamera(50,
    window.innerWidth / window.innerHeight,
    1,
    1000);
  cameraTemp.position.x = array[0];
  cameraTemp.position.y = array[1];
  cameraTemp.position.z = array[2];
  cameraTemp.lookAt(scene.position);
  return cameraTemp;
}

function createCameras() {
  const cameraPositions = [
    [50, 0, 0], // camera frontal
    [0, 0, 50], // camera lateral
    [0, 50, 0], // camera topo
    [50, 50, 50], // camera global1
    [50, 50, 50], // camera global2
  ];

  for (let i = 0; i < 5; i++) {
    cameras[i] = createCamera(cameraPositions[i]);
  }

  camera = cameras[0]; // Câmera inicial
}

function init() {
  'use strict';
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  createScene();
  createCameras();
  
  render();

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('resize', onResize);
}

