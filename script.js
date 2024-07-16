
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Set the variables
const sizes = {
    Width: window.innerWidth,
    Height: window.innerHeight,
};
const aspect = sizes.Width / sizes.Height;

const size_box = 1;
const space = 1.5;

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x040f0f);

// Create camera
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.position.set(2, 4, 5);

const canvas = document.querySelector('.webgl');
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Set renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.Width, sizes.Height);
renderer.shadowMap.enabled = true;

// Add directional light
const light_p_x = new THREE.SpotLight( 0x02EB98);
light_p_x.position.set( 30, 0, 0 );
light_p_x.castShadow = true;
// const helperx = new THREE.SpotLightHelper(light_p_x);
scene.add( light_p_x );
// scene.add(helperx);

const light_n_x = new THREE.SpotLight( 0x02EB98);
light_n_x.position.set( -30, 0, 0 );
light_n_x.castShadow = true;
// const helperxn = new THREE.SpotLightHelper(light_n_x);
scene.add( light_n_x );
// scene.add(helperxn);


const light_p_y = new THREE.SpotLight( 0x02EB98);
light_p_y.position.set( 0, 30, 0 );
light_p_y.castShadow = true;
// const helpery = new THREE.SpotLightHelper(light_p_y);
scene.add( light_p_y );
// scene.add(helpery);

const light_n_y = new THREE.SpotLight( 0x02EB98);
light_n_y.position.set( 0, -30, 0 );
light_n_y.castShadow = true;
// const helperyn = new THREE.SpotLightHelper(light_n_y);
scene.add( light_n_y );
// scene.add(helperyn);

const light_p_z = new THREE.SpotLight( 0x02EB98);
light_p_z.position.set( 0, 0, 30 );
light_p_z.castShadow = true;
// const helperz = new THREE.SpotLightHelper(light_p_z);
scene.add( light_p_z );
// scene.add(helperz);

const light_n_z = new THREE.SpotLight( 0x02EB98, 1, 100 );
light_n_z.position.set( 0, 0, -30);
light_n_z.castShadow = true;
// const helperzn = new THREE.SpotLightHelper(light_n_z);
scene.add( light_n_z );

// Create the 3D matrix of boxes and store them in an array
const boxes = [];

for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
            const geometry = new THREE.BoxGeometry(size_box, size_box, size_box);
            const material = 
            [
                new THREE.MeshStandardMaterial({ color: 0x054B32 }),
                new THREE.MeshStandardMaterial({ color: 0x054B32 }),
                new THREE.MeshStandardMaterial({ color: 0x054B32 }),
                new THREE.MeshStandardMaterial({ color: 0x054B32 }),
                new THREE.MeshStandardMaterial({ color: 0x054B32 }),
                new THREE.MeshStandardMaterial({ color: 0x054B32 })
            ];
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(
                x * space - space,
                y * space - space,
                z * space - space
            );
            cube.castShadow = true;
            cube.receiveShadow = true;
            scene.add(cube);
            boxes.push(cube);
        }
    }
}

// Define raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

var chose_X_O = "X";
const onMouseClick = (event) => {

    mouse.x = (event.clientX / sizes.Width) * 2 - 1;
    mouse.y = -(event.clientY / sizes.Height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(boxes, true);

    if (intersects.length > 0 && (chose_X_O !== "O")) {
        const intersect = intersects[0];
        const intersectedObject = intersect.object;
        const faceIndex = Math.floor(intersect.faceIndex / 2);
        const faceColor = intersectedObject.material[faceIndex].color;
        if(faceColor.getHex() !== 0xffffff)
            {
                intersectedObject.material[faceIndex].color.set(0x000000);
                chose_X_O = "O";
            }
        console.log(chose_X_O%2);
    }
    else if (intersects.length > 0 && (chose_X_O !== "X")) {
        const intersect = intersects[0];
        const intersectedObject = intersect.object;
        const faceIndex = Math.floor(intersect.faceIndex / 2);
        const faceColor = intersectedObject.material[faceIndex].color;
        if(faceColor.getHex() !== 0x000000)
            {
                intersectedObject.material[faceIndex].color.set(0xffffff);
                chose_X_O = "X";
            }
        console.log(chose_X_O%2);
        
    }
    
    
};

window.addEventListener('click', onMouseClick);

// Set for resizing the window
window.addEventListener('resize', () => {
    sizes.Width = window.innerWidth;
    sizes.Height = window.innerHeight;
    camera.aspect = sizes.Width / sizes.Height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.Width, sizes.Height);
});


const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
};

loop();
