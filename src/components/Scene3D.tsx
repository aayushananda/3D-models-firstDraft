"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  useAspect,
  Stars,
} from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";

function FloatingObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [vpWidth, vpHeight] = useAspect(window.innerWidth, window.innerHeight);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.y = 0;
    }
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;

      // Scale effect when clicked
      if (clicked) {
        meshRef.current.scale.x = THREE.MathUtils.lerp(
          meshRef.current.scale.x,
          1.5,
          0.1
        );
        meshRef.current.scale.y = THREE.MathUtils.lerp(
          meshRef.current.scale.y,
          1.5,
          0.1
        );
        meshRef.current.scale.z = THREE.MathUtils.lerp(
          meshRef.current.scale.z,
          1.5,
          0.1
        );
      } else {
        meshRef.current.scale.x = THREE.MathUtils.lerp(
          meshRef.current.scale.x,
          1,
          0.1
        );
        meshRef.current.scale.y = THREE.MathUtils.lerp(
          meshRef.current.scale.y,
          1,
          0.1
        );
        meshRef.current.scale.z = THREE.MathUtils.lerp(
          meshRef.current.scale.z,
          1,
          0.1
        );
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial
        color={hovered ? "#ff00ff" : "#00aaff"}
        roughness={0.3}
        metalness={0.7}
        envMapIntensity={1}
      />
    </mesh>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#303030" roughness={0.8} metalness={0.2} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-screen">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={["#000"]} />
        <fog attach="fog" args={["#000", 10, 50]} />

        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          {/* Environment and scene setup */}
          <Environment preset="sunset" />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          <FloatingObject />
          <Ground />

          {/* Controls */}
          <OrbitControls
            makeDefault
            minPolarAngle={Math.PI * 0.1}
            maxPolarAngle={Math.PI * 0.9}
            enableZoom={true}
            enablePan={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
