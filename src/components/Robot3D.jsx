import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

// Placeholder Robot with automatic smooth lerp rotation
function PlaceholderRobot({ isBlinking }) {
    const meshRef = useRef();
    const lookTarget = useRef({ x: 0, y: 0 });

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Slowly move look target randomly
            lookTarget.current.x = THREE.MathUtils.lerp(lookTarget.current.x, Math.sin(state.clock.elapsedTime * 0.5) * 0.5, 0.05);
            lookTarget.current.y = THREE.MathUtils.lerp(lookTarget.current.y, Math.cos(state.clock.elapsedTime * 0.3) * 0.4, 0.05);

            const targetY = lookTarget.current.x;
            const targetX = lookTarget.current.y;

            meshRef.current.rotation.y = THREE.MathUtils.lerp(
                meshRef.current.rotation.y,
                targetY,
                0.08
            );

            meshRef.current.rotation.x = THREE.MathUtils.lerp(
                meshRef.current.rotation.x,
                -targetX,
                0.08
            );

            meshRef.current.rotation.z = THREE.MathUtils.lerp(
                meshRef.current.rotation.z,
                targetY * 0.1,
                0.05
            );

            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;

            meshRef.current.children.forEach((child, index) => {
                if (index >= 2) {
                    child.scale.y = THREE.MathUtils.lerp(
                        child.scale.y,
                        isBlinking ? 0.1 : 1,
                        0.4
                    );
                }
            });
        }
    });

    return (
        <group ref={meshRef}>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshStandardMaterial color="#00d4ff" metalness={0.6} roughness={0.2} />
            </mesh>
            <mesh position={[0, 1.2, 0]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#4ade80" metalness={0.8} roughness={0.1} />
            </mesh>
            <mesh position={[-0.2, 1.3, 0.4]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.2, 1.3, 0.4]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
}

// Robot Model with automatic smooth lerp rotation
function RobotModel({ modelPath, isBlinking }) {
    const gltf = useLoader(GLTFLoader, modelPath);
    const robotRef = useRef();
    const lookTarget = useRef({ x: 0, y: 0 });

    useFrame((state, delta) => {
        if (!robotRef.current) return;

        // Slowly move look target randomly
        lookTarget.current.x = THREE.MathUtils.lerp(lookTarget.current.x, Math.sin(state.clock.elapsedTime * 0.4) * 0.6, 0.05);
        lookTarget.current.y = THREE.MathUtils.lerp(lookTarget.current.y, Math.cos(state.clock.elapsedTime * 0.2) * 0.5, 0.05);

        const targetY = lookTarget.current.x;
        const targetX = lookTarget.current.y;

        robotRef.current.rotation.y = THREE.MathUtils.lerp(
            robotRef.current.rotation.y,
            targetY,
            0.08
        );

        robotRef.current.rotation.x = THREE.MathUtils.lerp(
            robotRef.current.rotation.x,
            -targetX,
            0.08
        );

        robotRef.current.rotation.z = THREE.MathUtils.lerp(
            robotRef.current.rotation.z,
            targetY * 0.1,
            0.05
        );

        robotRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;

        let hasEyes = false;
        robotRef.current.traverse((child) => {
            if (child.isMesh && child.name.toLowerCase().includes("eye")) {
                hasEyes = true;
                child.scale.y = THREE.MathUtils.lerp(
                    child.scale.y,
                    isBlinking ? 0.1 : 1,
                    0.4
                );
            }
        });

        if (!hasEyes) {
            const scale = isBlinking ? 0.65 : 0.7;
            robotRef.current.scale.set(
                THREE.MathUtils.lerp(robotRef.current.scale.x, scale, 0.4),
                THREE.MathUtils.lerp(robotRef.current.scale.y, scale, 0.4),
                THREE.MathUtils.lerp(robotRef.current.scale.z, scale, 0.4)
            );
        }
    });

    return (
        <primitive
            ref={robotRef}
            object={gltf.scene}
            scale={0.7}
        />
    );
}

export default function Robot3D({ modelPath = null }) {
    const [isBlinking, setIsBlinking] = useState(false);

    // Automatic blinking
    useEffect(() => {
        let timeoutId;
        const triggerBlink = () => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
            
            const nextBlink = 2000 + Math.random() * 5000;
            timeoutId = setTimeout(triggerBlink, nextBlink);
        };
        
        timeoutId = setTimeout(triggerBlink, 3000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{
                alpha: true,
                antialias: true,
                preserveDrawingBuffer: true
            }}
            style={{
                background: 'transparent',
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
            }}
        >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, 5, -5]} intensity={0.5} color="#4ade80" />
            <pointLight position={[10, -5, 5]} intensity={0.3} color="#00d4ff" />

            <Suspense fallback={null}>
                {modelPath ? (
                    <RobotModel
                        modelPath={modelPath}
                        isBlinking={isBlinking}
                    />
                ) : (
                    <PlaceholderRobot
                        isBlinking={isBlinking}
                    />
                )}
            </Suspense>
        </Canvas>
    );
}
