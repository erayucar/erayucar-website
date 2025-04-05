"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { Mesh } from "three";

const Particles = ({ count = 100 }) => {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.push({ position: [x, y, z] as [number, number, number] });
    }
    return temp;
  }, [count]);

  return (
    <group>
      {particles.map((particle, i) => (
        <Float 
          key={i} 
          speed={0.5 + Math.random() * 2}
          rotationIntensity={0.2}
          floatIntensity={0.2}
        >
          <mesh position={particle.position}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#915EFF" emissive="#915EFF" emissiveIntensity={0.5} />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const AnimatedSphere = () => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <Sphere args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#915EFF"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>
    </mesh>
  );
};

export default function ThreeBG() {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#915EFF" intensity={1} />
        
        <AnimatedSphere />
        <Particles count={150} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}