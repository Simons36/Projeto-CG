/*global THREE, requestAnimationFrame, console*/

var cameras = Array(3); //3 cameras

var camera, scene, renderer;

var TelhadoMaterials = {
  diffuse: new THREE.MeshLambertMaterial({ color: 0xD69F20 }),
  phong: new THREE.MeshPhongMaterial({ color: 0xD69F20 }),
  toon: new THREE.MeshToonMaterial({ color: 0xD69F20 }),
};

TelhadoMaterials.diffuse.flatShading = true;
TelhadoMaterials.phong.flatShading = true;
TelhadoMaterials.toon.flatShading = true;

var ChamineMaterials = {
  diffuse: new THREE.MeshLambertMaterial({ color: 0xffffff }),
  phong: new THREE.MeshPhongMaterial({ color: 0xffffff }),
  toon: new THREE.MeshToonMaterial({ color: 0xffffff }),
};

ChamineMaterials.diffuse.flatShading = true;
ChamineMaterials.phong.flatShading = true;
ChamineMaterials.toon.flatShading = true;

var EstruturaMaterials = {
  diffuse: new THREE.MeshLambertMaterial({ color: 0xffffff }),
  phong: new THREE.MeshPhongMaterial({ color: 0xffffff}),
  toon: new THREE.MeshToonMaterial({ color: 0xffffff }),
};

EstruturaMaterials.diffuse.flatShading = true;
EstruturaMaterials.phong.flatShading = true;
EstruturaMaterials.toon.flatShading = true;

var TroncoMaterials = {
  diffuse: new THREE.MeshLambertMaterial({ color: 0x946700 }),
  phong: new THREE.MeshPhongMaterial({ color: 0x946700 }),
  toon: new THREE.MeshToonMaterial({ color: 0x946700 }),
};

TroncoMaterials.diffuse.flatShading = true;
TroncoMaterials.phong.flatShading = true;
TroncoMaterials.toon.flatShading = true;


var FolhasMaterials = {
  diffuse: new THREE.MeshLambertMaterial({ color: 0x00ff00 }),
  phong: new THREE.MeshPhongMaterial({ color: 0x00ff00 }),
  toon: new THREE.MeshToonMaterial({ color: 0x00ff00 }),
};

FolhasMaterials.diffuse.flatShading = true;
FolhasMaterials.phong.flatShading = true;
FolhasMaterials.toon.flatShading = true;

var CockpitMaterials = {
  diffuse: new THREE.MeshLambertMaterial({ color: 0xffffff  }),
  phong: new THREE.MeshPhongMaterial({ color: 0xffffff }),
  toon: new THREE.MeshToonMaterial({ color: 0xffffff  }),
};

CockpitMaterials.diffuse.flatShading = true;
CockpitMaterials.phong.flatShading = true;
CockpitMaterials.toon.flatShading = true;


var OVNIbaseMaterials = {
  diffuse: new THREE.MeshLambertMaterial({ color: 0x000000 }),
  phong: new THREE.MeshPhongMaterial({ color: 0x000000 }),
  toon: new THREE.MeshToonMaterial({ color: 0x000000 }),
};

OVNIbaseMaterials.diffuse.flatShading = true;
OVNIbaseMaterials.phong.flatShading = true;
OVNIbaseMaterials.toon.flatShading = true;

var OVNIluzesMaterials = { 
  diffuse: new THREE.MeshLambertMaterial({ color: 0xffff00 }),
  phong: new THREE.MeshPhongMaterial({ color: 0xffff00 }),
  toon: new THREE.MeshToonMaterial({ color: 0xffff00 }),
};

OVNIluzesMaterials.diffuse.flatShading = true;
OVNIluzesMaterials.phong.flatShading = true;
OVNIluzesMaterials.toon.flatShading = true;


var OVNIciliMaterials = {
  diffuse: new THREE.MeshLambertMaterial({ color: 0x000000 }),
  phong: new THREE.MeshPhongMaterial({ color: 0x000000 }),
  toon: new THREE.MeshToonMaterial({ color: 0x000000 }),
};

OVNIciliMaterials.diffuse.flatShading = true;
OVNIciliMaterials.phong.flatShading = true;
OVNIciliMaterials.toon.flatShading = true;


var LuaMaterials = {
  diffuse: new THREE.MeshLambertMaterial({ color: 0xFFFF99 }),
  phong: new THREE.MeshPhongMaterial({ color: 0xFFFF99 }),
  toon: new THREE.MeshToonMaterial({ color: 0xFFFF99 }),
};

LuaMaterials.diffuse.flatShading = true;
LuaMaterials.phong.flatShading = true;
LuaMaterials.toon.flatShading = true;



var shadingType = 'diffuse'; // Default shading type
var lightingEnabled = true; // Lighting enabled by default

let sceneMaterials = {
  Telhado: TelhadoMaterials,
  Chamine: ChamineMaterials,
  Estrutura: EstruturaMaterials,
  Tronco: TroncoMaterials,
  Folhas: FolhasMaterials,
  OVNIcockpit: CockpitMaterials,
  OVNIbase: OVNIbaseMaterials,
  OVNIluzes: OVNIluzesMaterials,
  OVNIcili: OVNIciliMaterials,
  Lua: LuaMaterials,
};


let ovni;
let casa;

let ovniRotationSpeed = 0.05;
let ovniVelocityX = 0;
let ovniVelocityZ = 0;

let directionalLight;
let fieldMaterial;
let fieldMesh;

let skyTexture;
let skyMesh;

function createGeometry(vertices, indices, material) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);

  const mesh = new THREE.Mesh(geometry, material[shadingType]);

  const edgesGeometry = new THREE.EdgesGeometry(geometry);
  const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
  const wireframe = new THREE.LineSegments(edgesGeometry, edgesMaterial);

  return { mesh, wireframe };
}
  
  function createTelhado(casa, x, y, z) {
    const vertices = new Float32Array([
      // Base da piramide
      -10 + x, 10 + y, 10 + z,
      20 + x, 10 + y, 10 + z,
      20 + x, 10 + y, -10 + z,
      -10 + x, 10 + y, -10 + z,
      // Faces laterais
      5 + x, 15 + y, 0 + z, // Vertice do topo
    ]);
  
    const indices = [
      // Base da piramide
      0, 1, 2, // Triângulo 1
      0, 2, 3, // Triângulo 2
      // Faces laterais
      4, 0, 1, // Triângulo lateral 1
      4, 1, 2, // Triângulo lateral 2
      4, 2, 3, // Triângulo lateral 3
      4, 3, 0, // Triângulo lateral 4
    ];
  
    const { mesh, wireframe } = createGeometry(vertices, indices, sceneMaterials.Telhado);
    casa.add(mesh, wireframe);
    mesh.name = 'Telhado';
  }
  
  function createChamine(casa, x, y, z) {
    const vertices = new Float32Array([
      // Frente
      7.5 + x, 11.1 + y, 8 + z,
      12.5 + x, 11.1 + y, 8 + z,
      7.5 + x, 18 + y, 8 + z,
      12.5 + x, 18 + y, 8 + z,
      // Trás
      7.5 + x, 12.2 + y, 6 + z,
      12.5 + x, 12.2 + y, 6 + z,
      7.5 + x, 18 + y, 6 + z,
      12.5 + x, 18 + y, 6 + z,
    ]);
  
    const indices = [
      // Frente
      0, 1, 2,
      2, 1, 3,
      // Lado direito
      1, 5, 3,
      3, 5, 7,
      // Lado esquerdo
      4, 0, 6,
      6, 0, 2,
      // Topo
      2, 3, 6,
      6, 3, 7,
      // Base
      1, 0, 5,
      5, 0, 4,
      // Trás
      5, 4, 7,
      7, 4, 6,
    ];
  
    const { mesh, wireframe } = createGeometry(vertices, indices, sceneMaterials.Chamine);
    casa.add(mesh, wireframe);
    mesh.name = 'Chamine';
  }
  
  function createEstrutura(casa, x, y, z) {
    const vertices = new Float32Array([
      // Frente
      -10 + x, 0 + y, 10 + z,
      20 + x, 0 + y, 10 + z,
      -10 + x, 10 + y, 10 + z,
      20 + x, 10 + y, 10 + z,
      // Trás
      -10 + x, 0 + y, -10 + z,
      20 + x, 0 + y, -10 + z,
      -10 + x, 10 + y, -10 + z,
      20 + x, 10 + y, -10 + z,
    ]);
  
    const indices = [
      // Frente
      0, 1, 2,
      2, 1, 3,
      // Lado direito
      1, 5, 3,
      3, 5, 7,
      // Lado esquerdo
      4, 0, 6,
      6, 0, 2,
      // Topo
      2, 3, 6,
      6, 3, 7,
      // Base
      1, 0, 5,
      5, 0, 4,
      // Trás
      5, 4, 7,
      7, 4, 6,
    ];
  
    const { mesh, wireframe } = createGeometry(vertices, indices, sceneMaterials.Estrutura);
    casa.add(mesh, wireframe);
    mesh.name = 'Estrutura';
  }
  
  
  function createCasa(x, y, z) {
    const casa = new THREE.Group();
    createEstrutura(casa, x, y, z);
    createTelhado(casa, x, y, z);
    createChamine(casa, x, y, z);
    scene.add(casa);
    return casa;
  }

  function createSobreiro(x, y, z, scale = 1, direction) {
    const sobreiro = new THREE.Group();
  
    // Main Stem (Oblique Cylinder)
    const mainStemGeometry = new THREE.CylinderGeometry(1 * scale, 0.5 * scale, 10 * scale, 8);
    const mainStemMaterial = sceneMaterials.Tronco[shadingType] //Laranja Acastanhado
    const mainStemMesh = new THREE.Mesh(mainStemGeometry, mainStemMaterial);
    mainStemMesh.position.set(x, y + 5 * scale, z);
    mainStemMesh.rotation.x = Math.PI / 6; // Incline the stem
    sobreiro.add(mainStemMesh);
    mainStemMesh.name = 'Tronco';
  
    // Branch (Oblique Cylinder)
    const branchGeometry = new THREE.CylinderGeometry(0.4 * scale, 0.4 * scale, 5 * scale, 8);
    const branchMaterial = sceneMaterials.Tronco[shadingType]; //Laranja Acastanhado
    const branchMesh = new THREE.Mesh(branchGeometry, branchMaterial);
    branchMesh.position.set(x, y + 6 * scale, z - 2 * scale);
    branchMesh.rotation.x = -Math.PI / 4; // Incline the branch
    sobreiro.add(branchMesh);
    branchMesh.name = 'Ramo';

  
    // Sobreiro Crown (Flattened Ellipsoid)
    const crownRadiusX = 4.5 * scale;
    const crownRadiusY = 2.1 * scale;
    const crownRadiusZ = 4.5 * scale;
    const crownSegments = 16;
    const crownGeometry = new THREE.SphereGeometry(crownRadiusX, crownSegments, crownSegments);
    crownGeometry.scale(1, crownRadiusY / crownRadiusX, crownRadiusZ / crownRadiusX);
    const crownMaterial = sceneMaterials.Folhas[shadingType]; //Verde Escuro
    const crownMesh = new THREE.Mesh(crownGeometry, crownMaterial);
    crownMesh.position.set(x, y + 11 * scale, z + 2 * scale);
    sobreiro.add(crownMesh);
    crownMesh.name = 'Coroa';
  
    // Branch Crown (Flattened Ellipsoid)
    const branchCrownRadiusX = 2 * scale;
    const branchCrownRadiusY = 1 * scale;
    const branchCrownRadiusZ = 2 * scale;
    const branchCrownSegments = 16;
    const branchCrownGeometry = new THREE.SphereGeometry(branchCrownRadiusX, branchCrownSegments, branchCrownSegments);
    branchCrownGeometry.scale(1, branchCrownRadiusY / branchCrownRadiusX, branchCrownRadiusZ / branchCrownRadiusX);
    const branchCrownMaterial = sceneMaterials.Folhas[shadingType]; //Verde Escuro
    const branchCrownMesh = new THREE.Mesh(branchCrownGeometry, branchCrownMaterial);
    branchCrownMesh.position.set(x, y + 8 * scale, z - 3 * scale);
    sobreiro.add(branchCrownMesh);
    branchCrownMesh.name = 'Coroa Ramo';
  
    // Set facing direction
    const target = new THREE.Vector3().addVectors(sobreiro.position, direction);
    sobreiro.lookAt(target);
  
  scene.add(sobreiro);
}

function createRandomSobreiros(count) {
  const range = 360;
  const directions = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1)
  ];

  const excludedRange = 40; // Range of the middle square to exclude

  for (let i = 0; i < count; i++) {
    let x, z;

    // Generate random positions until they are outside the excluded range
    do {
      x = Math.random() * range - range / 2; // Random x position within the range
      z = Math.random() * range - range / 2; // Random z position within the range
    } while (Math.abs(x) < excludedRange / 2 && Math.abs(z) < excludedRange / 2);

    const direction = directions[Math.floor(Math.random() * directions.length)];

    const scale = Math.random() * 0.5 + 1; // Random scale within a range (1 to 1.5)

    createSobreiro(x, 0, z, scale, direction);
  }
}



function createOVNI(x, y, z) {
  const ovni = new THREE.Group();

  // Base (Flattened Sphere)
  const baseRadiusX = 10;
  const baseRadiusY = 4;
  const baseRadiusZ = 10;
  const baseSegments = 16;
  const baseGeometry = new THREE.SphereGeometry(baseRadiusX, baseSegments, baseSegments);
  baseGeometry.scale(1, baseRadiusY / baseRadiusX, baseRadiusZ / baseRadiusX);
  const baseMaterial = sceneMaterials.OVNIbase[shadingType];
  const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
  baseMesh.position.set(x, y, z);
  ovni.add(baseMesh);
  baseMesh.name = 'Base';

  // Cockpit (Half Sphere)
  const cockpitRadius = baseRadiusX * 0.8;
  const cockpitSegments = 32;
  const cockpitGeometry = new THREE.SphereGeometry(cockpitRadius, cockpitSegments, cockpitSegments, 0, Math.PI * 2, 0, Math.PI / 2);
  const cockpitMaterial = sceneMaterials.OVNIcockpit[shadingType];
  const cockpitMesh = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
  cockpitMesh.position.set(x, y + baseRadiusY - 4, z);
  ovni.add(cockpitMesh);
  cockpitMesh.name = 'Cockpit';

  // Middle Cylinder
  const cylinderRadius = baseRadiusX * 0.3;
  const cylinderHeight = 1;
  const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32);
  const cylinderMaterial = sceneMaterials.OVNIcili[shadingType];
  const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinderMesh.position.set(x, y - baseRadiusY, z);
  ovni.add(cylinderMesh);
  cylinderMesh.name = 'Cilindro';

  // Lights (Spheres)
  const lightRadius = baseRadiusX * 0.11;
  const lightSegments = 8;
  const lightMaterial = sceneMaterials.OVNIluzes[shadingType];
  const lightPositions = [
    new THREE.Vector3(x + baseRadiusX * 0.6, y - baseRadiusY + 2, z + baseRadiusZ * 0.6),
    new THREE.Vector3(x - baseRadiusX * 0.6, y - baseRadiusY + 2 , z + baseRadiusZ * 0.6),
    new THREE.Vector3(x + baseRadiusX * 0.6, y - baseRadiusY + 2, z - baseRadiusZ * 0.6),
    new THREE.Vector3(x - baseRadiusX * 0.6, y - baseRadiusY + 2, z - baseRadiusZ * 0.6),
    new THREE.Vector3(x + baseRadiusX * 0.6 + 2, y - baseRadiusY + 2, z ),
    new THREE.Vector3(x - baseRadiusX * 0.6 - 2, y - baseRadiusY + 2, z),
    new THREE.Vector3(x, y - baseRadiusY + 2, z + baseRadiusZ * 0.6 + 2),
    new THREE.Vector3(x, y - baseRadiusY + 2, z - baseRadiusZ * 0.6 - 2),
  ];
  for (const position of lightPositions) {
    const lightGeometry = new THREE.SphereGeometry(lightRadius, lightSegments, lightSegments);
    const lightMesh = new THREE.Mesh(lightGeometry, lightMaterial);
    lightMesh.position.copy(position);
    ovni.add(lightMesh);
    0xF7F446
    const pointLightColor = 0xF7F446; // Lamp Yellow color
    const pointLightIntensity = 0.05; // Adjust the intensity as needed
    const pointLightDistance = 0; // No distance attenuation
    const pointLight = new THREE.PointLight(pointLightColor, pointLightIntensity, pointLightDistance);
    pointLight.position.copy(position);
    pointLight.visible = true;
    ovni.add(pointLight);
  }

  const spotlight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 4, 0.2);
  spotlight.position.set(x, y - baseRadiusY, z);
  spotlight.target = ovni;
  spotlight.visible = false;
  ovni.add(spotlight);

  scene.add(ovni);
  return ovni;
}




function createLua() {
  const moonRadius = 10;
  const moonSegments = 32;
  const moonGeometry = new THREE.SphereGeometry(moonRadius, moonSegments, moonSegments);

  const moonMaterial = sceneMaterials.Lua[shadingType];

  const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
  moonMesh.position.set(-100, 150, 70);
  scene.add(moonMesh);
  moonMesh.name = 'Lua';

  const lightColor = new THREE.Color('#FFFF99'); // Moon yellow color
  const lightIntensity = 0.1; // Adjust the intensity as needed
  const lightAngle = Math.PI / 4; // Angle in radians (45 degrees)
  const lightPosition = new THREE.Vector3(Math.cos(lightAngle), Math.sin(lightAngle), 0);
  directionalLight = new THREE.DirectionalLight(lightColor, lightIntensity);
  directionalLight.position.copy(lightPosition);
  directionalLight.visible = true; // Set to true to make the light visible
  scene.add(directionalLight);

  const ambientLightColor = new THREE.Color('#000000'); // Low-intensity ambient light color
  const ambientLightIntensity = 1;
  const ambientLight = new THREE.AmbientLight(ambientLightColor, ambientLightIntensity);
  scene.add(ambientLight);

}


  
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
  fieldMesh.position.y = -2;


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
      case 65: //A
      case 97: //a
          scene.traverse(function (node) {
              if (node instanceof THREE.Mesh) {
                  node.material.wireframe = !node.material.wireframe;
                }
          });
          break;
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
            break;
          case 'Chamine':
            object.material = sceneMaterials.Chamine[shadingType];
            break;
          case 'Estrutura':
            object.material = sceneMaterials.Estrutura[shadingType];
            break;
          case 'Tronco':
            object.material = sceneMaterials.Tronco[shadingType];
            break;
          case 'Folhas':
            object.material = sceneMaterials.Folhas[shadingType];
            break;
          case 'Cockpit':
            object.material = sceneMaterials.OVNIcockpit[shadingType];
            break;
          case 'OVNIbase':
            object.material = sceneMaterials.OVNIbase[shadingType];
            break;
          case 'OVNIluzes':
            object.material = sceneMaterials.OVNIluzes[shadingType];
            break;
          case 'OVNIcili':
            object.material = sceneMaterials.OVNIcili[shadingType];
            break;
          case 'Lua':
            object.material = sceneMaterials.Lua[shadingType];
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
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  createScene();
  createCameras();
  
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener("resize", onResize);
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
    
    cameras[0] = createOrthographicCamera(210, 0, 210);
    cameras[1] = createOrthographicCamera(0, 200, 200);
    cameras[2] = createPerspCamera(cameraPositions[2]);

    camera = cameras[2]; //camera inicial
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