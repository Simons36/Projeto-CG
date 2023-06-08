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
  
    const { mesh, wireframe } = createGeometry(vertices, indices, sceneMaterials.Porta);
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
  
    const { mesh, wireframe } = createGeometry(vertices, indices, sceneMaterials.Janela);
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