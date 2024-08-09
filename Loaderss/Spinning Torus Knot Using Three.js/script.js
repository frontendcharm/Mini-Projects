import * as THREE from "https://cdn.skypack.dev/three@0.133.1/build/three.module";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls";

let scene, camera, renderer, orbit;

init();
render();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x151515);

    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        60
    );
    camera.position.set(0, 4, 10);
    scene.add(camera);

    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 200, 50, 2, 1);
    geometry.rotateX(0.5 * Math.PI);
    const material = new THREE.MeshNormalMaterial({});
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("canvas"),
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    orbit = new OrbitControls(camera, renderer.domElement);
    orbit.autoRotate = true;
    orbit.autoRotateSpeed = 50;
    window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    orbit.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
