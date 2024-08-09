$(document).ready(function () {
    let $canvas = $("#loader canvas"),
        canvas = $canvas[0],
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            context: canvas.getContext("webgl2"),
            antialias: true,
            alpha: true
        });

    renderer.setSize($canvas.width(), $canvas.height());
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
        45,
        $canvas.width() / $canvas.height(),
        0.1,
        1000
    );

    camera.position.z = 500;

    let shape = new THREE.TorusGeometry(70, 20, 60, 160);
    let material = new THREE.MeshPhongMaterial({
        color: 0xe4ecfa,
        shininess: 20,
        opacity: 0.96,
        transparent: true
    });
    let donut = new THREE.Mesh(shape, material);

    scene.add(donut);

    let lightTop = new THREE.DirectionalLight(0xffffff, 0.3);
    lightTop.position.set(0, 200, 0);
    lightTop.castShadow = true;
    scene.add(lightTop);

    let frontTop = new THREE.DirectionalLight(0xffffff, 0.4);
    frontTop.position.set(0, 0, 300);
    frontTop.castShadow = true;
    scene.add(frontTop);

    scene.add(new THREE.AmbientLight(0xcdd9ed));

    function twist(geometry, amount) {
        const quaternion = new THREE.Quaternion();
        for (let i = 0; i < geometry.vertices.length; i++) {
            quaternion.setFromAxisAngle(
                new THREE.Vector3(1, 0, 0),
                (Math.PI / 180) * (geometry.vertices[i].x / amount)
            );
            geometry.vertices[i].applyQuaternion(quaternion);
        }
        geometry.verticesNeedUpdate = true;
    }

    let mat = Math.PI,
        speed = Math.PI / 120,
        forwards = 1;

    var render = function () {
        requestAnimationFrame(render);

        donut.rotation.x -= speed * forwards;

        mat = mat - speed;

        if (mat <= 0) {
            mat = Math.PI;
            forwards = forwards * -1;
        }

        twist(shape, (mat >= Math.PI / 2 ? -120 : 120) * forwards);

        renderer.render(scene, camera);
    };

    render();
});