

import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports/optimized/three.js';

let camera, scene, renderer;




initGame();




function initGame(){
    scene=new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    
     setupLights();
     setupCamera();


    document.body.appendChild(renderer.domElement);
   makeBottomLayer();

   animate();
}


function makeBottomLayer(){
    let geo=new THREE.BoxGeometry(3,1,3);
    let mat=new THREE.MeshLambertMaterial({color:0Xff9933});
    let myBox=new THREE.Mesh(geo,mat);
    myBox.position.set(0,0,0);
    scene.add(myBox);
}

/* lights */
function setupLights(){
    const ambient=new THREE.AmbientLight(0Xffffff,0.5);
const sun=new THREE.DirectionalLight(0Xffffff,0.5);
sun.position.set(10,20,0);
scene.add(sun);
scene.add(ambient);
}


function setupCamera(){
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(4,3,4);
camera.lookAt(0,0,0); 
}



/* animation function*/
function animate() {
    requestAnimationFrame( animate );
      renderer.render( scene, camera );
  }









