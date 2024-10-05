/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import SolarSystem from "../src/SolarSystem";
import { PerspectiveCamera, OrbitControls, Text } from '@react-three/drei';
import axios from 'axios';
import { Vector3 } from 'three';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {  useTexture } from '@react-three/drei'; 
import Moons from './Moons';

const Orrery = ({ showSunLabels, showPlanetLabels, showAsteroidLabels, showPlanetTrails, showAsteroidTrails, onPlay, onPass, onBack }) => {
    const [asteroids, setAsteroids] = useState([]);
    const cameraRef = useRef();
    const [planets, setPlanets] = useState([]);

    useEffect(()=> {
        const fetchData = async ()=> {
            try {
                const data = await axios.get('http://localhost:3000/api/planets');
                setPlanets(data.data.src_json);
            } catch (error) {
                console.log('there was an error', error);
            }
        }
        fetchData();
    }, [])

    // Componente para la Luna
    

    const Planet = ({ perihelion, aphelion, eccentricity, inclination, period, color, size, name,textures, showPlanetLabels }) => {
        const ref = useRef();
        const textRef = useRef();

        const semiMajorAxis = (perihelion + aphelion) / 2;
        const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - Math.pow(eccentricity, 2));
        const inclinationInRadians = (Math.PI / 180) * inclination;
        const texture = useTexture(textures);
        const createOrbitPoints = (semiMajorAxis, semiMinorAxis, inclination, numPoints = 100) => {
            const points = [];
            for (let i = 0; i <= numPoints; i++) {
                const angle = (i / numPoints) * Math.PI * 2;
                const x = (semiMajorAxis * 20) * Math.cos(angle);
                const y = (semiMinorAxis * 20) * Math.sin(angle);
                const z = (y * Math.sin(inclinationInRadians)) * 20;
                points.push(new Vector3(x, y, z));
            }
            return points;
        };

        const orbitPoints = createOrbitPoints(semiMajorAxis, semiMinorAxis, inclinationInRadians);

        useFrame(({ clock, camera }) => {
            const time = clock.getElapsedTime();
            let angularVelocity = (2 * Math.PI) / (period * 365.25);
            
            let angle = time * angularVelocity;
            if(!onPlay){angle = angle * 0}
            else if(!onBack && onPass){angle = angle * 200}
            else if(onBack && !onPass){angle = angle * -200}
            const x = (semiMajorAxis * 20) * Math.cos(angle);
            const y = (semiMinorAxis * 20) * Math.sin(angle);
            const z = (y * Math.sin(inclinationInRadians)) * 20;
            
            ref.current.position.set(x, y, z);

            if (textRef.current) {
                const offset = size / 15000 + 0.5;  // Ajuste del texto basado en el tamaño del planeta
                textRef.current.position.set(x + offset, y + offset, z + offset);
                textRef.current.lookAt(camera.position);
            }
        });
       
        return (
            <>
                {showPlanetTrails && (<Line points={orbitPoints} color={color} lineWidth={1} />)}
                <mesh ref={ref} position={[semiMajorAxis / 1000, 0, 0]}>
                    <sphereGeometry args={[size / 15000, 16, 16]} />
                    <meshBasicMaterial map={texture}  />
                </mesh>
                {showPlanetLabels && (
                    <Text
                        ref={textRef}
                        position={[semiMajorAxis / 1000 + 0.5, 0.5, 0.5]}
                        fontSize={size / 15000}
                        color={color}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {name}
                    </Text>
                )}
                <Moons planetRef={ref} showMoonOrbit={showPlanetTrails} />
                
                 
            </>
        );
    };

    useEffect(() => {
        const handleWheel = (event) => {
            if (cameraRef.current) {
                cameraRef.current.position.z += event.deltaY * 0.01;
                cameraRef.current.position.z = Math.max(cameraRef.current.position.z, 5);
                cameraRef.current.position.z = Math.min(cameraRef.current.position.z, 50);
            }
        };

        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    useEffect(() => {
        const fetchAsteroids = async () => {
            try {
                const response = await axios.get('https://data.nasa.gov/resource/b67r-rgxc.json');
                setAsteroids(response.data);
            } catch (error) {
                console.error('Error fetching asteroid data:', error);
            }
        };

        fetchAsteroids();
    }, []);

    return (
        <Canvas style={{ height: '100vh', width: '100vw' }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <PerspectiveCamera makeDefault position={[0, 5, 20]} fov={75} />
            <OrbitControls />
            <SolarSystem
                onPlay={onPlay}
                asteroids={asteroids}
                showAsteroidLabels={showAsteroidLabels}
                showAsteroidTrails={showAsteroidTrails}
                showSunLabels={showSunLabels}
            />
            {planets.map((planet, index) => (
                <Planet
                    textures={planet.texture}
                    key={index}
                    perihelion={planet.perihelion}
                    aphelion={planet.aphelion}
                    eccentricity={planet.eccentricity}
                    inclination={planet.inclination}
                    period={planet.period}
                    color={planet.color}
                    size={planet.size}
                    name={planet.name}
                    showPlanetLabels={showPlanetLabels}
                />
            ))}
        </Canvas>
    );
};

export default Orrery;
