/*global THREE, requestAnimationFrame, console*/

var cameras = Array(5); // 5 câmeras
var camera, scene, renderer;

var trailerSpeed = 0.1; // Velocidade de movimento do reboque
var trailerDirection = new THREE.Vector3(); // Direção do movimento do reboque


function createGeometry(width, height, depth) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const edges = new THREE.EdgesGeometry(geometry);
  return [geometry, edges];
}

function createMaterial(color) {
  return new THREE.MeshBasicMaterial({ color });
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
  createOutline(cintura, edges, 0x6B6362);
}

function addHead(obj, x, y, z) {
  const [geometry, edges] = createGeometry(2, 2, 2);
  const material = createMaterial(0x0000ff);
  const head = createMesh(obj, geometry, material, x, y + 5, z + 7);

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
  const mesh = createMesh(obj, geometry, material, x, y + 4.5, z + 7);
  if (side === 'left') {
    mesh.position.x -= 2.5;
  } else if (side === 'right') {
    mesh.position.x += 2.5;
  }
  createOutline(mesh, edges, 0xffffff);
}

function addLowerArm(obj, side, x, y, z) {
  const [geometry, edges] = createGeometry(2, 2, 6);
  const material = createMaterial(0xff0000);
  const mesh = createMesh(obj, geometry, material, x, y + 2, z + 9);
  if (side === 'left') {
    mesh.position.x -= 2.5;
  } else if (side === 'right') {
    mesh.position.x += 2.5;
  }
  createOutline(mesh, edges, 0xffffff);
}

function addLeg(obj, side, x, y, z) {
  const [geometry, edges] = createGeometry(2.5, 2.5, 10);
  const material = createMaterial(0x0000ff);
  const mesh = createMesh(obj, geometry, material, x, y, z + 1);
  if (side === 'left') {
    mesh.position.x -= 2;
  } else if (side === 'right') {
    mesh.position.x += 2;
  }
  createOutline(mesh, edges, 0xffffff);
}

function addCoxa(obj, side, x, y, z) {
  const [geometry, edges] = createGeometry(1.5, 1.5, 2);
  const material = createMaterial(0xffffff);
  const mesh = createMesh(obj, geometry, material, x, y, z + 7);
  if (side === 'left') {
    mesh.position.x -= 2;
  } else if (side === 'right') {
    mesh.position.x += 2;
  }
  createOutline(mesh, edges, 0x6B6362);
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

function addFeet(obj, side, x, y, z) {
  const [geometry, edges] = createGeometry(2.5, 2.5, 2);
  const material = createMaterial(0x0000ff);
  const mesh = createMesh(obj, geometry, material, x, y, z - 5);
  if (side === 'left') {
    mesh.position.x -= 2;
  } else if (side === 'right') {
    mesh.position.x += 2;
  }
  createOutline(mesh, edges, 0xffffff);
}

function addEscape(obj, side, x, y, z) {
  const geometry = new THREE.CylinderGeometry(0.3, 0.3, 4, 32);
  const material = createMaterial(0x000000);
  const mesh = createMesh(obj, geometry, material, x, y + 5, z + 5.5);
  if (side === 'left') {
    mesh.position.x -= 2.5;
  } else if (side === 'right') {
    mesh.position.x += 2.5;
  }
}

function createRobot(x, y, z) {
  const robot = new THREE.Object3D();

  addTronco(robot, x, y, z);
  addAbdomen(robot, x, y, z);
  addCintura(robot, x, y, z);
  addArm(robot, 'left', x, y, z);
  addArm(robot, 'right', x, y, z);
  addLowerArm(robot, 'left', x, y, z);
  addLowerArm(robot, 'right', x, y, z);
  addHead(robot, x, y, z);

  addCoxa(robot, 'left', x, y, z);
  addCoxa(robot, 'right', x, y, z);

  addLeg(robot, 'left', x, y, z);
  addLeg(robot, 'right', x, y, z);

  addWheel(robot, 'right', x + 4, y, z + 8);
  addWheel(robot, 'right', x + 4, y, z - 3);
  addWheel(robot, 'right', x + 4, y, z);

  addWheel(robot, 'left', x - 4, y, z + 8);
  addWheel(robot, 'left', x - 4, y, z - 3);
  addWheel(robot, 'left', x - 4, y, z);

  addFeet(robot, 'left', x, y, z);
  addFeet(robot, 'right', x, y, z);

  addEscape(robot, 'left', x, y, z);
  addEscape(robot, 'right', x, y, z);

  scene.add(robot);
}

function addContentor(reboque, x, y, z) {
  const [geometry, edges] = createGeometry(6, 7, 20);
  const material = createMaterial(0xC8C5C5);
  const contentor = createMesh(reboque, geometry, material, x, y + 4.8, z + 10);
  createOutline(contentor, edges, 0xffffff);
}

function addLigacao(reboque, x, y, z) {
  const [geometry, edges] = createGeometry(6.5, 2.5, 10);
  const material = createMaterial(0x0000ff);
  const mesh = createMesh(reboque, geometry, material, x, y, z + 5);
  createOutline(mesh, edges, 0xffffff);
}

function createReboque(x, y, z) {
  const reboque = new THREE.Object3D();
  reboque.name = 'reboque';
  addContentor(reboque, x, y, z);
  addLigacao(reboque, x, y, z);

  addWheel(reboque, 'right', x + 4, y, z + 2);
  addWheel(reboque, 'right', x + 4, y, z + 5);

  addWheel(reboque, 'left', x - 4, y, z + 2);
  addWheel(reboque, 'left', x - 4, y, z + 5);

  scene.add(reboque);
}


function onKeyDown(e) {
  'use strict';

  switch (e.keyCode) {
    case 65: // A
    case 97: // a
      scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
          node.material.wireframe = !node.material.wireframe;
        }
      });
      break;
    case 69: // E
    case 101: // e
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
      trailerDirection.set(-1, 0, 0);
      break;
    case 39: // Seta direita
      trailerDirection.set(1, 0, 0);
      break;
    case 38: // Seta cima
      trailerDirection.set(0, 0, -1);
      break;
    case 40: // Seta baixo
      trailerDirection.set(0, 0, 1);
      break;
  }
}

function onKeyUp(e) {
  'use strict';

  switch (e.keyCode) {
    case 37: // Seta esquerda
    case 39: // Seta direita
    case 38: // Seta cima
    case 40: // Seta baixo
      trailerDirection.set(0, 0, 0); // Redefine a direção do movimento para zero
      break;
  }
}

function moveTrailer() {
  // Movimentar o reboque
  const reboque = scene.getObjectByName('reboque');
  if (reboque) {
    reboque.translateX(trailerSpeed * trailerDirection.x);
    reboque.translateZ(trailerSpeed * trailerDirection.z);
  }
}

function render() {
  'use strict';
  renderer.render(scene, camera);
}

function animate() {
  'use strict';

  moveTrailer();
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
  createReboque(5, 0, -12);
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

