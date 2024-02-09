function main() 
{
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true});

    window.addEventListener("click", onclick, true);

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;

    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.listenToKeyEvents( window ); // optional

    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x333333 );

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    // NOT A GOOD EXAMPLE OF HOW TO MAKE A CUBE!
    // Only trying to make it clear most vertices are unique
    const vertices = [
        // front
        // { pos: [-1, -1,  2], norm: [ 0,  0,  1], uv: [0, 0], }, // 0
        // { pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 0], }, // 1
        // { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], }, // 2
        // { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [1, 1], }, // 3
        { pos: [ -1,  -1,  1], norm: [ 0,  0,  1], uv: [0, 0], }, // 0
        { pos: [ -0.5,  -1,  1], norm: [ 0,  0,  1], uv: [1/4, 0], }, // 1
        { pos: [ 0.5,  -1,  1], norm: [ 0,  0,  1], uv: [3/4, 0], }, // 2
        { pos: [ 1,  -1,  1], norm: [ 0,  0,  1], uv: [1, 0], }, // 3

        { pos: [ -1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], }, // 4
        { pos: [ -0.5,  1,  1], norm: [ 0,  0,  1], uv: [1/4, 1], }, // 5
        { pos: [ 0.5,  1,  1], norm: [ 0,  0,  1], uv: [3/4, 1], }, // 6
        { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [1, 1], }, // 7

        { pos: [ -0.5,  0.5,  1], norm: [ 0,  0,  1], uv: [1/4, 3/4], }, // 8
        { pos: [ 0.5,  0.5,  1], norm: [ 0,  0,  1], uv: [3/4, 3/4], }, // 9
        { pos: [ -0.5,  -0.5,  1], norm: [ 0,  0,  1], uv: [1/4, 1/4], }, // 10
        { pos: [ 0.5,  -0.5,  1], norm: [ 0,  0,  1], uv: [3/4, 1/4], }, // 11

        // right
        // { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [0, 0], }, // 4
        // { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 0], }, // 5
        // { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 1], }, // 6
        // { pos: [ 1,  1, -1], norm: [ 1,  0,  0], uv: [1, 1], }, // 7
        { pos: [ 1,  -1,  1], norm: [ 0,  0,  1], uv: [0, 0], }, // 12
        { pos: [ 1,  -1,  0.5], norm: [ 0,  0,  1], uv: [1/4, 0], }, // 13
        { pos: [ 1,  -1,  -0.5], norm: [ 0,  0,  1], uv: [3/4, 0], }, // 14
        { pos: [ 1,  -1,  -1], norm: [ 0,  0,  1], uv: [1, 0], }, // 15

        { pos: [ 1,  -0.5,  0.5], norm: [ 0,  0,  1], uv: [1/4, 1/4], }, // 16
        { pos: [ 1,  -0.5,  -0.5], norm: [ 0,  0,  1], uv: [3/4, 1/4], }, // 17
        { pos: [ 1,  0.5,  0.5], norm: [ 0,  0,  1], uv: [1/4, 3/4], }, // 18
        { pos: [ 1,  0.5,  -0.5], norm: [ 0,  0,  1], uv: [3/4, 3/4], }, // 19

        { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], }, // 20
        { pos: [ 1,  1,  0.5], norm: [ 0,  0,  1], uv: [1/4, 1], }, // 21
        { pos: [ 1,  1,  -0.5], norm: [ 0,  0,  1], uv: [3/4, 1], }, // 21
        { pos: [ 1,  1,  -1], norm: [ 0,  0,  1], uv: [1, 1], }, // 23

        // back
        // { pos: [ 1, -1, -1], norm: [ 0,  0, -1], uv: [0, 0], }, // 8
        // { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 0], }, // 9
        // { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 1], }, // 10
        // { pos: [-1,  1, -1], norm: [ 0,  0, -1], uv: [1, 1], }, // 11
        { pos: [ 1,  -1,  -1], norm: [ 0,  0,  1], uv: [0, 0], }, // 24
        { pos: [ 0.5,  -1,  -1], norm: [ 0,  0,  1], uv: [1/4, 0], }, // 25
        { pos: [ -0.5,  -1,  -1], norm: [ 0,  0,  1], uv: [3/4, 0], }, // 26
        { pos: [ -1,  -1,  -1], norm: [ 0,  0,  1], uv: [1, 0], }, // 27

        { pos: [ 0.5,  -0.5,  -1], norm: [ 0,  0,  1], uv: [1/4, 1/4], }, // 28
        { pos: [ -0.5,  -0.5,  -1], norm: [ 0,  0,  1], uv: [3/4, 1/4], }, // 29
        { pos: [ 0.5,  0.5,  -1], norm: [ 0,  0,  1], uv: [1/4, 3/4], }, // 30
        { pos: [ -0.5,  0.5,  -1], norm: [ 0,  0,  1], uv: [3/4, 3/4], }, // 31

        { pos: [ 1,  1,  -1], norm: [ 0,  0,  1], uv: [0, 1], }, // 32
        { pos: [ 0.5,  1,  -1], norm: [ 0,  0,  1], uv: [1/4, 1], }, // 33
        { pos: [ -0.5,  1,  -1], norm: [ 0,  0,  1], uv: [3/4, 1], }, // 34
        { pos: [ -1,  1,  -1], norm: [ 0,  0,  1], uv: [1, 1], }, // 35

        // left
        // { pos: [-1, -1, -1], norm: [-1,  0,  0], uv: [0, 0], }, // 12
        // { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 0], }, // 13
        // { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 1], }, // 14
        // { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [1, 1], }, // 15
        { pos: [ -1,  -1,  -1], norm: [ 0,  0,  1], uv: [0, 0], }, // 36
        { pos: [ -1,  -1,  -0.5], norm: [ 0,  0,  1], uv: [1/4, 0], }, // 37
        { pos: [ -1,  -1,  0.5], norm: [ 0,  0,  1], uv: [3/4, 0], }, // 38
        { pos: [ -1,  -1,  1], norm: [ 0,  0,  1], uv: [1, 0], }, // 39

        { pos: [ -1,  -0.5,  -0.5], norm: [ 0,  0,  1], uv: [1/4, 1/4], }, // 40
        { pos: [ -1,  -0.5,  0.5], norm: [ 0,  0,  1], uv: [3/4, 1/4], }, // 41
        { pos: [ -1,  0.5,  -0.5], norm: [ 0,  0,  1], uv: [1/4, 3/4], }, // 42
        { pos: [ -1,  0.5,  0.5], norm: [ 0,  0,  1], uv: [3/4, 3/4], }, // 43

        { pos: [ -1,  1,  -1], norm: [ 0,  0,  1], uv: [0, 1], }, // 44
        { pos: [ -1,  1,  -0.5], norm: [ 0,  0,  1], uv: [1/4, 1], }, // 45
        { pos: [ -1,  1,  0.5], norm: [ 0,  0,  1], uv: [3/4, 1], }, // 46
        { pos: [ -1,  1,  1], norm: [ 0,  0,  1], uv: [1, 1], }, // 47
        // // top
        // { pos: [ 1,  1, -1], norm: [ 0,  1,  0], uv: [0, 0], }, // 16
        // { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 0], }, // 17
        // { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 1], }, // 18
        // { pos: [-1,  1,  1], norm: [ 0,  1,  0], uv: [1, 1], }, // 19
        { pos: [ 1,  1,  -1], norm: [ 0,  0,  1], uv: [0, 0], }, // 48
        { pos: [ 0.5,  1,  -1], norm: [ 0,  0,  1], uv: [1/4, 0], }, // 49
        { pos: [ -0.5,  1,  -1], norm: [ 0,  0,  1], uv: [3/4, 0], }, // 50
        { pos: [ -1,  1,  -1], norm: [ 0,  0,  1], uv: [1, 0], }, // 51

        { pos: [ 0.5,  1,  -0.5], norm: [ 0,  0,  1], uv: [1/4, 1/4], }, // 52
        { pos: [ -0.5,  1,  -0.5], norm: [ 0,  0,  1], uv: [3/4, 1/4], }, // 53
        { pos: [ 0.5,  1,  0.5], norm: [ 0,  0,  1], uv: [1/4, 3/4], }, // 54
        { pos: [ -0.5,  1,  0.5], norm: [ 0,  0,  1], uv: [3/4, 3/4], }, // 55

        { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], }, // 56
        { pos: [ 0.5,  1,  1], norm: [ 0,  0,  1], uv: [1/4, 1], }, // 57
        { pos: [ -0.5,  1,  1], norm: [ 0,  0,  1], uv: [3/4, 1], }, // 58
        { pos: [ -1,  1,  1], norm: [ 0,  0,  1], uv: [1, 1], }, //59

        // // bottom
        // { pos: [ 1, -1,  1], norm: [ 0, -1,  0], uv: [0, 0], }, // 20
        // { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 0], }, // 21
        // { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 1], }, // 22
        // { pos: [-1, -1, -1], norm: [ 0, -1,  0], uv: [1, 1], }, // 23
        { pos: [ 1,  -1,  1], norm: [ 0,  0,  1], uv: [0, 0], }, // 60
        { pos: [ 0.5,  -1,  1], norm: [ 0,  0,  1], uv: [1/4, 0], }, // 61
        { pos: [ -0.5,  -1,  1], norm: [ 0,  0,  1], uv: [3/4, 0], }, // 62
        { pos: [ -1,  -1,  1], norm: [ 0,  0,  1], uv: [1, 0], }, // 63

        { pos: [ 0.5,  -1,  0.5], norm: [ 0,  0,  1], uv: [1/4, 1/4], }, // 64
        { pos: [ -0.5,  -1,  0.5], norm: [ 0,  0,  1], uv: [3/4, 1/4], }, // 65
        { pos: [ 0.5,  -1,  -0.5], norm: [ 0,  0,  1], uv: [1/4, 3/4], }, // 66
        { pos: [ -0.5,  -1,  -0.5], norm: [ 0,  0,  1], uv: [3/4, 3/4], }, // 67

        { pos: [ 1,  -1,  -1], norm: [ 0,  0,  1], uv: [0, 1], }, // 68
        { pos: [ 0.5,  -1,  -1], norm: [ 0,  0,  1], uv: [1/4, 1], }, // 69
        { pos: [ -0.5,  -1,  -1], norm: [ 0,  0,  1], uv: [3/4, 1], }, // 70
        { pos: [ -1,  -1,  -1], norm: [ 0,  0,  1], uv: [1, 1], }, //71
    ];
    const numVertices = vertices.length;
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const uvNumComponents = 4;
    const positions = new Float32Array(numVertices * positionNumComponents);
    const normals = new Float32Array(numVertices * normalNumComponents);
    const uvs = new Float32Array(numVertices * uvNumComponents);
    let posNdx = 0;
    let nrmNdx = 0;
    let uvNdx = 0;
    for (const vertex of vertices) {
        positions.set(vertex.pos, posNdx);
        normals.set(vertex.norm, nrmNdx);
        uvs.set(vertex.uv, uvNdx);
        posNdx += positionNumComponents;
        nrmNdx += normalNumComponents;
        uvNdx += uvNumComponents;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, positionNumComponents));
    geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(normals, normalNumComponents));
    geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(uvs, uvNumComponents));

    // geometry.setIndex([
    //     0,  1,  2,   2,  1,  3,  // front
    //     4,  5,  6,   6,  5,  7,  // right
    //     8,  9, 10,  10,  9, 11,  // back
    //     12, 13, 14,  14, 13, 15,  // left
    //     16, 17, 18,  18, 17, 19,  // top
    //     20, 21, 22,  22, 21, 23,  // bottom
    // ]);
    geometry.setIndex([
        0,4,1,  1,4,5,  2,3,6,  3,6,7,  5,8,9,  5,6,9,  1,2,10, 2,10,11, // front
        12,13,20,  20,21,13,  22,23,14,  15,14,23, 13,16,14,  14,16,17,  21,18,19,  21,22,19,  // right
        24,25,32,  33,32,25,  34,35,26, 27,26,35,  25,28,26,  28,29,26,  33,34,30, 30,31,34,  // back
        36,44,45,  36,37,45,  46,47,38, 38,39,47,  37,38,40,  40,41,38,  42,43,45,  45,46,43,  // left
        56,57,48,  48,49,57,  58,59,50,  50,51,59,  52,53,49,  49,50,53,  57,58,54,  54,55,58,  // top
        68,69,60,  60,61,69,  62,63,70,  70,71,63,  64,65,61,  61,62,65,  66,67,69,  69,70,67,  // bottom
    ]);

    const loader = new THREE.TextureLoader();
    const texture = loader.load('grenouille.jpg');

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshBasicMaterial({color, map: texture,side: THREE.DoubleSide});

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;
        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0xFFFFFF,  0),
        makeInstance(geometry, 0xFFFFFF, -3),
        makeInstance(geometry, 0xFFFFFF,  3),
    ];


    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        // const width = canvas.clientWidth;
        const width = window.innerWidth;
        // const height = canvas.clientHeight;
        const height = window.innerHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        // console.log(needResize)
        if (needResize) {
        renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
    //    time *= 0.0004;

        if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        }

        controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }


    requestAnimationFrame(render);
}

main();