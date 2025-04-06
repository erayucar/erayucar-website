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
      const z = (Math.random() - 0.5) * 15;
      const scale = 0.02 + Math.random() * 0.15;
      const color = Math.random() > 0.6 ? "#915EFF" : Math.random() > 0.5 ? "#ff5e91" : "#5eadff";
      temp.push({ 
        position: [x, y, z] as [number, number, number],
        scale,
        color
      });
    }
    return temp;
  }, [count]);

  return (
    <group>
      {particles.map((particle, i) => (
        <Float 
          key={i} 
          speed={0.5 + Math.random() * 2}
          rotationIntensity={0.5}
          floatIntensity={0.8}
          floatingRange={[-0.5, 0.5]}
        >
          <mesh position={particle.position}>
            <sphereGeometry args={[particle.scale, 24, 24]} />
            <meshPhysicalMaterial 
              color={particle.color} 
              emissive={particle.color}
              emissiveIntensity={0.7}
              roughness={0.2}
              metalness={0.9}
              clearcoat={0.5}
              clearcoatRoughness={0.2}
              envMapIntensity={0.8}
            />
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
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
        <fog attach="fog" args={["#050505", 5, 25]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color="#915EFF" intensity={2} />
        <pointLight position={[10, -5, -15]} color="#5eadff" intensity={1.5} />
        
        <AnimatedSphere />
        <Particles count={200} />
        
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