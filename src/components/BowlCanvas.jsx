// import { Canvas } from "@react-three/fiber";
// import Bowl3D from "./Bowl3D";

// export function BowlCanvas() {
//   return (
//     <Canvas
//       camera={{
//         fov: 35,
//         near: 0.1,
//         far: 2000,
//         position: [2, 2, 4],
//         lookAt: [0, 0, 0],
//       }}
//       style={{
//         width: "100%",
//         height: "100%",
//         background: "transparent",
//       }}
//       shadows
//     >
//       {/* Main Lights */}
//       <ambientLight intensity={0.8} />
//       <spotLight
//         position={[3, 4, 3]}
//         angle={0.4}
//         penumbra={1}
//         intensity={1.2}
//         castShadow
//         shadow-mapSize={[1024, 1024]}
//       />

//       {/* Fill Lights */}
//       <pointLight position={[-3, 2, -3]} intensity={0.6} color="#4CAF50" />
//       <pointLight position={[0, 4, 0]} intensity={0.4} color="#FFD700" />

//       {/* Rim Light */}
//       <pointLight position={[0, 0, -3]} intensity={0.3} color="#FFFFFF" />

//       {/* 3D Model */}
//       <Bowl3D />
//     </Canvas>
//   );
// }
