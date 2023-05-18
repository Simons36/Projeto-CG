/*global THREE, requestAnimationFrame, console*/

var cameras = Array(5); //5 cameras

var camera, scene, renderer;

var geometry, material, mesh;

function addTronco(obj, x, y, z) {
    'use strict';
  
    const geometry = new THREE.BoxGeometry(7, 3, 4);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const tronco = new THREE.Mesh(geometry, material);
    tronco.position.set(x, y+4.5, z+10);
    obj.add(tronco);

    const edges = new THREE.EdgesGeometry(geometry);
    const outlineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const outline = new THREE.LineSegments(edges, outlineMaterial);

    tronco.add(outline);

  }

function addAbdomen(obj, x, y, z) {
  'use strict';

  const geometry = new THREE.BoxGeometry(3, 2, 4);
  const material = new THREE.MeshBasicMaterial({ color: 0xD9D9D9 });
  const abdomen = new THREE.Mesh(geometry, material);
  abdomen.position.set(x, y+2, z+10);
  obj.add(abdomen);

  const edges = new THREE.EdgesGeometry(geometry);
  const outlineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const outline = new THREE.LineSegments(edges, outlineMaterial);

  abdomen.add(outline);
}

function addCintura(obj, x, y, z) {
  'use strict';

  const geometry = new THREE.BoxGeometry(7, 2, 4);
  const material = new THREE.MeshBasicMaterial({ color: 0xD9D9D9 });
  const cintura = new THREE.Mesh(geometry, material);
  cintura.position.set(x, y, z+10);
  obj.add(cintura);

  const edges = new THREE.EdgesGeometry(geometry);
  const outlineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const outline = new THREE.LineSegments(edges, outlineMaterial);

  cintura.add(outline);

}
  
function addHead(obj, x, y, z) {
  'use strict';

  // Head
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const head = new THREE.Mesh(geometry, material);
  head.position.set(x, y+5, z+7);
  obj.add(head);
  
  // Eyes
  const eyeGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.2);
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff});
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(x - 5.5, y+1, z - 5.5);
  rightEye.position.set(x - 4.5, y+1, z - 5.5);
  head.add(leftEye);
  head.add(rightEye);

  
  // Antennas
  const antennaGeometry = new THREE.BoxGeometry(0.2, 0.2, 1.4);
  const antennaMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff});
  const leftAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
  const rightAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
  leftAntenna.position.set(x - 6, y + 1, z - 6);
  rightAntenna.position.set(x - 4, y + 1, z - 6);
  head.add(leftAntenna);
  head.add(rightAntenna);
  
  obj.add(head);
  
}
  
  function addUpperArm(obj, side, x, y, z) {
    'use strict';
  
    const geometry = new THREE.BoxGeometry(2, 3, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y +4.5, z+7);
    if (side === 'left') {
      mesh.position.x -= 2.5;
    } else if (side === 'right') {
      mesh.position.x += 2.5;
    }
    obj.add(mesh);

    const edges = new THREE.EdgesGeometry(geometry);
    const outlineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const outline = new THREE.LineSegments(edges, outlineMaterial);

    mesh.add(outline);

  }

  function addLowerArm(obj, side, x, y, z) {
    'use strict';

    const geometry = new THREE.BoxGeometry(2, 2, 6);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+2, z+9);
    if (side === 'left') {
      mesh.position.x -= 2.5;
    } else if (side === 'right') {
      mesh.position.x += 2.5;
    }
    obj.add(mesh);

    const edges = new THREE.EdgesGeometry(geometry);
    const outlineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const outline = new THREE.LineSegments(edges, outlineMaterial);

    mesh.add(outline);
  }
  
  
  function addLeg(obj, side, x, y, z) {
    'use strict';
  
    const geometry = new THREE.BoxGeometry(2.5, 2.5, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z+1);
    if (side === 'left') {
      mesh.position.x -= 2;
    } else if (side === 'right') {
      mesh.position.x += 2;
    }
    obj.add(mesh);

    const edges = new THREE.EdgesGeometry(geometry);
    const outlineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const outline = new THREE.LineSegments(edges, outlineMaterial);

    mesh.add(outline);
  }


  function addCoxa(obj, side, x, y, z){
    'use strict';

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xD9D9D9 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z+7);
    if (side === 'left') {
      mesh.position.x -= 2;
    } else if (side === 'right') {
      mesh.position.x += 2;
    }
    obj.add(mesh);

    const edges = new THREE.EdgesGeometry(geometry);
    const outlineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const outline = new THREE.LineSegments(edges, outlineMaterial);

    mesh.add(outline);
  }

  function addWheel(obj, side, x, y, z) {
    'use strict';
  
    // pneu
    const pneuGeometry = new THREE.CylinderGeometry(1.5, 1.5, 1, 32);
    const pneuMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const pneu = new THREE.Mesh(pneuGeometry, pneuMaterial);
    pneu.position.set(x, y, z);
    pneu.rotation.x = Math.PI / 2;
    pneu.rotation.z = Math.PI / 2;

    obj.add(pneu);
  
    // calota
    const calotaGeometry = new THREE.CircleGeometry(1, 32);
    const calotaMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const calota = new THREE.Mesh(calotaGeometry, calotaMaterial);
    calota.rotation.y = Math.PI / 2;
    if(side === 'left'){
      calota.position.set(x-0.6, y, z);
    }
    if (side === 'right'){
      calota.position.set(x+0.6, y, z);
    }

    obj.add(calota);
  }calota.position.set(x+0.6, y, z);

  
  function createRobot(x, y, z) {
    'use strict';
  
    const robot = new THREE.Object3D();

  
    addTronco(robot, x, y, z);
    addAbdomen(robot, x, y, z);
    addCintura(robot, x, y, z);
    addUpperArm(robot, 'left', x, y, z);
    addUpperArm(robot, 'right', x, y, z);
    addLowerArm(robot, 'left', x, y, z);
    addLowerArm(robot, 'right', x, y, z);
    addHead(robot, x, y, z);

    addCoxa(robot, 'left', x, y, z);
    addCoxa(robot, 'right', x, y, z);

    addLeg(robot, 'left', x, y, z);
    addLeg(robot, 'right', x, y, z);

    addWheel(robot, 'right', x+4, y, z+8);
    addWheel(robot, 'right', x+4, y, z-3);
    addWheel(robot, 'right', x+4, y, z);

    addWheel(robot, 'left', x-4, y, z+8);
    addWheel(robot, 'left', x-4, y, z-3);
    addWheel(robot, 'left', x-4, y, z);
  
    scene.add(robot);
  }
  
  
  
// Call the createRobot function to create the robot
function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(20));

    scene.background = new THREE.Color(0xb3e6ff); //change background color
    createRobot(5, 0, 5);
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
  



function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    console.log("Resized");

}



function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    case 69:  //E
    case 101: //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    case 49: //1
        camera = cameras[0];
        console.log(typeof cameras[0]);
        break;
    case 50: //2
        camera = cameras[1];
        break;
    case 51: //3
        camera = cameras[2];
        break;
    case 52: //4
        camera = cameras[3];
        break;
    case 53: //5
        camera = cameras[4];
        break;
    }


}

function render() {
    'use strict';
    renderer.render(scene, camera);
}



function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCameras();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}


function animate() {
    'use strict';

    render();

    requestAnimationFrame(animate);
}


function createCameras() {
    const cameraPositions = [
      [50, 0, 0],   // camera frontal
      [0, 0, 50],   // camera lateral
      [0, 50, 0],   // camera topo
      [50, 50, 50], // camera global1
      [50, 50, 50]  // camera global2
    ];
  
    for (let i = 0; i < 5; i++) {
      cameras[i] = createCamera(cameraPositions[i]);
    }
  
    camera = cameras[0]; // initial camera
  }