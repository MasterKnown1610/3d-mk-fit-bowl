import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const DynamicBowl3D = ({ selectedItems = [] }) => {
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

    // === Item definitions ===
    const itemDefinitions = {
      // Base items
      "brown-rice": {
        geometry: () => {
          const geom = new THREE.SphereGeometry(0.07, 6, 6);
          geom.scale(1, 0.35, 1);
          return geom;
        },
        material: new THREE.MeshPhongMaterial({
          color: 0x8b4513,
          specular: 0xdddddd,
          shininess: 10,
        }),
        count: 8000,
        maxRadius: 4.5,
        maxHeight: 2.5,
      },
      "red-rice": {
        geometry: () => {
          const geom = new THREE.SphereGeometry(0.07, 6, 6);
          geom.scale(1, 0.35, 1);
          return geom;
        },
        material: new THREE.MeshPhongMaterial({
          color: 0xdc143c,
          specular: 0xdddddd,
          shininess: 10,
        }),
        count: 8000,
        maxRadius: 4.5,
        maxHeight: 2.5,
      },
      "cauliflower-rice": {
        geometry: () => {
          const geom = new THREE.SphereGeometry(0.06, 6, 6);
          geom.scale(1, 0.3, 1);
          return geom;
        },
        material: new THREE.MeshPhongMaterial({
          color: 0xf5f5dc,
          specular: 0xdddddd,
          shininess: 10,
        }),
        count: 6000,
        maxRadius: 4.5,
        maxHeight: 2.5,
      },
      bajra: {
        geometry: () => {
          const geom = new THREE.SphereGeometry(0.08, 6, 6);
          geom.scale(1, 0.4, 1);
          return geom;
        },
        material: new THREE.MeshPhongMaterial({
          color: 0xdaa520,
          specular: 0xdddddd,
          shininess: 10,
        }),
        count: 5000,
        maxRadius: 4.5,
        maxHeight: 2.5,
      },
      "ragi-ball": {
        geometry: () => new THREE.SphereGeometry(0.3, 12, 12),
        material: new THREE.MeshPhongMaterial({
          color: 0x8b4513,
          specular: 0xdddddd,
          shininess: 10,
        }),
        count: 15,
        maxRadius: 4.0,
        maxHeight: 2.0,
      },

      // Protein items
      paneer: {
        geometry: () => new THREE.BoxGeometry(0.28, 0.28, 0.28),
        material: new THREE.MeshPhongMaterial({
          color: 0xfff2c7,
          specular: 0x999999,
          shininess: 5,
        }),
        count: 40,
        maxRadius: 4.0,
        maxHeight: 2.0,
      },
      chicken: {
        geometry: () => new THREE.SphereGeometry(0.24, 8, 8),
        material: new THREE.MeshPhongMaterial({
          color: 0xd2691e,
          specular: 0x333333,
          shininess: 10,
        }),
        count: 60,
        maxRadius: 4.2,
        maxHeight: 2.2,
      },
      tofu: {
        geometry: () => new THREE.BoxGeometry(0.25, 0.25, 0.25),
        material: new THREE.MeshPhongMaterial({
          color: 0xf5f5f5,
          specular: 0x999999,
          shininess: 5,
        }),
        count: 35,
        maxRadius: 4.0,
        maxHeight: 2.0,
      },
      fish: {
        geometry: () => {
          const geom = new THREE.SphereGeometry(0.2, 8, 8);
          geom.scale(1.6, 0.4, 0.6);
          return geom;
        },
        material: new THREE.MeshPhongMaterial({
          color: 0xb0c4de,
          specular: 0xaaaaaa,
          shininess: 20,
        }),
        count: 50,
        maxRadius: 4.0,
        maxHeight: 2.2,
      },
      rajma: {
        geometry: () => new THREE.SphereGeometry(0.15, 8, 8),
        material: new THREE.MeshPhongMaterial({
          color: 0x8b0000,
          specular: 0x333333,
          shininess: 10,
        }),
        count: 80,
        maxRadius: 4.2,
        maxHeight: 2.2,
      },
      eggs: {
        geometry: () => {
          const geom = new THREE.SphereGeometry(0.2, 8, 8);
          geom.scale(1.2, 0.8, 1.2);
          return geom;
        },
        material: new THREE.MeshPhongMaterial({
          color: 0xfffacd,
          specular: 0x999999,
          shininess: 5,
        }),
        count: 25,
        maxRadius: 4.0,
        maxHeight: 2.0,
      },
      sprouts: {
        geometry: () => {
          const geom = new THREE.SphereGeometry(0.08, 6, 6);
          geom.scale(1, 1.5, 1);
          return geom;
        },
        material: new THREE.MeshPhongMaterial({
          color: 0x90ee90,
          specular: 0x333333,
          shininess: 10,
        }),
        count: 120,
        maxRadius: 4.5,
        maxHeight: 2.5,
      },

      // Veggies
      brinjal: {
        geometry: () => {
          const geom = new THREE.SphereGeometry(0.25, 12, 12);
          geom.scale(1, 1.3, 1);
          return geom;
        },
        material: new THREE.MeshPhongMaterial({
          color: 0x4b0082,
          specular: 0x333333,
          shininess: 10,
        }),
        count: 20,
        maxRadius: 4.3,
        maxHeight: 2.2,
      },
      spinach: {
        geometry: () => {
          const geom = new THREE.SphereGeometry(0.15, 8, 8);
          geom.scale(1, 0.3, 1);
          return geom;
        },
        material: new THREE.MeshPhongMaterial({
          color: 0x228b22,
          specular: 0x333333,
          shininess: 10,
        }),
        count: 100,
        maxRadius: 4.5,
        maxHeight: 2.5,
      },
      drumstick: {
        geometry: () => {
          const geom = new THREE.SphereGeometry(0.2, 8, 8);
          geom.scale(1, 1.5, 1);
          return geom;
        },
        material: new THREE.MeshPhongMaterial({
          color: 0x32cd32,
          specular: 0x333333,
          shininess: 10,
        }),
        count: 30,
        maxRadius: 4.2,
        maxHeight: 2.2,
      },
      "cabbage-carrot": {
        geometry: () => new THREE.SphereGeometry(0.18, 8, 8),
        material: new THREE.MeshPhongMaterial({
          color: 0xff6347,
          specular: 0x333333,
          shininess: 10,
        }),
        count: 40,
        maxRadius: 4.3,
        maxHeight: 2.2,
      },
      "mixed-veg": {
        geometry: () => new THREE.SphereGeometry(0.2, 8, 8),
        material: new THREE.MeshPhongMaterial({
          color: 0xffd700,
          specular: 0x333333,
          shininess: 10,
        }),
        count: 35,
        maxRadius: 4.3,
        maxHeight: 2.2,
      },

      // Fats
      ghee: {
        geometry: () => new THREE.SphereGeometry(0.1, 8, 8),
        material: new THREE.MeshPhongMaterial({
          color: 0xffd700,
          specular: 0x999999,
          shininess: 30,
        }),
        count: 50,
        maxRadius: 4.5,
        maxHeight: 2.5,
      },
      "olive-oil": {
        geometry: () => new THREE.SphereGeometry(0.08, 8, 8),
        material: new THREE.MeshPhongMaterial({
          color: 0x808000,
          specular: 0x999999,
          shininess: 30,
        }),
        count: 60,
        maxRadius: 4.5,
        maxHeight: 2.5,
      },
      "coconut-oil": {
        geometry: () => new THREE.SphereGeometry(0.09, 8, 8),
        material: new THREE.MeshPhongMaterial({
          color: 0xf5deb3,
          specular: 0x999999,
          shininess: 30,
        }),
        count: 55,
        maxRadius: 4.5,
        maxHeight: 2.5,
      },

      // Addons
      "mint-chutney": {
        geometry: () => new THREE.SphereGeometry(0.12, 8, 8),
        material: new THREE.MeshPhongMaterial({
          color: 0x90ee90,
          specular: 0x333333,
          shininess: 10,
        }),
        count: 30,
        maxRadius: 4.5,
        maxHeight: 2.5,
      },
      "peanut-chutney": {
        geometry: () => new THREE.SphereGeometry(0.15, 8, 8),
        material: new THREE.MeshPhongMaterial({
          color: 0xd2691e,
          specular: 0x333333,
          shininess: 10,
        }),
        count: 25,
        maxRadius: 4.5,
        maxHeight: 2.5,
      },
      salad: {
        geometry: () => {
          const geom = new THREE.SphereGeometry(0.1, 6, 6);
          geom.scale(1, 0.2, 1);
          return geom;
        },
        material: new THREE.MeshPhongMaterial({
          color: 0x32cd32,
          specular: 0x333333,
          shininess: 10,
        }),
        count: 80,
        maxRadius: 4.5,
        maxHeight: 2.5,
      },
    };

    // === Render items based on selection ===
    selectedItems.forEach(({ category, item }) => {
      const itemDef = itemDefinitions[item.id];
      if (itemDef) {
        const { geometry, material, count, maxRadius, maxHeight } = itemDef;

        for (let i = 0; i < count; i++) {
          const mesh = new THREE.Mesh(geometry(), material);
          const pos = randomPointInBowl(maxRadius, maxHeight);
          mesh.position.set(pos.x, pos.y + 0.15, pos.z);
          mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          );

          // Add some random scaling for variety
          const scale = 0.8 + Math.random() * 0.4;
          mesh.scale.set(scale, scale, scale);

          mainGroup.add(mesh);
        }
      }
    });

    // === Animation loop ===
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // === Handle resize ===
    const handleResize = () => {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // === Cleanup ===
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [selectedItems]); // Re-render when selectedItems changes

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DynamicBowl3D;
