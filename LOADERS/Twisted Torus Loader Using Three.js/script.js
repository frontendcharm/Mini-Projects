import * as THREE from "three";
import { ParametricGeometry } from "three/addons/geometries/ParametricGeometry.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

console.clear();

var scene = new THREE.Scene();
scene.background = new THREE.Color("#151515");

var camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight);
camera.position.set(0, 0, 25);
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setAnimationLoop(animationLoop);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", (event) => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});

var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;

var ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

var light = new THREE.DirectionalLight("white", 3);
light.position.set(1, 1, 1);
scene.add(light);

function surface(u, v, target) {
    const n = 10,
        t = 1.5;

    u *= 2 * Math.PI;
    v *= 2 * Math.PI;

    var r = (Math.cos(v) ** n + Math.sin(v) ** n) ** (-1 / n),
        x = (4 + r * Math.cos(v + t * u)) * Math.cos(u),
        y = (4 + r * Math.cos(v + t * u)) * Math.sin(u),
        z = r * Math.sin(v + t * u);

    target.set(x, y, z);
}

const geometry = new ParametricGeometry(surface, 100, 100);

var object = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
scene.add(object);

function animationLoop(t) {
    object.rotation.z = t / 2700;

    controls.update();
    light.position.copy(camera.position);
    renderer.render(scene, camera);
}
