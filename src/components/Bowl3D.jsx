// // src/components/FoodBowl3D.jsx

// import React, { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// const Bowl3D = () => {
//   const containerRef = useRef();
//   const canvasRef = useRef();

//   useEffect(() => {
//     // === Renderer (uses existing <canvas>) ===
//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true, // transparent background
//       antialias: true,
//     });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(
//       containerRef.current.clientWidth,
//       containerRef.current.clientHeight
//     );
//     renderer.setClearColor(0x000000, 0); // fully transparent

//     // === Scene & Camera ===
//     const scene = new THREE.Scene();

//     const camera = new THREE.PerspectiveCamera(
//       45,
//       containerRef.current.clientWidth / containerRef.current.clientHeight,
//       0.1,
//       100
//     );
//     camera.position.set(0, 10, 16);
//     camera.lookAt(0, 3, 0);

//     // === OrbitControls ===
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.1;
//     controls.enablePan = true;
//     controls.minDistance = 6;
//     controls.maxDistance = 40;
//     controls.minPolarAngle = 0;
//     controls.maxPolarAngle = Math.PI;

//     // === Lighting ===
//     const ambient = new THREE.AmbientLight(0xffffff, 0.6);
//     scene.add(ambient);
//     const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     dirLight.position.set(5, 15, 5);
//     scene.add(dirLight);

//     // === Group to hold everything ===
//     const mainGroup = new THREE.Group();
//     scene.add(mainGroup);

//     // === 1) Bowl (flipped hemisphere) ===
//     const bowlRadius = 5;
//     const bowlGeom = new THREE.SphereGeometry(
//       bowlRadius,
//       32,
//       32,
//       0,
//       Math.PI * 2,
//       0,
//       Math.PI / 2
//     );
//     const bowlMat = new THREE.MeshStandardMaterial({
//       color: 0x4caf50, // Changed to a nice green color
//       side: THREE.DoubleSide,
//       roughness: 0.4,
//       metalness: 0.1,
//     });
//     const bowlMesh = new THREE.Mesh(bowlGeom, bowlMat);
//     bowlMesh.rotation.x = Math.PI; // point opening up
//     bowlMesh.position.y = 0;
//     mainGroup.add(bowlMesh);

//     // === Helper: random point inside bowl-shaped volume ===
//     function randomPointInBowl(maxRadius = 4.5, maxHeight = 2.3) {
//       const r = Math.random() * maxRadius;
//       const theta = Math.random() * 2 * Math.PI;
//       const yMax = maxHeight * (1 - r / maxRadius);
//       const y = Math.random() * yMax;
//       const x = r * Math.cos(theta);
//       const z = r * Math.sin(theta);
//       return new THREE.Vector3(x, y, z);
//     }

//     // === 2) Rice grains (1000 white, elongated spheres) ===
//     const riceGeom = new THREE.SphereGeometry(0.08, 6, 6);
//     riceGeom.scale(1, 0.4, 1);
//     const riceMat = new THREE.MeshStandardMaterial({
//       color: 0xffffff,
//       roughness: 0.6,
//       metalness: 0,
//     });
//     for (let i = 0; i < 15000; i++) {
//       const grain = new THREE.Mesh(riceGeom, riceMat);
//       const pos = randomPointInBowl(4.5, 2.3);
//       grain.position.set(pos.x, pos.y + 0.15, pos.z);
//       grain.rotation.set(
//         Math.random() * Math.PI,
//         Math.random() * Math.PI,
//         Math.random() * Math.PI
//       );
//       mainGroup.add(grain);
//     }

//     // === 3) Paneer cubes (40 light-yellow cubes) ===
//     const paneerSize = 0.28;
//     const paneerGeom = new THREE.BoxGeometry(
//       paneerSize,
//       paneerSize,
//       paneerSize
//     );
//     const paneerMat = new THREE.MeshStandardMaterial({
//       color: 0xfff2c7,
//       roughness: 0.5,
//       metalness: 0,
//     });
//     for (let i = 0; i < 40; i++) {
//       const paneer = new THREE.Mesh(paneerGeom, paneerMat);
//       const pos = randomPointInBowl(4, 2.0);
//       paneer.position.set(pos.x, pos.y + 0.2, pos.z);
//       paneer.rotation.y = Math.random() * Math.PI * 2;
//       mainGroup.add(paneer);
//     }

//     // === 4) Chicken pieces (30 small brownish spheres) ===
//     const chickenGeom = new THREE.SphereGeometry(0.22, 8, 8);
//     const chickenMat = new THREE.MeshStandardMaterial({
//       color: 0xd2691e,
//       roughness: 0.6,
//       metalness: 0,
//     });
//     for (let i = 0; i < 50; i++) {
//       const chicken = new THREE.Mesh(chickenGeom, chickenMat);
//       const pos = randomPointInBowl(4.2, 2.0);
//       chicken.position.set(pos.x, pos.y + 0.2, pos.z);
//       const s = 0.7 + Math.random() * 0.5;
//       chicken.scale.set(s, s, s);
//       chicken.rotation.set(
//         Math.random() * Math.PI,
//         Math.random() * Math.PI,
//         Math.random() * Math.PI
//       );
//       mainGroup.add(chicken);
//     }

//     // === 5) Veggies ===

//     // 5a) Tomatoes: red spheres
//     const tomatoGeom = new THREE.SphereGeometry(0.25, 12, 12);
//     const tomatoMat = new THREE.MeshStandardMaterial({
//       color: 0xe02b20, // bright red
//       roughness: 0.4,
//       metalness: 0,
//     });
//     for (let i = 0; i < 55; i++) {
//       const tomato = new THREE.Mesh(tomatoGeom, tomatoMat);
//       const pos = randomPointInBowl(4.3, 2.2);
//       tomato.position.set(pos.x, pos.y + 0.2, pos.z);
//       tomato.rotation.set(
//         Math.random() * Math.PI,
//         Math.random() * Math.PI,
//         Math.random() * Math.PI
//       );
//       mainGroup.add(tomato);
//     }

//     // 5b) Broccoli: green "florets" as slightly lumpy spheres
//     const broccoliMat = new THREE.MeshStandardMaterial({
//       color: 0x2e8b57, // sea green
//       roughness: 0.5,
//       metalness: 0,
//     });
//     for (let i = 0; i < 60; i++) {
//       // create a cluster of small spheres to simulate a floret
//       const floretGroup = new THREE.Group();
//       const numBumps = 8 + Math.floor(Math.random() * 5);
//       for (let j = 0; j < numBumps; j++) {
//         const bump = new THREE.Mesh(
//           new THREE.SphereGeometry(0.18, 8, 8),
//           broccoliMat
//         );
//         // random offset around center
//         const offset = new THREE.Vector3(
//           (Math.random() - 0.5) * 0.4,
//           (Math.random() - 0.5) * 0.4,
//           (Math.random() - 0.5) * 0.4
//         );
//         bump.position.copy(offset);
//         floretGroup.add(bump);
//       }
//       const center = randomPointInBowl(4.1, 2.1);
//       floretGroup.position.set(center.x, center.y + 0.25, center.z);
//       floretGroup.rotation.set(
//         Math.random() * Math.PI,
//         Math.random() * Math.PI,
//         Math.random() * Math.PI
//       );
//       mainGroup.add(floretGroup);
//     }

//     // 5c) Carrots: orange cylinders
//     const carrotGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.7, 8);
//     const carrotMat = new THREE.MeshStandardMaterial({
//       color: 0xff8c00, // dark orange
//       roughness: 0.4,
//       metalness: 0,
//     });
//     for (let i = 0; i < 40; i++) {
//       const carrot = new THREE.Mesh(carrotGeom, carrotMat);
//       const pos = randomPointInBowl(4.3, 2.2);
//       carrot.position.set(pos.x, pos.y + 0.35, pos.z);
//       carrot.rotation.set(
//         Math.random() * Math.PI,
//         Math.random() * Math.PI,
//         Math.random() * Math.PI
//       );
//       mainGroup.add(carrot);
//     }

//     // === Animate ===
//     let reqId;
//     const animate = () => {
//       controls.update();
//       renderer.render(scene, camera);
//       reqId = requestAnimationFrame(animate);
//     };
//     animate();

//     // === Handle Resize ===
//     const handleResize = () => {
//       if (!containerRef.current) return;
//       const width = containerRef.current.clientWidth;
//       const height = containerRef.current.clientHeight;
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     };
//     window.addEventListener("resize", handleResize);

//     // === Cleanup on Unmount ===
//     return () => {
//       cancelAnimationFrame(reqId);
//       window.removeEventListener("resize", handleResize);
//       controls.dispose();
//       renderer.dispose();

//       scene.traverse((obj) => {
//         if (obj.geometry) obj.geometry.dispose();
//         if (obj.material) {
//           if (Array.isArray(obj.material)) {
//             obj.material.forEach((m) => m.dispose());
//           } else {
//             obj.material.dispose();
//           }
//         }
//       });
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       style={{ width: "100%", height: "100vh", overflow: "hidden" }}
//     >
//       <canvas
//         id="bowlcanvas"
//         ref={canvasRef}
//         style={{ width: "100%", height: "100%" }}
//       />
//     </div>
//   );
// };

// export default Bowl3D;

// src/components/Bowl3D.jsx

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Bowl3D = () => {
  const containerRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    // === Renderer (uses existing <canvas>) ===
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0); // fully transparent

    // === Scene & Camera ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 12, 18);
    camera.lookAt(0, 3, 0);

    // === OrbitControls ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enablePan = true;
    controls.minDistance = 6;
    controls.maxDistance = 40;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;

    // === Lighting ===
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 20, 10);
    scene.add(pointLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(5, 15, 5);
    scene.add(dirLight);

    // === Group to hold everything ===
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // === 1) Bowl (flipped hemisphere only) ===
    const bowlRadius = 5;
    const bowlGeom = new THREE.SphereGeometry(
      bowlRadius,
      32,
      32,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2
    );
    const bowlMat = new THREE.MeshPhongMaterial({
      color: 0x2e8b57,
      specular: 0x444444,
      shininess: 50,
      side: THREE.DoubleSide,
    });
    const bowlMesh = new THREE.Mesh(bowlGeom, bowlMat);
    bowlMesh.rotation.x = Math.PI; // opening faces up
    bowlMesh.position.y = 0;
    mainGroup.add(bowlMesh);

    // === Helper: random point inside bowl-shaped volume ===
    function randomPointInBowl(maxRadius = 4.5, maxHeight = 2.5) {
      const r = Math.random() * maxRadius;
      const theta = Math.random() * 2 * Math.PI;
      const yMax = maxHeight * (1 - r / maxRadius);
      const y = Math.random() * yMax;
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      return new THREE.Vector3(x, y, z);
    }

    // === 2) Rice grains (5000 white, elongated spheres) ===
    const riceGeom = new THREE.SphereGeometry(0.07, 6, 6);
    riceGeom.scale(1, 0.35, 1);
    const riceMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xdddddd,
      shininess: 10,
    });
    for (let i = 0; i < 10000; i++) {
      const grain = new THREE.Mesh(riceGeom, riceMat);
      const pos = randomPointInBowl(4.5, 2.5);
      grain.position.set(pos.x, pos.y + 0.15, pos.z);
      grain.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mainGroup.add(grain);
    }

    // === 3) Chicken pieces (100 brownish spheres) ===
    const chickenGeom = new THREE.SphereGeometry(0.24, 8, 8);
    const chickenMat = new THREE.MeshPhongMaterial({
      color: 0xd2691e,
      specular: 0x333333,
      shininess: 10,
    });
    for (let i = 0; i < 100; i++) {
      const chicken = new THREE.Mesh(chickenGeom, chickenMat);
      const pos = randomPointInBowl(4.2, 2.2);
      chicken.position.set(pos.x, pos.y + 0.2, pos.z);
      const s = 0.7 + Math.random() * 0.4;
      chicken.scale.set(s, s, s);
      chicken.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mainGroup.add(chicken);
    }

    // === 4) Fish pieces (60 light-gray, elongated spheres) ===
    const fishGeom = new THREE.SphereGeometry(0.2, 8, 8);
    fishGeom.scale(1.6, 0.4, 0.6);
    const fishMat = new THREE.MeshPhongMaterial({
      color: 0xb0c4de,
      specular: 0xaaaaaa,
      shininess: 20,
    });
    for (let i = 0; i < 60; i++) {
      const fish = new THREE.Mesh(fishGeom, fishMat);
      const pos = randomPointInBowl(4.0, 2.2);
      fish.position.set(pos.x, pos.y + 0.2, pos.z);
      fish.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mainGroup.add(fish);
    }

    // === 5) Paneer cubes (40 light-yellow cubes) ===
    const paneerSize = 0.28;
    const paneerGeom = new THREE.BoxGeometry(
      paneerSize,
      paneerSize,
      paneerSize
    );
    const paneerMat = new THREE.MeshPhongMaterial({
      color: 0xfff2c7,
      specular: 0x999999,
      shininess: 5,
    });
    for (let i = 0; i < 40; i++) {
      const paneer = new THREE.Mesh(paneerGeom, paneerMat);
      const pos = randomPointInBowl(4, 2.0);
      paneer.position.set(pos.x, pos.y + 0.2, pos.z);
      paneer.rotation.y = Math.random() * Math.PI * 2;
      mainGroup.add(paneer);
    }

    // === 6) Veggies ===

    // 6a) Tomatoes: red spheres
    const tomatoGeom = new THREE.SphereGeometry(0.25, 12, 12);
    const tomatoMat = new THREE.MeshPhongMaterial({
      color: 0xe02b20,
      specular: 0x770000,
      shininess: 20,
    });
    for (let i = 0; i < 30; i++) {
      const tomato = new THREE.Mesh(tomatoGeom, tomatoMat);
      const pos = randomPointInBowl(4.3, 2.2);
      tomato.position.set(pos.x, pos.y + 0.2, pos.z);
      tomato.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mainGroup.add(tomato);
    }

    // 6b) Broccoli: green "florets" as slightly lumpy clusters
    const broccoliMat = new THREE.MeshPhongMaterial({
      color: 0x2e8b57,
      specular: 0x226622,
      shininess: 15,
    });
    for (let i = 0; i < 25; i++) {
      const floretGroup = new THREE.Group();
      const numBumps = 10 + Math.floor(Math.random() * 6);
      for (let j = 0; j < numBumps; j++) {
        const bump = new THREE.Mesh(
          new THREE.SphereGeometry(0.18, 8, 8),
          broccoliMat
        );
        const offset = new THREE.Vector3(
          (Math.random() - 0.5) * 0.45,
          (Math.random() - 0.5) * 0.45,
          (Math.random() - 0.5) * 0.45
        );
        bump.position.copy(offset);
        floretGroup.add(bump);
      }
      const center = randomPointInBowl(4.1, 2.1);
      floretGroup.position.set(center.x, center.y + 0.25, center.z);
      floretGroup.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mainGroup.add(floretGroup);
    }

    // 6c) Carrots: orange cylinders
    const carrotGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 8);
    const carrotMat = new THREE.MeshPhongMaterial({
      color: 0xff8c00,
      specular: 0xaa5500,
      shininess: 10,
    });
    for (let i = 0; i < 30; i++) {
      const carrot = new THREE.Mesh(carrotGeom, carrotMat);
      const pos = randomPointInBowl(4.3, 2.2);
      carrot.position.set(pos.x, pos.y + 0.35, pos.z);
      carrot.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mainGroup.add(carrot);
    }

    // 6d) Peas: small green spheres
    const peaGeom = new THREE.SphereGeometry(0.08, 6, 6);
    const peaMat = new THREE.MeshPhongMaterial({
      color: 0x9acd32,
      specular: 0x669922,
      shininess: 8,
    });
    for (let i = 0; i < 100; i++) {
      const pea = new THREE.Mesh(peaGeom, peaMat);
      const pos = randomPointInBowl(4.2, 2.3);
      pea.position.set(pos.x, pos.y + 0.1, pos.z);
      mainGroup.add(pea);
    }

    // 6e) Corn kernels: small yellow spheres
    const cornGeom = new THREE.SphereGeometry(0.08, 6, 6);
    const cornMat = new THREE.MeshPhongMaterial({
      color: 0xffe135,
      specular: 0xccaa00,
      shininess: 8,
    });
    for (let i = 0; i < 100; i++) {
      const corn = new THREE.Mesh(cornGeom, cornMat);
      const pos = randomPointInBowl(4.2, 2.3);
      corn.position.set(pos.x, pos.y + 0.1, pos.z);
      mainGroup.add(corn);
    }

    // 6f) Onion rings: white torus shapes
    const onionGeom = new THREE.TorusGeometry(0.3, 0.07, 8, 16);
    const onionMat = new THREE.MeshPhongMaterial({
      color: 0xf5f5f5,
      specular: 0xaaaaaa,
      shininess: 15,
    });
    for (let i = 0; i < 20; i++) {
      const onion = new THREE.Mesh(onionGeom, onionMat);
      const pos = randomPointInBowl(4.0, 2.3);
      onion.position.set(pos.x, pos.y + 0.2, pos.z);
      onion.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mainGroup.add(onion);
    }

    // === 7) Mushrooms: off-white domed spheres ===
    const mushroomMat = new THREE.MeshPhongMaterial({
      color: 0xf0e68c,
      specular: 0x999966,
      shininess: 10,
    });
    const mushroomCapGeom = new THREE.SphereGeometry(0.2, 8, 8);
    for (let i = 0; i < 20; i++) {
      const cap = new THREE.Mesh(mushroomCapGeom, mushroomMat);
      const pos = randomPointInBowl(4.2, 2.3);
      cap.position.set(pos.x, pos.y + 0.2, pos.z);
      cap.scale.set(1, 0.6, 1); // flatten into a cap shape
      cap.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mainGroup.add(cap);
    }

    // === 8) Olives: small dark-green ellipsoids ===
    const oliveGeom = new THREE.SphereGeometry(0.12, 8, 8);
    oliveGeom.scale(1, 0.8, 0.6);
    const oliveMat = new THREE.MeshPhongMaterial({
      color: 0x556b2f,
      specular: 0x333311,
      shininess: 8,
    });
    for (let i = 0; i < 25; i++) {
      const olive = new THREE.Mesh(oliveGeom, oliveMat);
      const pos = randomPointInBowl(4.1, 2.3);
      olive.position.set(pos.x, pos.y + 0.15, pos.z);
      olive.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mainGroup.add(olive);
    }

    // === 9) Chili peppers: red curved cylinders ===
    const chiliMaterial = new THREE.MeshPhongMaterial({
      color: 0xff4500,
      specular: 0x771100,
      shininess: 12,
    });
    for (let i = 0; i < 20; i++) {
      // approximate pepper with a bent cylinder section:
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.2, 0.1, 0),
        new THREE.Vector3(0.4, 0.05, 0),
        new THREE.Vector3(0.6, 0, 0),
      ]);
      const chiliGeom = new THREE.TubeGeometry(curve, 16, 0.06, 8, false);
      const chili = new THREE.Mesh(chiliGeom, chiliMaterial);
      const pos = randomPointInBowl(4.2, 2.3);
      chili.position.set(pos.x, pos.y + 0.15, pos.z);
      chili.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mainGroup.add(chili);
    }

    // === Animate (with slight slow rotation) ===
    let reqId;
    const animate = () => {
      controls.update();
      mainGroup.rotation.y += 0.001; // slow auto-rotate
      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };
    animate();

    // === Handle Resize ===
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // === Cleanup on Unmount ===
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100vh", overflow: "hidden" }}
    >
      <canvas
        id="bowlcanvas"
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default Bowl3D;
