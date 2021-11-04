

import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports/optimized/three.js';

let camera, scene, renderer;
const boxHeight = 1;
let animSpeed=0.1;
let origBoxSize = 4;
let camHeight=3;
let gameStack = [];
let activeObject=0;

let gameStarted = false;


/*initialize game */
window.onclick = e => {

    if (!gameStarted) {
        console.log("game NOT started");

        gameStarted = true;
        initGame();

    }
    else {

     

       if(activeObject.direction=="x"){
        addLayer(0,-10, origBoxSize, origBoxSize,"z");
       }
       else{
        addLayer(-10,0, origBoxSize, origBoxSize, "x");
       }
      
        
    }
}



function initGame() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);


    setupLights();
    setupCamera();
    //base layer
    addLayer(0, 0, origBoxSize, origBoxSize,"first");

    // first mover
    addLayer(-10, 0, origBoxSize, origBoxSize,"x");

    document.body.appendChild(renderer.domElement);

    renderer.setAnimationLoop(gameLoop);
}


function addLayer(x, z, width, depth, direction) {

    let y = boxHeight * gameStack.length;

let layer = generateBox(x, y, z, width, depth);

    layer.direction = direction;
    gameStack.push(layer);
    console.log(gameStack);
}


function generateBox(x, y, z, width, depth) {
console.log("box");
    let geo = new THREE.BoxGeometry(width, boxHeight, depth);
    let color = new THREE.Color(`hsl(${30 + gameStack.length * 4},100%,50%)`);
    let mat = new THREE.MeshLambertMaterial({ color });
    let myBox = new THREE.Mesh(geo, mat);
    myBox.position.set(x, y, z);
    scene.add(myBox);

    return {
        threejs: myBox,
        width,
        depth,
    };
}

/* lights */
function setupLights() {
    const ambient = new THREE.AmbientLight(0Xffffff, 0.5);
    const sun = new THREE.DirectionalLight(0Xffffff, 0.5);
    sun.position.set(10, 20, 0);
    scene.add(sun);
    scene.add(ambient);
}


function setupCamera() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(4, camHeight, 4);
    camera.lookAt(0, 0, 0);
}



/* gameloop function*/
function gameLoop() {

    //move element
 activeObject=gameStack[gameStack.length-1];
let camtarget=gameStack[gameStack.length-2];

activeObject.threejs.position[activeObject.direction]+=animSpeed;

//move camera
if(camera.position.y<boxHeight*(gameStack.length-2)+camHeight){
camera.position.y+=animSpeed*0.2;
}
else{

}

//camera.lookAt(0,camtarget.threejs.position.y,0);

    renderer.render(scene, camera);
}









