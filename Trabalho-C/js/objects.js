var shadingType = 'diffuse'; // Default shading type
var lightingEnabled = true; // Lighting enabled by default

// Define the materials and set flatShading
var materials = {
  Telhado: {
    diffuse: new THREE.MeshLambertMaterial({ color: 0xD69F20 }),
    phong: new THREE.MeshPhongMaterial({ color: 0xD69F20 }),
    toon: new THREE.MeshToonMaterial({ color: 0xD69F20 }),
  },
  Chamine: {
    diffuse: new THREE.MeshLambertMaterial({ color: 0xffffff }),
    phong: new THREE.MeshPhongMaterial({ color: 0xffffff }),
    toon: new THREE.MeshToonMaterial({ color: 0xffffff }),
  },
  Estrutura: {
    diffuse: new THREE.MeshLambertMaterial({ color: 0xffffff }),
    phong: new THREE.MeshPhongMaterial({ color: 0xffffff}),
    toon: new THREE.MeshToonMaterial({ color: 0xffffff }),
  },
  Tronco: {
    diffuse: new THREE.MeshLambertMaterial({ color: 0x946700 }),
    phong: new THREE.MeshPhongMaterial({ color: 0x946700 }),
    toon: new THREE.MeshToonMaterial({ color: 0x946700 }),
  },
  Folhas: {
    diffuse: new THREE.MeshLambertMaterial({ color: 0x00ff00 }),
    phong: new THREE.MeshPhongMaterial({ color: 0x00ff00 }),
    toon: new THREE.MeshToonMaterial({ color: 0x00ff00 }),
  },
  OVNIcockpit: {
    diffuse: new THREE.MeshLambertMaterial({ color: 0xffffff  }),
    phong: new THREE.MeshPhongMaterial({ color: 0xffffff }),
    toon: new THREE.MeshToonMaterial({ color: 0xffffff  }),
  },
  OVNIbase: {
    diffuse: new THREE.MeshLambertMaterial({ color: 0x000000 }),
    phong: new THREE.MeshPhongMaterial({ color: 0x000000 }),
    toon: new THREE.MeshToonMaterial({ color: 0x000000 }),
  },
  OVNIluzes: {
    diffuse: new THREE.MeshLambertMaterial({ color: 0xffff00 }),
    phong: new THREE.MeshPhongMaterial({ color: 0xffff00 }),
    toon: new THREE.MeshToonMaterial({ color: 0xffff00 }),
  },
  OVNIcili: {
    diffuse: new THREE.MeshLambertMaterial({ color: 0x000000 }),
    phong: new THREE.MeshPhongMaterial({ color: 0x000000 }),
    toon: new THREE.MeshToonMaterial({ color: 0x000000 }),
  },
  Lua: {
    diffuse: new THREE.MeshLambertMaterial({ color: 0xFFFF99 }),
    phong: new THREE.MeshPhongMaterial({ color: 0xFFFF99 }),
    toon: new THREE.MeshToonMaterial({ color: 0xFFFF99 }),
  },
};

// Iterate over the materials and set flatShading
for (var materialKey in materials) {
  var material = materials[materialKey];
  for (var type in material) {
    material[type].flatShading = lightingEnabled;
  }
}

// Assign the updated materials object to sceneMaterials
var sceneMaterials = materials;

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

function createPorta(casa, x, y, z) {
    const vertices = new Float32Array([
        20.1 + x, 0 + y, 3 + z,
        20.1 + x, 6 + y, 3 + z,
        20.1 + x, 0 + y, 6 + z,
        20.1 + x, 6 + y, 6 + z,
    ]);

    const indices = [
        0, 1, 2,
        2, 1, 3,
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(indices);

    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const mesh = new THREE.Mesh(geometry, material);
    casa.add(mesh);
}

function createFrontJanela(casa, x, y, z) {
    const vertices = new Float32Array([
    20.1 + x, 3 + y, -5 + z,
    20.1 + x, 6 + y, -5 + z,
    20.1 + x, 3 + y, -2 + z,
    20.1 + x, 6 + y, -2 + z,
    ]);

    const indices = [
    0, 1, 2,
    2, 1, 3,
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(indices);

    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const mesh = new THREE.Mesh(geometry, material);
    casa.add(mesh);
}

function createSideJanela(casa, x, y, z) {
    const vertices = new Float32Array([
        3 + x, 3 + y, 10.1 + z,
        6 + x, 3 + y, 10.1 + z,
        3 + x, 6 + y, 10.1 + z,
        6 + x, 6 + y, 10.1 + z,
    ]);

    const indices = [
        0, 1, 2,
        2, 1, 3,
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(indices);

    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const mesh = new THREE.Mesh(geometry, material);
    casa.add(mesh);
}
  
  
function createCasa(x, y, z) {
    const casa = new THREE.Group();
    createEstrutura(casa, x, y, z);
    createTelhado(casa, x, y, z);
    createChamine(casa, x, y, z);
    createPorta(casa, x, y, z);
    createFrontJanela(casa, x, y, z);
    createSideJanela(casa, x, y, z);
    createSideJanela(casa, x+8, y, z);
    createSideJanela(casa, x-8, y, z);
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

    createSobreiro(x, -2, z, scale, direction);
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
    const pointLightColor = 0xF7F446; // Lamp Yellow color
    const pointLightIntensity = 0.05; // Adjust the intensity as needed
    const pointLightDistance = 0; // No distance attenuation
    const pointLight = new THREE.PointLight(pointLightColor, pointLightIntensity, pointLightDistance);
    position.y -= 10;
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
  const lightIntensity = 0.2; // Adjust the intensity as needed
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