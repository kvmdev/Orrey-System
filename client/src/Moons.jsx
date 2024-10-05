import React, {  useRef } from 'react';
import { Vector3 } from 'three';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function Moons({ planetRef, showMoonOrbit }) {
    const moonRef = useRef();
    const moonOrbitRadius = 0.00257 * 20; // Ajustamos la escala de la órbita lunar (aumentamos)
    const moonPeriod = 27.3 / 365.25; // Periodo de órbita de la Luna en años

    // Generar puntos de la órbita de la Luna
    const createOrbitPoints = (orbitRadius, numPoints = 100) => {
        const points = [];
        for (let i = 0; i <= numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const x = orbitRadius * Math.cos(angle);
            const y = orbitRadius * Math.sin(angle);
            points.push(new Vector3(x, y, 0));
        }
        return points;
    };

    const moonOrbitPoints = createOrbitPoints(moonOrbitRadius);

    useFrame(({ clock }) => {
        if (planetRef.current) {
            const time = clock.getElapsedTime();
            const angularVelocity = (2 * Math.PI) / moonPeriod;
            const angle = time * angularVelocity;

            // Posición de la Luna en relación con la Tierra
            const x = planetRef.current.position.x + moonOrbitRadius * Math.cos(angle);
            const y = planetRef.current.position.y + moonOrbitRadius * Math.sin(angle);
            const z = planetRef.current.position.z;

            moonRef.current.position.set(x, y, z);
        }
    });
    //console.log(planetRef, showMoonOrbit )
    return (
        <>
            {showMoonOrbit && <Line points={moonOrbitPoints} color="red" lineWidth={5} />} {/* Dibuja la órbita */}
            <mesh ref={moonRef} position={[moonOrbitRadius, 0, 0]}>
                <sphereGeometry args={[0.001, 16, 16]} /> {/* Ajustamos el tamaño de la Luna */}
                <meshBasicMaterial color="gray" />
            </mesh>
        </>
    );


}

export default Moons