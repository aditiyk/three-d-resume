import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.RingGeometry(2, 7, 6);
const material = new THREE.MeshBasicMaterial({
  color: 0xf4bbff,
  side: THREE.DoubleSide,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1, 1, 1);

const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(10, 5, 10);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addSquare() {
  const geometry = new THREE.BoxGeometry(0.5, 0.6, 0.5);
  const material = new THREE.MeshStandardMaterial({ color: 0xff77ff });
  const plane = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  plane.position.set(x, y, z);
  scene.add(plane);
}

Array(500).fill().forEach(addSquare);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

const imageLoader = new THREE.TextureLoader().load("image.jpg");

const myImg = new THREE.Mesh(
  new THREE.BoxGeometry(7, 7, 7),
  new THREE.MeshBasicMaterial({ map: imageLoader })
);

scene.add(myImg);
myImg.position.z = -30;
myImg.position.setX(-20);
myImg.position.setY(-4);

const moonTexture = new THREE.TextureLoader().load("circle.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(10, 10, 10),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-20);
moon.position.setY(5);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.02;
  moon.rotation.y += 0.03;
  moon.rotation.z += 0.05;

  myImg.rotation.x += 0.05;
  myImg.rotation.y += 0.03;
  myImg.rotation.z += 0.03;

  camera.position.z = t * -0.0001;

  camera.position.x = t * -0.001;
  camera.position.y = t * -0.0000001;
}
document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.02;
  mesh.rotation.y += 0.03;
  mesh.rotation.z += 0.01;

  moon.rotation.x += 0.01;
  moon.rotation.y += 0.01;
  moon.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();
