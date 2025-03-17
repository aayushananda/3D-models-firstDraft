"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { gsap } from "gsap";
import { useEffect } from "react";

function Box() {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        y: 1,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      });
    }
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="w-full h-[100vh]">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Box />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
