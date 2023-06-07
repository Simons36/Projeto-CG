/*global THREE, requestAnimationFrame, console*/

var cameras = Array(3); //3 cameras

var camera, scene, renderer;

let ovni;

let ovniRotationSpeed = 0.05;
let ovniVelocityX = 0;
let ovniVelocityZ = 0;

let directionalLight;
let fieldMesh;

let skyTexture;
let skyMesh;

function createGeometry(vertices, indices, color) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
  
    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
  
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
  
    const { mesh, wireframe } = createGeometry(vertices, indices, 0x00ff00);
    casa.add(mesh, wireframe);
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
  
    const { mesh, wireframe } = createGeometry(vertices, indices, 0xffff00);
    casa.add(mesh, wireframe);
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
  
    const { mesh, wireframe } = createGeometry(vertices, indices, 0xff0000);
    casa.add(mesh, wireframe);
  }
  
  function createPorta(casa, x, y, z) {
    const vertices = new Float32Array([
      // Frente
      20.5 + x, 0 + y, 3 + z,
      20.5 + x, 0 + y, 6 + z,
      20.5 + x, 6 + y, 3 + z,
      20.5 + x, 6 + y, 6 + z,
      // Trás
      20.1 + x, 0 + y, 3 + z,
      20.1 + x, 0 + y, 6 + z,
      20.1 + x, 6 + y, 3 + z,
      20.1 + x, 6 + y, 6 + z,
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
  
    const { mesh, wireframe } = createGeometry(vertices, indices, 0xffffff);
    casa.add(mesh, wireframe);
  }
  
  function createSideJanela(casa, x, y, z) {
    const vertices = new Float32Array([
      // Frente
      3 + x, 3 + y, 10.5 + z,
      6 + x, 3 + y, 10.5 + z,
      3 + x, 6 + y, 10.5 + z,
      6 + x, 6 + y, 10.5 + z,
      // Trás
      3 + x, 3 + y, 10.1 + z,
      6 + x, 3 + y, 10.1 + z,
      3 + x, 6 + y, 10.1 + z,
      6 + x, 6 + y, 10.1 + z,
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
  
    const { mesh, wireframe } = createGeometry(vertices, indices, 0xffffff);
    casa.add(mesh, wireframe);
  }
  
  function createFrontJanela(casa, x, y, z) {
    const vertices = new Float32Array([
      // Frente
      20.5 + x, 3 + y, -5 + z,
      20.5 + x, 3 + y, -2 + z,
      20.5 + x, 6 + y, -5 + z,
      20.5 + x, 6 + y, -2 + z,
      // Trás
      20.1 + x, 3 + y, -5 + z,
      20.1 + x, 3 + y, -2 + z,
      20.1 + x, 6 + y, -5 + z,
      20.1 + x, 6 + y, -2 + z,
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
  
    const { mesh, wireframe } = createGeometry(vertices, indices, 0xffffff);
    casa.add(mesh, wireframe);
  }
  
  function createSuporte(casa, x, y, z) {
    const vertices = new Float32Array([
      // Frente
      -4 + x, 0 + y, 14 + z,
      -2 + x, 0 + y, 14 + z,
      -4 + x, 6 + y, 11 + z,
      -2 + x, 6 + y, 11 + z,
      // Trás
      -4 + x, 0 + y, 10.3 + z,
      -2 + x, 0 + y, 10.3 + z,
      -4 + x, 6 + y, 10.1 + z,
      -2 + x, 6 + y, 10.1 + z,
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
  
    const { mesh, wireframe } = createGeometry(vertices, indices, 0xffffff);
    casa.add(mesh, wireframe);
  }
  
  function createCasa(x, y, z) {
    const casa = new THREE.Group();
    createEstrutura(casa, x, y, z);
    createTelhado(casa, x, y, z);
    createChamine(casa, x, y, z);
    createPorta(casa, x, y, z);
    createSideJanela(casa, x, y, z);
    createSideJanela(casa, x + 8, y, z);
    createFrontJanela(casa, x, y, z);
    createSuporte(casa, x, y, z);
    scene.add(casa);
  }

  function createSobreiro(x, y, z, scale = 1, direction) {
    const sobreiro = new THREE.Group();
  
    // Main Stem (Oblique Cylinder)
    const mainStemGeometry = new THREE.CylinderGeometry(1 * scale, 0.5 * scale, 10 * scale, 8);
    const mainStemMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const mainStemMesh = new THREE.Mesh(mainStemGeometry, mainStemMaterial);
    mainStemMesh.position.set(x, y + 5 * scale, z);
    mainStemMesh.rotation.x = Math.PI / 6; // Incline the stem
    sobreiro.add(mainStemMesh);
  
    // Branch (Oblique Cylinder)
    const branchGeometry = new THREE.CylinderGeometry(0.4 * scale, 0.4 * scale, 5 * scale, 8);
    const branchMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const branchMesh = new THREE.Mesh(branchGeometry, branchMaterial);
    branchMesh.position.set(x, y + 6 * scale, z - 2 * scale);
    branchMesh.rotation.x = -Math.PI / 4; // Incline the branch
    sobreiro.add(branchMesh);
  
    // Sobreiro Crown (Flattened Ellipsoid)
    const crownRadiusX = 4.5 * scale;
    const crownRadiusY = 2.1 * scale;
    const crownRadiusZ = 4.5 * scale;
    const crownSegments = 16;
    const crownGeometry = new THREE.SphereGeometry(crownRadiusX, crownSegments, crownSegments);
    crownGeometry.scale(1, crownRadiusY / crownRadiusX, crownRadiusZ / crownRadiusX);
    const crownMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
    const crownMesh = new THREE.Mesh(crownGeometry, crownMaterial);
    crownMesh.position.set(x, y + 11 * scale, z + 2 * scale);
    sobreiro.add(crownMesh);
  
    // Branch Crown (Flattened Ellipsoid)
    const branchCrownRadiusX = 2 * scale;
    const branchCrownRadiusY = 1 * scale;
    const branchCrownRadiusZ = 2 * scale;
    const branchCrownSegments = 16;
    const branchCrownGeometry = new THREE.SphereGeometry(branchCrownRadiusX, branchCrownSegments, branchCrownSegments);
    branchCrownGeometry.scale(1, branchCrownRadiusY / branchCrownRadiusX, branchCrownRadiusZ / branchCrownRadiusX);
    const branchCrownMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
    const branchCrownMesh = new THREE.Mesh(branchCrownGeometry, branchCrownMaterial);
    branchCrownMesh.position.set(x, y + 8 * scale, z - 3 * scale);
    sobreiro.add(branchCrownMesh);
  
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
  const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
  baseMesh.position.set(x, y, z);
  ovni.add(baseMesh);

  // Cockpit (Half Sphere)
  const cockpitRadius = baseRadiusX * 0.8;
  const cockpitSegments = 32;
  const cockpitGeometry = new THREE.SphereGeometry(cockpitRadius, cockpitSegments, cockpitSegments, 0, Math.PI * 2, 0, Math.PI / 2);
  const cockpitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const cockpitMesh = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
  cockpitMesh.position.set(x, y + baseRadiusY - 4, z);
  ovni.add(cockpitMesh);

  // Middle Cylinder
  const cylinderRadius = baseRadiusX * 0.3;
  const cylinderHeight = 1;
  const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32);
  const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinderMesh.position.set(x, y - baseRadiusY, z);
  ovni.add(cylinderMesh);

  // Lights (Spheres)
  const lightRadius = baseRadiusX * 0.11;
  const lightSegments = 8;
  const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
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
  }
  scene.add(ovni);
  return ovni;
}

function createLua() {
  const moonRadius = 10;
  const moonSegments = 32;
  const moonGeometry = new THREE.SphereGeometry(moonRadius, moonSegments, moonSegments);

  const moonColor = new THREE.Color('#FFFF99'); // Moon yellow color
  const moonMaterial = new THREE.MeshBasicMaterial({ color: moonColor, emissive: moonColor });

  const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
  moonMesh.position.set(-100, 150, 70);
  scene.add(moonMesh);

  const lightColor = new THREE.Color('#FFFF99'); // Moon yellow color
  const lightIntensity = 0.05;
  const lightAngle = Math.PI / 4; // Angle in radians (45 degrees)
  const lightPosition = new THREE.Vector3(Math.cos(lightAngle), Math.sin(lightAngle), 0);
  directionalLight = new THREE.DirectionalLight(lightColor, lightIntensity);
  directionalLight.position.copy(lightPosition);
  scene.add(directionalLight);

  const ambientLightColor = new THREE.Color('#202020'); // Low-intensity ambient light color
  const ambientLightIntensity = 0.2;
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
  //fieldMaterial = generateInitialFieldMaterial();
  const loader = new THREE.TextureLoader();
  const heightmapTexture = loader.load("../images/heightmap.png");
  
  console.log(heightmapTexture);
         
  heightmapTexture.wrapS = heightmapTexture.wrapT = THREE.RepeatWrapping;
  heightmapTexture.repeat.set(4, 4);
  
  // Create the material with the initial texture and heightmap
  const fieldMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      displacementMap: heightmapTexture,
      displacementScale: 100,
    });

  // Create the field mesh
  const fieldMesh = new THREE.Mesh(fieldGeometry, fieldMaterial);
  scene.add(fieldMesh);


  // Generate the initial sky texture with no stars
  skyTexture = generateInitialSkyTexture();

  // Create the sky material with the initial skyTexture
  const skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });

  // Create the sky geometry
  const skyGeometry = new THREE.SphereGeometry(500, 32, 32); // Adjust the size as needed

  // Create the sky mesh
  skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
  scene.add(skyMesh);



  createCasa(0, 0, 0);

  createRandomSobreiros(100);

  ovni = createOVNI(0, 30, 0);
  createOVNILights();

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



function createOVNILights() {
  // Point lights for small spheres
  const pointLightColor = 0xffff00; // Yellow light color
  const pointLightIntensity = 1; // Adjust the intensity as desired
  
  const pointLight1 = new THREE.PointLight(pointLightColor, pointLightIntensity);
  pointLight1.position.set(10, 0, 0);
  ovni.add(pointLight1);
  
  const pointLight2 = new THREE.PointLight(pointLightColor, pointLightIntensity);
  pointLight2.position.set(-10, 0, 0);
  ovni.add(pointLight2);
  
  const pointLight3 = new THREE.PointLight(pointLightColor, pointLightIntensity);
  pointLight3.position.set(0, 0, 10);
  ovni.add(pointLight3);

  const pointLight4 = new THREE.PointLight(pointLightColor, pointLightIntensity);
  pointLight4.position.set(0, 0, -10);
  ovni.add(pointLight4);
  
  const pointLight5 = new THREE.PointLight(pointLightColor, pointLightIntensity);
  pointLight5.position.set(12, 0, 12);
  ovni.add(pointLight5);
  
  const pointLight6 = new THREE.PointLight(pointLightColor, pointLightIntensity);
  pointLight6.position.set(-12, 0, -12);
  ovni.add(pointLight6);
  
  const pointLight7 = new THREE.PointLight(pointLightColor, pointLightIntensity);
  pointLight7.position.set(0, 12, 0);
  ovni.add(pointLight7);
  
  const pointLight8 = new THREE.PointLight(pointLightColor, pointLightIntensity);
  pointLight8.position.set(0, -12, 0);
  ovni.add(pointLight8);
  
  // Spotlight for the cylinder
  const spotlightColor = 0xffffff; // White light color
  const spotlightIntensity = 1; // Adjust the intensity as desired
  const spotlightAngle = Math.PI / 4; // Adjust the angle as desired
  const spotlightPenumbra = 0.2; // Adjust the penumbra as desired
  
  const spotlight = new THREE.SpotLight(spotlightColor, spotlightIntensity);
  spotlight.position.set(0, -10, 0);
  spotlight.target = ovni; // Point the spotlight at the OVNI
  spotlight.angle = spotlightAngle;
  spotlight.penumbra = spotlightPenumbra;
  ovni.add(spotlight);
}

function togglePointLights() {
  console.log('hello');
  const pointLights = ovni.children.filter(child => child instanceof THREE.PointLight);
  pointLights.forEach(pointLight => {
    pointLight.visible = !pointLight.visible;
  });
}

function toggleSpotlight() {
  console.log('hi');
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