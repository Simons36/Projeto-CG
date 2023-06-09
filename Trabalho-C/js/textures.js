//textures.js

function generateInitialFieldMaterial() {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
  
    // Fill the entire canvas with the field color
    context.fillStyle = '#7CE77E'; // Light green
    context.fillRect(0, 0, size, size);
  
    // Create the initial texture with the canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  
    // Load the heightmap texture
    const heightmapTexture = new THREE.TextureLoader()
        .load('images/heightmap.png');
         
    heightmapTexture.wrapS = heightmapTexture.wrapT = THREE.RepeatWrapping;
    heightmapTexture.repeat.set(4, 1);
  
    // Create the material with the initial texture and heightmap
    const fieldMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      displacementMap: heightmapTexture,
      displacementScale: 23,
    });
  
    // Return the material instead of the texture
    return fieldMaterial;
}
  

  

function updateFieldTexture(texture) {
    const canvas = texture.image;
  
    const colors = ['#FFFFFF', '#FFFF00', '#D4B5FF', '#00AEEF']; // White, Yellow, Lilac, Light Blue
    const radius = 2;
  
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const color = colors[Math.floor(Math.random() * colors.length)];
  
      const context = canvas.getContext('2d');
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fillStyle = color;
      context.fill();
      context.closePath();
    }
  
    // Set needsUpdate to true to update the texture
    texture.needsUpdate = true;
}
  


function generateInitialSkyTexture() {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');

    // Create the sky gradient
    const gradient = context.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(0.5, '#151560'); // Dark blue
    gradient.addColorStop(1, '#532F7C'); // Dark Violet

    // Fill the canvas with the gradient
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    // Create the initial sky texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    return texture;
}




function updateSkyTexture(texture) {
    const size = 512;
    const canvas = texture.image;
    const context = canvas.getContext('2d');

    // Draw additional stars
    const starCount = 200; // Adjust the number of stars to add per update
    const starRadius = 0.3; // Adjust the radius of the stars

    for (let i = 0; i < starCount; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;

        context.beginPath();
        context.arc(x, y, starRadius, 0, 2 * Math.PI);
        context.fillStyle = '#FFFFFF'; // White
        context.fill();
        context.closePath();
    }

    // Update the texture with the modified canvas
    texture.needsUpdate = true;
}

