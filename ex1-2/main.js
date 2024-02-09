var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.z = 200;
// camera.position.y = 5;
// camera.rotation.x = -0.2;
var material = new THREE.MeshNormalMaterial();
var materialLine = new THREE.LineBasicMaterial({ color: 0xffffff });

const left = -150;
const right = 150;
const tops = 150;
const bottom = -150;
const near = 0.1;
const far = 500;
var camera2 = new THREE.OrthographicCamera(left, right, tops, bottom, near, far);
camera2.position.z = 200;
// camera2.position.y = 5;
// camera2.rotation.x = -0.5;

function BoxGeo(width, height, depth, material){
    var geometry = new THREE.BoxGeometry(width, height, depth);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function CircleGeo(radius, segments, material){
    var geometry = new THREE.CircleGeometry(radius, segments);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function ConeGeo(radius, height, radialSegments, material){
    var geometry = new THREE.ConeGeometry(radius, height, radialSegments);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function CylinderGeo(radiusTop, radiusBottom, height, radialSegments, material){
    var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function DodecahedronGeo(radius, material){
    var geometry = new THREE.DodecahedronGeometry(radius);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function ExtrudeGeo(material){
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    
    const extrudeSettings = {
      steps: 2,  // ui: steps
      depth: 2,  // ui: depth
      bevelEnabled: true,  // ui: bevelEnabled
      bevelThickness: 1,  // ui: bevelThickness
      bevelSize: 1,  // ui: bevelSize
      bevelSegments: 2,  // ui: bevelSegments
    };

    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function IcosahedronGeo(material){
    var geometry = new THREE.IcosahedronGeometry(radius);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function LatheGeo(material){
    const points = [];
    for (let i = 0; i < 10; ++i) {
      points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
    }
    var geometry = new THREE.LatheGeometry(points);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function OctahedronGeo(radius, material){
    var geometry = new THREE.OctahedronGeometry(radius);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function PlaneGeo(width, height, material){
    var geometry = new THREE.PlaneGeometry(width, height);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function PolyhedronGeo(radius, detail, material){
    const verticesOfCube = [
        -1, -1, -1,    1, -1, -1,    1,  1, -1,    -1,  1, -1,
        -1, -1,  1,    1, -1,  1,    1,  1,  1,    -1,  1,  1,
    ];
    const indicesOfFaces = [
        2, 1, 0,    0, 3, 2,
        0, 4, 7,    7, 3, 0,
        0, 1, 5,    5, 4, 0,
        1, 2, 6,    6, 5, 1,
        2, 3, 7,    7, 6, 2,
        4, 5, 6,    6, 7, 4,
    ];
    const geometry = new THREE.PolyhedronGeometry(verticesOfCube, indicesOfFaces, radius, detail);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function RingGeo(innerRadius, outerRadius, thetaSegments){
    const geometry = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function ShapeGeo(material){
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    const geometry = new THREE.ShapeGeometry(shape);
    var geo = new THREE.Mesh( geometry, material );
    return geo

}
function SphereGeo(radius, widthSegments, heightSegments, material){
    var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function TetrahedronGeo(radius, material){
    var geometry = new THREE.TetrahedronGeometry(radius);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function TorusGeo(radius, tubeRadius, radialSegments, tubularSegments, material){
    const geometry = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function TorusKnotGeo(radius, tubeRadius, tubularSegments, radialSegments, material){
    const p = 2;  // ui: p
    const q = 3;  // ui: q
    var geometry = new THREE.TorusKnotGeometry(radius, tubeRadius, tubularSegments, radialSegments, p, q);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function TubeGeo( tubularSegments, radius, radialSegments, closed, material){
    class CustomSinCurve extends THREE.Curve {
        constructor(scale) {
            super();
            this.scale = scale;
        }
        getPoint(t) {
            const tx = t * 3 - 1.5;
            const ty = Math.sin(2 * Math.PI * t);
            const tz = 0;
            return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
        }
    }
    
    const path = new CustomSinCurve(4);
    var geometry = new THREE.TubeGeometry(path, tubularSegments, radius, radialSegments, closed);
    var geo = new THREE.Mesh( geometry, material );
    return geo
}
function EdgesGeo(size, widthSegments, heightSegments, depthSegments, material){
    const thresholdAngle = 15;
    var boxGeometry = new THREE.BoxGeometry(widthSegments, heightSegments, depthSegments);
    var geometry = new THREE.EdgesGeometry(boxGeometry, thresholdAngle);
    var geo = new THREE.LineSegments(geometry, material);
    return geo
}
function WireframeGeo(size, widthSegments, heightSegments, depthSegments, material){
    var geometry = new THREE.WireframeGeometry(new THREE.BoxGeometry(widthSegments, heightSegments, depthSegments));
    var geo = new THREE.LineSegments(geometry, material);
    return geo
}


// var width = 8;
// var height = 8;
// var depth = 8;
// var widthSegments = 8;  // ui: widthSegments
// var heightSegments = 8;  // ui: heightSegments
// var depthSegments = 8;  // ui: depthSegments
// var radius = 7;  // ui: radius
// var segments = 24;  // ui: segments
// var radialSegments = 16;  // ui: radialSegments
// var radiusTop = 4;  // ui: radiusTop
// var radiusBottom = 4;  // ui: radiusBottom
// var detail = 2;  // ui: detail
// var innerRadius = 2;  // ui: innerRadius
// var outerRadius = 7;  // ui: outerRadius
// var thetaSegments = 18;  // ui: thetaSegments
// var tubeRadius = 2;  // ui: tubeRadius
// var tubularSegments = 24;  // ui: tubularSegments
// var closed = false;  // ui: closed
// var size = 8;

var listGeo = []


for (let i = 0; i < 3; i++){
var width = Math.floor( Math.random() * 7 ) + 6;
var height = Math.floor( Math.random() * 7 ) + 6;
var depth = Math.floor( Math.random() * 7 ) + 6;
var widthSegments = Math.floor( Math.random() * 7 ) + 6;
var heightSegments = Math.floor( Math.random() * 7 ) + 6;
var depthSegments = Math.floor( Math.random() * 7 ) + 6;
var radius = Math.floor( Math.random() * 5 ) + 5;
var radius_tube = 1;
var segments = 24;  // ui: segments
var radialSegments = 16;  // ui: radialSegments
var radiusTop = 4;  // ui: radiusTop
var radiusBottom = 4;  // ui: radiusBottom
var detail = 2;  // ui: detail
var innerRadius = 2;  // ui: innerRadius
var outerRadius = 7;  // ui: outerRadius
var thetaSegments = 18;  // ui: thetaSegments
var tubeRadius = 2;  // ui: tubeRadius
var tubularSegments = 24;  // ui: tubularSegments
var closed = false;  // ui: closed
var size = 8;
listGeo.push( BoxGeo(width, height, depth, material), CircleGeo(radius, segments, material), ConeGeo(radius, height, radialSegments, material),
    CylinderGeo(radiusTop, radiusBottom, height, radialSegments, material), DodecahedronGeo(radius, material), ExtrudeGeo(material),
    IcosahedronGeo(material), LatheGeo(material), OctahedronGeo(radius, material), PlaneGeo(width, height, material), PolyhedronGeo(radius, detail, material),
    RingGeo(innerRadius, outerRadius, thetaSegments), ShapeGeo(material), SphereGeo(radius, widthSegments, heightSegments, material), TetrahedronGeo(radius, material),
    TorusGeo(radius, tubeRadius, radialSegments, tubularSegments, material), TorusKnotGeo(radius, tubeRadius, tubularSegments, radialSegments, material),
    TubeGeo( tubularSegments, radius_tube, radialSegments, closed, material), EdgesGeo(size, widthSegments, heightSegments, depthSegments, materialLine), 
    WireframeGeo(size, widthSegments, heightSegments, depthSegments, materialLine))


}

var listObj = [];
var obX = -100;
var obY = 30;
var obZ = -30;

for (let i = 0; i < listGeo.length; i++){
    scene.add(listGeo[i])
    listGeo[i].position.x = obX;
    listGeo[i].position.y = obY;
    listGeo[i].position.z = obZ;
    obX = obX + 50;
    if (obX >= 101){
        obX = -100;
        obY = obY + 20;
    }
    if (obY >= 91){
        obY = 30;
        obZ = obZ + 30;
    }
}

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents( window ); // optional
controls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 100;
controls.maxDistance = 1000;
controls.maxPolarAngle = Math.PI / 2;

var trackball = new THREE.TrackballControls( camera2, renderer.domElement );
trackball.rotateSpeed = 5.0; //回転速度
trackball.zoomSpeed = 0.5;//ズーム速度
trackball.panSpeed = 2.0;//パン速度
// controls2.listenToKeyEvents( window ); // optional
// controls2.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
// controls2.dampingFactor = 0.05;
// controls2.screenSpacePanning = false;
// controls2.minDistance = 100;
// controls2.maxDistance = 1000;
// controls2.maxPolarAngle = Math.PI / 2;


var num = 0;


var points = [];
points.push( new THREE.Vector3( -1.5, 0, 0 ) );
points.push( new THREE.Vector3( 1.5, 0, 0 ) );
var geometry2 = new THREE.BufferGeometry().setFromPoints( points );

var points2 = [];
points2.push( new THREE.Vector3( 0, 0, -1.5 ) );
points2.push( new THREE.Vector3( 0, 0, 1.5) );
var geometry3 = new THREE.BufferGeometry().setFromPoints( points2 );

var ground = function (){
    var date1 = new Date();
        for (let ground_x = -300; ground_x < 300; ground_x+=6){
            for (let ground_z = -300; ground_z < 300; ground_z+=6){
                var line_op = (20 / Math.sqrt(ground_x**2 + ground_z**2));

                var material2 = new THREE.LineBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: line_op
                });

                var line = new THREE.Line( geometry2, material2 );
                var line2 = new THREE.Line( geometry3, material2 );
                line.position.set(ground_x, 0, ground_z);
                line2.position.set(ground_x, 0, ground_z);
                scene.add( line, line2 );
            }
        }
        var date2 = new Date();
        console.log(date2-date1);
};
ground();

var render = function () {
    requestAnimationFrame( render );
    for (let i = 0; listGeo.length > i; i++){
        listGeo[i].rotation.x += 0.05;
        listGeo[i].rotation.y += 0.05;
    }
    if (num%2 == 0){
        renderer.render( scene, camera );
    }
    else{
        renderer.render( scene, camera2);
    }
    trackball.update();
};

render();
function buttonClick(){
    num += 1;
}