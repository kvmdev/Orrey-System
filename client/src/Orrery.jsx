import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import SolarSystem from "../src/SolarSystem";
import { PerspectiveCamera, OrbitControls, Text } from '@react-three/drei';
import axios from 'axios';
import { Vector3 } from 'three';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {  useTexture } from '@react-three/drei'; 
import Moons from './Moons';

const planets = [
    { name: "Mercurio", perihelion: 0.3075, aphelion: 0.4667, eccentricity: 0.2056, inclination: 7.00, period: 0.24, color: 'gray', size: 4880 ,texture:'https://cdn.discordapp.com/attachments/1228539522828992574/1291971698249171014/gltf_embedded_0.png?ex=670209e8&is=6700b868&hm=d46e9995bc11f51b541c604a695041ac1cf7b7c8aeb1130e69600e470b98502f&' },
    { name: "Venus", perihelion: 0.7184, aphelion: 0.7282, eccentricity: 0.0068, inclination: 3.39, period: 0.62, color: 'yellow', size: 12104 ,texture:'https://cdn.discordapp.com/attachments/1228539522828992574/1291973584943714364/gltf_embedded_0-min.png?ex=67020baa&is=6700ba2a&hm=5c486c9a2ab67b86be205dfa15f78605afadcdedda31af2c4b9269ab862ada31&'},
    { name: "Tierra", perihelion: 0.9833, aphelion: 1.0167, eccentricity: 0.0167, inclination: 0.00, period: 1.00, color: 'blue', size: 12742 ,texture:'https://cdn.discordapp.com/attachments/1228539522828992574/1291964160262803560/EarthMapAtmos_2500x1250.jpg?ex=670202e3&is=6700b163&hm=46a204564633a18fa82284320f4184850f6ffa31fd3a87fc65325f339c644bc0&' },
    { name: "Marte", perihelion: 1.3814, aphelion: 1.6660, eccentricity: 0.0934, inclination: 1.85, period: 1.88, color: 'red', size: 6779 ,texture:'https://cdn.discordapp.com/attachments/1228539522828992574/1291968235578855455/MarsMap_2500x1250.jpg?ex=670206ae&is=6700b52e&hm=9c7e74f27d77d750552b725a583cfb9b795042cff9055c635e724391c209d6c5&'},
    { name: "Jupiter", perihelion: 4.9501, aphelion: 5.4588, eccentricity: 0.0484, inclination: 1.30, period: 11.86, color: 'orange', size: 139820 ,texture:'https://cdn.discordapp.com/attachments/1228539522828992574/1291968235247370251/jupiter.jpg?ex=670206ae&is=6700b52e&hm=914951717a463ebc0b63a78dfb7c309d9eec05de6422f4698a59ad38fed30e20&'},
    { name: "Saturno", perihelion: 9.0481, aphelion: 10.1238, eccentricity: 0.0565, inclination: 2.49, period: 29.46, color: 'yellow', size: 116460,texture:'https://cdn.discordapp.com/attachments/1228539522828992574/1291968235914137651/saturn.jpg?ex=670206af&is=6700b52f&hm=b21415cf526695931d4b3b5eb976b0966195057cd8156641e7e4967ec1c76b79&' },
    { name: "Urano", perihelion: 18.3753, aphelion: 20.0899, eccentricity: 0.0464, inclination: 0.77, period: 84.01, color: 'blue', size: 50724,texture:'https://cdn.discordapp.com/attachments/1228539522828992574/1291978703487893565/URANO_baseColor.jpeg?ex=6702106e&is=6700beee&hm=42b3846bc278c993286a7a62f8d8633c19e496b3914a8087283f4bb12271a190&' },
    { name: "Neptuno", perihelion: 29.7710, aphelion: 30.3315, eccentricity: 0.0086, inclination: 1.77, period: 164.8, color: 'cyan', size: 49244,texture:'https://cdn.discordapp.com/attachments/1228539522828992574/1291978191979810856/Mat.1_baseColor.jpeg?ex=67020ff4&is=6700be74&hm=919cd5f1314d2a959a18f3a848043c36dc059de6ab70ad0aa65cc413eb739f2f&' }
];

const Orrery = ({ showSunLabels, showPlanetLabels, showAsteroidLabels, showPlanetTrails, showAsteroidTrails, onPlay, onPass, onBack, handlePlanetClick}) => {
    const [asteroids, setAsteroids] = useState([]);
    const cameraRef = useRef();

    // Componente para la Luna
    

    const Planet = ({ perihelion, aphelion, eccentricity, inclination, period, color, size, name,textures, showPlanetLabels, handlePlanetClick}) => {
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
                <mesh onPointerDown={()=>{handlePlanetClick(name)}} ref={ref} position={[semiMajorAxis / 1000, 0, 0]}>
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
                const response = await axios.get('//data.nasa.gov/resource/b67r-rgxc.json');
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
                    handlePlanetClick={handlePlanetClick}
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
