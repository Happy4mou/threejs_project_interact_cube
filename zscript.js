import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight , 0.1 , 100);
camera.position.set(0 , 2 ,5);
scene.add(camera);

const geometry = new THREE.SphereGeometry( 1, 64, 32 ); 
const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere );
sphere.position.set(0 , 1 , 0);
sphere.castShadow = true;
scene.add(sphere);

const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -3;
plane.receiveShadow = true;
scene.add(plane);

const canvas = document.querySelector('.webgl');

const renderer = new THREE.WebGLRenderer({canvas});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth , window.innerHeight);


const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add( directionalLight );

window.addEventListener('resize', () => {

    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);
});

const loop = ()=>{
    renderer.render(scene , camera);
    window.requestAnimationFrame(loop);
    controls.update();
}

loop();