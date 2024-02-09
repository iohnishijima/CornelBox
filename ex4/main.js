var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var VRButton = new THREE.VRButton();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.z = 100;
var material = new THREE.MeshNormalMaterial();
var materialLine = new THREE.LineBasicMaterial({ color: 0xffffff });

function BoxGeo(x,y,z,width, height, depth){
    var geometry = new THREE.BoxGeometry(width, height, depth);
    var material = new THREE.MeshNormalMaterial();
    var geo = new THREE.Mesh( geometry, material );
    geo.position.x = x;
    geo.position.y = y;
    geo.position.z = z;
    return geo
}
function SphGeo(x,y,z,radius, width, height){
    var geometry = new THREE.SphereGeometry(radius, width, height);
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    var sphere = new THREE.Mesh( geometry, material );
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;
    return sphere
}

const group = new THREE.Group();

//body
const hip = BoxGeo(0,23,0,8,2,2);
const hipJoin = SphGeo(0,2,0,1,10,10);
const body1 = BoxGeo(0,4,0,6,6,2);
const body1Join = SphGeo(0,4,0,1,10,10);
const body2 = BoxGeo(0,4,0,8,6,2);
const body2Join = SphGeo(0,4,0,1,10,10);
const head = BoxGeo(0,3,0,4,4,4);
group.add(hip);
hip.add(hipJoin);
hipJoin.add(body1);
body1.add(body1Join);
body1Join.add(body2);
body2.add(body2Join);
body2Join.add(head);

// feet L
const feetL = BoxGeo(0,-2,0,2,2,4);
const feetLJoin = SphGeo(0,-4.5,0,1,10,10);
const leg1L = BoxGeo(0,-4.5,0,2,7,2);
const leg1LJoin = SphGeo(0,-4.5,0,1,10,10);
const leg2L = BoxGeo(0,-4.5,0,2,7,2);
const leg2LJoin = SphGeo(-3,-2,0,1,10,10);
hip.add(leg2LJoin);
leg2LJoin.add(leg2L);
leg2L.add(leg1LJoin);
leg1LJoin.add(leg1L);
leg1L.add(feetLJoin);
feetLJoin.add(feetL);

//feet R
const feetR = BoxGeo(0,-2,0,2,2,4);
const feetRJoin = SphGeo(0,-4.5,0,1,10,10);
const leg1LR = BoxGeo(0,-4.5,0,2,7,2);
const leg1RJoin = SphGeo(0,-4.5,0,1,10,10);
const leg2R = BoxGeo(0,-4.5,0,2,7,2);
const leg2RJoin = SphGeo(3,-2,0,1,10,10);
hip.add(leg2RJoin);
leg2RJoin.add(leg2R);
leg2R.add(leg1RJoin);
leg1RJoin.add(leg1LR);
leg1LR.add(feetRJoin);
feetRJoin.add(feetR);

//arm L
const arm2LJoin = SphGeo(-5,2,0,1,10,10);
const arm2L = BoxGeo(-3.5,0,0,5,1.5,1.5);
const arm1LJoin = SphGeo(-3.5,0,0,1,10,10);
const arm1L = BoxGeo(-3.5,0,0,5,1.5,1.5);
const handLJoin = SphGeo(-3.5,0,0,1,10,10);
const handL = BoxGeo(-1.5,0,0,1,2,1);
body2.add(arm2LJoin);
arm2LJoin.add(arm2L);
arm2L.add(arm1LJoin);
arm1LJoin.add(arm1L);
arm1L.add(handLJoin);
handLJoin.add(handL);

//arm R
const arm2RJoin = SphGeo(5,2,0,1,10,10);
const arm2R = BoxGeo(3.5,0,0,5,1.5,1.5);
const arm1RJoin = SphGeo(3.5,0,0,1,10,10);
const arm1R = BoxGeo(3.5,0,0,5,1.5,1.5);
const handRJoin = SphGeo(3.5,0,0,1,10,10);
const handR = BoxGeo(1.5,0,0,1,2,1);
body2.add(arm2RJoin);
arm2RJoin.add(arm2R);
arm2R.add(arm1RJoin);
arm1RJoin.add(arm1R);
arm1R.add(handRJoin);
handRJoin.add(handR);





scene.add(group)

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents( window ); // optional
controls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 10;
controls.maxDistance = 1000;
controls.maxPolarAngle = Math.PI / 2;


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

minus = 0;
condition = true;
arm2LJoin.rotation.z = 1.3;
arm2RJoin.rotation.z = -1.3;
arm1LJoin.rotation.z = 1;
arm1LJoin.rotation.y = 1.5;
arm1LJoin.rotation.x = -1;
arm1RJoin.rotation.z = 1;
arm1RJoin.rotation.y = -1.5;
arm1RJoin.rotation.x = 1;
var render = function () {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
    if (minus >= -1.3 && condition == true){
        leg2LJoin.rotation.x += -0.03;
        leg2RJoin.rotation.x += 0.03;
        leg1LJoin.rotation.x += 0.01;
        if (leg1RJoin.rotation.x > 0){
            leg1RJoin.rotation.x += -0.01;
        }
        arm2LJoin.rotation.x += 0.03;
        arm2RJoin.rotation.x += -0.03;
        body1Join.rotation.y += -0.008;
        minus += -0.03;
    }else if(minus <= 1.3 && condition == false){
        leg2LJoin.rotation.x += 0.03;
        leg2RJoin.rotation.x += -0.03;
        if (leg1LJoin.rotation.x > 0){
            leg1LJoin.rotation.x += -0.01;
        }
        leg1RJoin.rotation.x += 0.01;
        arm2LJoin.rotation.x += -0.03;
        arm2RJoin.rotation.x += 0.03;
        body1Join.rotation.y += 0.008;
        minus += 0.03;
    }
    if (minus <= -1.3){
        condition = false;
    }
    if (minus >= 1.3){
        condition = true;
    }
};

render();
