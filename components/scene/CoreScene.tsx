"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, ContactShadows, Environment, Float, MeshTransmissionMaterial, PerspectiveCamera, Text } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { skills } from "@/data/portfolio";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import { useMouseVector } from "@/hooks/useMouseVector";

type CoreSceneProps = {
  progress: number;
  hoveredSkill: string | null;
};

export function CoreScene({ progress, hoveredSkill }: CoreSceneProps) {
  const quality = useAdaptiveQuality();

  return (
    <Canvas
      dpr={quality.dpr}
      gl={{ antialias: !quality.isCompact, alpha: true, powerPreference: "high-performance" }}
      className="core-canvas"
    >
      <PerspectiveCamera makeDefault position={[0, 0.2, quality.isCompact ? 8.4 : 7.2]} fov={quality.isCompact ? 48 : 42} />
      <Suspense fallback={null}>
        <color attach="background" args={["#030303"]} />
        <fog attach="fog" args={["#030303", 8, 18]} />
        <ambientLight intensity={0.34} />
        <pointLight position={[4, 3, 5]} color="#0072c6" intensity={quality.isCompact ? 20 : 32} />
        <pointLight position={[-3, -1.5, 3]} color="#00ff41" intensity={quality.isCompact ? 6 : 9} />
        <SceneRig progress={progress} hoveredSkill={hoveredSkill} segments={quality.segments} samples={quality.transmissionSamples} />
        {quality.shadows ? <ContactShadows position={[0, -2.8, 0]} opacity={0.32} scale={8} blur={2.7} far={5} /> : null}
        {!quality.isCompact ? <Environment preset="city" /> : null}
      </Suspense>
    </Canvas>
  );
}

function SceneRig({
  progress,
  hoveredSkill,
  segments,
  samples
}: CoreSceneProps & {
  segments: number;
  samples: number;
}) {
  const group = useRef<THREE.Group>(null);
  const mouse = useMouseVector();
  const { viewport } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, progress * Math.PI * 2.3 + mouse.current.x * 0.08, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.18 + mouse.current.y * 0.05, 0.05);
    group.current.position.y = Math.sin(time * 0.45) * 0.08;
    group.current.scale.setScalar(viewport.width < 5 ? 0.72 : 1);
  });

  return (
    <group ref={group}>
      <BlueprintRings progress={progress} />
      <CoreShell progress={progress} hoveredSkill={hoveredSkill} segments={segments} samples={samples} />
      <OrbitingSkills progress={progress} hoveredSkill={hoveredSkill} />
      <DataPillar progress={progress} />
      <HologramViewport progress={progress} />
      <GridField progress={progress} />
    </group>
  );
}

function CoreShell({
  progress,
  hoveredSkill,
  segments,
  samples
}: CoreSceneProps & {
  segments: number;
  samples: number;
}) {
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const bloom = hoveredSkill ? 1.55 : 1;
  const expansion = THREE.MathUtils.smoothstep(progress, 0.16, 0.56);
  const reassemble = THREE.MathUtils.smoothstep(progress, 0.9, 1);
  const explode = Math.sin(Math.min(1, expansion) * Math.PI);
  const finalScale = 1 + reassemble * 0.25;

  const chips = useMemo(() => Array.from({ length: 14 }, (_, index) => index), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (shell.current) {
      shell.current.rotation.z = time * 0.08;
      shell.current.scale.setScalar((1 + Math.sin(time * 1.4) * 0.018 + explode * 0.14) * finalScale);
    }
    if (ringA.current) {
      ringA.current.rotation.x = Math.PI / 2 + time * 0.17;
      ringA.current.rotation.z = time * 0.1;
    }
    if (ringB.current) {
      ringB.current.rotation.y = Math.PI / 2 + time * 0.12;
      ringB.current.rotation.x = time * 0.08;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.24}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.22, segments]} />
        <MeshTransmissionMaterial
          backside
          samples={samples}
          thickness={0.38}
          roughness={0.08}
          transmission={0.82}
          chromaticAberration={0.08}
          anisotropicBlur={0.18}
          color="#d9f0ff"
          attenuationColor="#0072c6"
          attenuationDistance={1.5}
          distortion={0.16 + explode * 0.2}
          distortionScale={0.2}
          temporalDistortion={0.12}
        />
      </mesh>
      <mesh scale={1.236}>
        <icosahedronGeometry args={[1.22, 2]} />
        <meshStandardMaterial
          color="#d8ecff"
          emissive="#0072c6"
          emissiveIntensity={0.38 + explode * 0.45}
          metalness={0.82}
          roughness={0.16}
          wireframe
          transparent
          opacity={0.36}
        />
      </mesh>
      <mesh scale={0.32 + explode * 0.12}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#d7efff"
          emissive="#0072c6"
          emissiveIntensity={1.45 * bloom}
          metalness={0.35}
          roughness={0.08}
          transparent
          opacity={0.58}
        />
      </mesh>
      <mesh ref={ringA} scale={[1.62 + explode * 0.7, 1.62 + explode * 0.7, 0.02]}>
        <torusGeometry args={[1, 0.01, 16, 180]} />
        <meshStandardMaterial color="#aee1ff" emissive="#0072c6" emissiveIntensity={1.8 * bloom} metalness={0.8} roughness={0.18} />
      </mesh>
      <mesh ref={ringB} scale={[1.9 + explode * 0.45, 1.9 + explode * 0.45, 0.02]}>
        <torusGeometry args={[1, 0.006, 16, 180]} />
        <meshStandardMaterial color="#b9ffcc" emissive="#00ff41" emissiveIntensity={0.9 * bloom} metalness={0.9} roughness={0.12} />
      </mesh>
      {chips.map((index) => {
        const angle = (index / chips.length) * Math.PI * 2;
        const radius = 0.46 + explode * (0.88 + (index % 3) * 0.12);
        return (
          <mesh key={index} position={[Math.cos(angle) * radius, Math.sin(angle * 1.7) * 0.24, Math.sin(angle) * radius]} rotation={[0, angle, angle * 0.35]}>
            <boxGeometry args={[0.18, 0.035, 0.3]} />
            <meshStandardMaterial
              color={index % 2 ? "#0b1f2d" : "#0c1412"}
              emissive={index % 2 ? "#0072c6" : "#00ff41"}
              emissiveIntensity={0.22 + explode * 0.9}
              metalness={0.88}
              roughness={0.22}
            />
          </mesh>
        );
      })}
    </Float>
  );
}

function OrbitingSkills({ progress, hoveredSkill }: CoreSceneProps) {
  const visible = THREE.MathUtils.smoothstep(progress, 0.28, 0.42) * (1 - THREE.MathUtils.smoothstep(progress, 0.68, 0.78));
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.12;
    group.current.visible = visible > 0.03;
  });

  return (
    <group ref={group} scale={visible}>
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 2.4 + (index % 2) * 0.45;
        const glow = hoveredSkill === skill.name ? 2.6 : 0.7;
        return (
          <group key={skill.name} position={[Math.cos(angle) * radius, Math.sin(index) * 0.54, Math.sin(angle) * radius]}>
            <mesh>
              <sphereGeometry args={[0.105, 18, 18]} />
              <meshStandardMaterial
                color={skill.tone === "green" ? "#00ff41" : skill.tone === "blue" ? "#0072c6" : "#f3f7ff"}
                emissive={skill.tone === "green" ? "#00ff41" : "#0072c6"}
                emissiveIntensity={glow}
                metalness={0.5}
                roughness={0.18}
              />
            </mesh>
            <Billboard position={[0, -0.28, 0]} follow>
              <Text fontSize={0.12} color="#f6fbff" anchorX="center" anchorY="middle" outlineWidth={0.002} outlineColor="#030303">
                {skill.name}
              </Text>
            </Billboard>
          </group>
        );
      })}
    </group>
  );
}

function DataPillar({ progress }: { progress: number }) {
  const visible = THREE.MathUtils.smoothstep(progress, 0.64, 0.78) * (1 - THREE.MathUtils.smoothstep(progress, 0.82, 0.92));

  return (
    <group scale={[visible, visible, visible]}>
      {Array.from({ length: 9 }).map((_, index) => (
        <mesh key={index} position={[0, (index - 4) * 0.32, 0]} rotation={[0, index * 0.38, 0]}>
          <boxGeometry args={[1.75 - index * 0.055, 0.025, 1.75 - index * 0.055]} />
          <meshStandardMaterial
            color="#111820"
            emissive={index % 3 === 0 ? "#0072c6" : "#00ff41"}
            emissiveIntensity={0.2 + visible * 0.8}
            metalness={0.9}
            roughness={0.17}
            transparent
            opacity={0.78}
          />
        </mesh>
      ))}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3.4, 32]} />
        <meshStandardMaterial color="#c8f0ff" emissive="#0072c6" emissiveIntensity={1.6} />
      </mesh>
    </group>
  );
}

function HologramViewport({ progress }: { progress: number }) {
  const visible = THREE.MathUtils.smoothstep(progress, 0.74, 0.91);

  return (
    <group position={[0, 0, -0.15]} scale={visible}>
      <mesh>
        <boxGeometry args={[2.9, 1.55, 0.04]} />
        <meshStandardMaterial color="#07121b" emissive="#0072c6" emissiveIntensity={0.35} metalness={0.7} roughness={0.12} transparent opacity={0.62} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[2.64, 1.26, 16, 8]} />
        <meshBasicMaterial color="#00ff41" wireframe transparent opacity={0.24} />
      </mesh>
    </group>
  );
}

function BlueprintRings({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const pulse = 0.25 + THREE.MathUtils.smoothstep(progress, 0.1, 0.3) * 0.25;

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <group ref={group}>
      {[2.7, 3.2, 3.75].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, index * 0.2]} scale={[radius, radius, 0.01]}>
          <torusGeometry args={[1, 0.0025, 8, 160]} />
          <meshBasicMaterial color={index === 1 ? "#00ff41" : "#0072c6"} transparent opacity={pulse / (index + 1.3)} />
        </mesh>
      ))}
    </group>
  );
}

function GridField({ progress }: { progress: number }) {
  const opacity = 0.16 + progress * 0.1;

  return (
    <group position={[0, -2.55, -1.4]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper args={[16, 42, "#0072c6", "#12222c"]}>
        <meshBasicMaterial attach="material" transparent opacity={opacity} />
      </gridHelper>
    </group>
  );
}
