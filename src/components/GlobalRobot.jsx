import React, { useState, useEffect, useRef } from 'react';
import Robot3D from './Robot3D';

const GlobalRobot = () => {
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
    const animationFrameRef = useRef(null);

    // Smooth lerp animation for position
    useEffect(() => {
        const animate = () => {
            setPosition(prev => {
                const diffX = targetPosition.x - prev.x;
                const diffY = targetPosition.y - prev.y;

                // Lerp for smooth movement
                return {
                    x: prev.x + diffX * 0.08,
                    y: prev.y + diffY * 0.08
                };
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [targetPosition]);

    // Automatic movement logic
    useEffect(() => {
        let timeoutId;
        const moveToRandomPoint = () => {
            // Pick a random point on screen, but keep it somewhat away from edges
            const newX = 15 + Math.random() * 70; // 15% to 85%
            const newY = 15 + Math.random() * 70; // 15% to 85%
            setTargetPosition({ x: newX, y: newY });

            // Schedule next move
            const nextMoveDelay = 3000 + Math.random() * 4000; // 3 to 7 seconds
            timeoutId = setTimeout(moveToRandomPoint, nextMoveDelay);
        };

        timeoutId = setTimeout(moveToRandomPoint, 2000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div
            className="fixed pointer-events-none z-50"
            style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: `translate(-50%, -50%)`,
                width: '300px',
                height: '300px',
                transition: 'none'
            }}
        >
            <Robot3D modelPath="/robot.glb" />
        </div>
    );
};

export default GlobalRobot;
