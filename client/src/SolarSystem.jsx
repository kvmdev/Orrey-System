import React, { useRef } from 'react';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Line, Text, shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const G = 1.327e11; // Constante gravitacional del Sol en km^3/s^2
const AU_TO_KM = 1.496e8; // Conversión de AU a km

// Cinturón de asteroides entre Marte y Júpiter
const generateBeltAsteroids = (numAsteroids) => {
    const asteroids = [];
    for (let i = 0; i < numAsteroids; i++) {
        const perihelion = 2.1 + Math.random() * (3.3 - 2.1); // Entre 2.1 y 3.3 AU
        const aphelion = perihelion + Math.random() * 0.5; // Añadir un poco de variabilidad al aphelion
        const eccentricity = Math.random() * 0.2; // Excentricidad entre 0 y 0.2
        const inclination = Math.random() * 10; // Inclinación entre 0 y 10 grados
        const name = `p ${i + 1}`;

        asteroids.push({
            q_au_1: perihelion.toString(),
            q_au_2: aphelion.toString(),
            e: eccentricity.toString(),
            i_deg: inclination.toString(),
            object_name: name
        });
    }
    return asteroids;
};
const generateKuiperBeltAsteroids = (numAsteroids) => {
    const asteroids = [];
    for (let i = 0; i < numAsteroids; i++) {
        const perihelion = 30 + Math.random() * (55 - 30); // Entre 30 y 55 AU
        const aphelion = perihelion + Math.random() * 5;   // Variación de hasta 5 AU en el aphelion
        const eccentricity = Math.random() * 0.4;          // Excentricidad más alta, entre 0 y 0.4
        const inclination = Math.random() * 30;            // Inclinación más alta, entre 0 y 30 grados
        const name = `KBO ${i + 1}`;                       // KBO: Kuiper Belt Object

        asteroids.push({
            q_au_1: perihelion.toString(),
            q_au_2: aphelion.toString(),
            e: eccentricity.toString(),
            i_deg: inclination.toString(),
            object_name: name
        });
    }
    return asteroids;
};

const SolarSystem = ({ showAsteroidLabels, showSunLabels, showAsteroidTrails, onPlay, asteroids }) => {
    const beltAsteroids = generateBeltAsteroids(1000); // Asteroides del cinturón de asteroides
    const kuiperBeltAsteroids = generateKuiperBeltAsteroids(1000); // 30 objetos del cinturón de Kuiper

    const createOrbitPoints = (semiMajorAxis, semiMinorAxis, inclination, numPoints = 100) => {
        const points = [];
        for (let i = 0; i <= numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2; // De 0 a 2PI
            const x = semiMajorAxis * Math.cos(angle);
            const y = semiMinorAxis * Math.sin(angle);
            const z = y * Math.sin(inclination); // Incorporar la inclinación en Z
            points.push(new Vector3(x, y, z));
        }
        return points;
    };

    const calculateVelocity = (perihelion, eccentricity) => {
        const perihelionKm = perihelion * AU_TO_KM;
        const velocityPerihelion = Math.sqrt((G / perihelionKm) * ((1 + eccentricity) / (1 - eccentricity)));
        return velocityPerihelion;
    };

    return (
        <>
            {/* Añadimos el Sol en el centro del sistema solar */}
            <Sun showLabels={showSunLabels} />
            {asteroids.map((asteroid, index) => {
                const perihelion = parseFloat(asteroid.q_au_1); // Distancia mínima al sol
                const aphelion = parseFloat(asteroid.q_au_2);   // Distancia máxima al sol
                const semiMajorAxis = (perihelion + aphelion) / 2;
                const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - Math.pow(parseFloat(asteroid.e), 2)); // Excentricidad
                const inclination = (Math.PI / 180) * parseFloat(asteroid.i_deg); // Convertir grados a radianes

                // Calcular la velocidad orbital en el perihelio
                const velocity = calculateVelocity(perihelion, parseFloat(asteroid.e));
                const scaledAngularVelocity = velocity / 10000; // Escalar la velocidad para la visualización

                // Crear un ángulo inicial aleatorio para variar la posición de inicio del asteroide
                const initialPhase = Math.random() * Math.PI * 2; // Ángulo entre 0 y 2PI

                return (
                    <React.Fragment key={index}>
                        <Asteroid
                            showAsteroidTrails={showAsteroidTrails}
                            position={[perihelion, 0, 0]}
                            semiMajorAxis={semiMajorAxis}
                            semiMinorAxis={semiMinorAxis}
                            inclination={inclination}
                            angularVelocity={scaledAngularVelocity}
                            initialPhase={initialPhase}
                            randomZFactor={Math.random() * 5 - 2.5}
                            name={asteroid.object_name}
                            showLabels={showAsteroidLabels}
                            onPlay={onPlay}
                            color={'blue'} 
                            size={0.2}// Pasar la visibilidad de las etiquetas
                        />
                    </React.Fragment>
                );
            })}
            {/* Renderizamos los asteroides del cinturón de asteroides */}
            {beltAsteroids.map((asteroid, index) => {
                const perihelion = parseFloat(asteroid.q_au_1);
                const aphelion = parseFloat(asteroid.q_au_2);
                const semiMajorAxis = (perihelion + aphelion) / 2;
                const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - Math.pow(parseFloat(asteroid.e), 2));
                const inclination = (Math.PI / 180) * parseFloat(asteroid.i_deg);

                const velocity = calculateVelocity(perihelion, parseFloat(asteroid.e));
                const scaledAngularVelocity = velocity / 10000;
                const initialPhase = Math.random() * Math.PI * 2;

                return (
                    <React.Fragment key={index}>
                        <Asteroid
                            showAsteroidTrails={false}
                            position={[perihelion, 0, 0]}
                            semiMajorAxis={semiMajorAxis}
                            semiMinorAxis={semiMinorAxis}
                            inclination={inclination}
                            angularVelocity={scaledAngularVelocity}
                            initialPhase={initialPhase}
                            randomZFactor={Math.random() * 5 - 2.5}
                            name={asteroid.object_name}
                            showLabels={showAsteroidLabels}
                            onPlay={onPlay}
                            size={0.2}
                            color={'gray'} 
                        />
                    </React.Fragment>
                );
            })}

            {/* Renderizamos los asteroides del cinturón de Kuiper */}
            {kuiperBeltAsteroids.map((asteroid, index) => {
                const perihelion = parseFloat(asteroid.q_au_1);
                const aphelion = parseFloat(asteroid.q_au_2);
                const semiMajorAxis = (perihelion + aphelion) / 2;
                const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - Math.pow(parseFloat(asteroid.e), 2));
                const inclination = (Math.PI / 180) * parseFloat(asteroid.i_deg);

                const velocity = calculateVelocity(perihelion, parseFloat(asteroid.e));
                const scaledAngularVelocity = velocity / 10000;
                const initialPhase = Math.random() * Math.PI * 2;

                return (
                    <React.Fragment key={index}>
                        <Asteroid
                            showAsteroidTrails={false}
                            position={[perihelion, 0, 0]}
                            semiMajorAxis={semiMajorAxis}
                            semiMinorAxis={semiMinorAxis}
                            inclination={inclination}
                            angularVelocity={scaledAngularVelocity}
                            initialPhase={initialPhase}
                            randomZFactor={Math.random() * 5 - 2.5}
                            name={asteroid.object_name}
                            showLabels={showAsteroidLabels}
                            onPlay={onPlay}
                            size={2}
                            color={'gray'} 
                        />
                    </React.Fragment>
                );
            })}
        </>
    );
};

// Componente para representar el Sol
const Sun = ({ showLabels }) => {
    const textRef = useRef();
    const sunRadius = 696340 / 200000;  // Radio del Sol en la escala ajustada
    const textures = useTexture('https://cdn.discordapp.com/attachments/1228539522828992574/1291972930590343210/sun_diff.jpg_0.png?ex=67020b0e&is=6700b98e&hm=c44824fa215447ce1ab9af89af8b99886c2b1d58d32cfc242600310c38aa1144&');

    useFrame(({ camera }) => {
        if (textRef.current) {
            const offset = sunRadius + 0.9;  // Ajuste para colocar el texto fuera del radio del Sol
            textRef.current.position.set(0, offset, 0);  // Coloca el texto por encima del Sol

            // Suavizar el movimiento del texto con un `damp`
            textRef.current.lookAt(camera.position);
            textRef.current.quaternion.slerp(camera.quaternion, 0.1); // Suaviza el movimiento del texto
        }
    });

    return (
        <group>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[sunRadius, 32, 32]} /> {/* Ajusta el tamaño del Sol */}
                <meshBasicMaterial map={textures} color="yellow" />
            </mesh>
            {showLabels && (
                <Text
                    ref={textRef}
                    position={[0, sunRadius + 0.5, 0]}  // Posición inicial del texto, justo por encima del Sol
                    fontSize={2.0}  // Ajuste del tamaño del texto
                    color="yellow"
                    anchorX="center"
                    anchorY="middle"
                >
                    Sol
                </Text>
            )}
        </group>
    );
};

// (El componente del Asteroide sigue igual que en tu código anterior)
const AsteroidMaterial = shaderMaterial(
    // Uniforms (valores que puedes cambiar)
    { uTime: 0, uColor: new THREE.Color(0xffffff), uGlowIntensity: 2.0 },

    // Vertex Shader
    `
    uniform float uTime;
    varying vec2 vUv;
  
    void main() {
      vUv = uv;
      vec3 transformed = position;
      transformed.x += sin(uTime + position.y) * 0.1; // Pequeña variación en x para simular distorsión
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
    `,

    // Fragment Shader (con resplandor intenso)
    `
    uniform vec3 uColor;
    uniform float uGlowIntensity;
    varying vec2 vUv;
  
    void main() {
      // Calcular la distancia del centro
      float distanceFromCenter = length(vUv - vec2(0.5, 0.5));
  
      // Ajuste de brillo: cuanto más cerca del borde, mayor será el resplandor
      float glowFactor = 1.0 / (distanceFromCenter * uGlowIntensity + 0.1);
  
      // Color base (blanco brillante)
      vec3 baseColor = vec3(1.0, 1.0, 1.0);
  
      // Aumentamos el resplandor cuanto más cerca del borde (efecto "foco" intenso)
      vec3 glowColor = baseColor * glowFactor;
  
      // Mezclar el color del asteroide con el brillo
      vec3 finalColor = mix(uColor, glowColor, glowFactor);
  
      gl_FragColor = vec4(finalColor, 1.0);
    }
    `
);

// Extender para usar el nuevo shaderMaterial como componente
extend({ AsteroidMaterial });

const Asteroid = ({
    semiMajorAxis,
    semiMinorAxis,
    inclination,
    angularVelocity,
    randomZFactor,
    name,
    showLabels,
    showAsteroidTrails,
    onPlay,
    size,
    color
}) => {
    const ref = useRef();
    const textRef = useRef();

    // Ref para almacenar el ángulo actual
    const currentAngle = useRef(Math.random() * Math.PI * 2); // Inicializa con un ángulo aleatorio

    const createOrbitPoints = (semiMajorAxis, semiMinorAxis, inclination, numPoints = 50) => {
        const points = [];
        for (let i = 0; i <= numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const x = semiMajorAxis * 20 * Math.cos(angle);
            const y = semiMinorAxis * 20 * Math.sin(angle);
            const z = y * Math.sin(inclination);

            if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
                points.push(new Vector3(x, y, z));
            } else {
                console.error('NaN detected in orbit points:', { x, y, z });
            }
        }
        return points;
    };

    const orbitPoints = createOrbitPoints(semiMajorAxis, semiMinorAxis, inclination);

    useFrame(({ clock, camera }) => {
        const time = clock.getElapsedTime();

        if (onPlay) {
            // Reducimos la velocidad de los asteroides dividiendo por un factor, por ejemplo 10
            currentAngle.current += ((angularVelocity / 100)); // Velocidad reducida
        }

        // Calcular la nueva posición del asteroide en base al ángulo actual
        const angle = currentAngle.current;
        const x = semiMajorAxis * 20 * Math.cos(angle);
        const y = semiMinorAxis * 20 * Math.sin(angle);
        const z = y * 2 * Math.sin(inclination) * (randomZFactor || 1); // Agregar factor Z si está presente

        ref.current.position.set(x, y, z);

        // Actualizar la posición de la etiqueta
        if (textRef.current) {
            textRef.current.position.set(x + 0.5, y + 0.5, z + 0.5);
            textRef.current.lookAt(camera.position);
            textRef.current.quaternion.slerp(camera.quaternion, 0.1); // Suaviza el movimiento del texto
        }

        
    });

    return (
        <group>
            {showAsteroidTrails ? <Line points={orbitPoints} color="grey" lineWidth={1} /> : null}
            <mesh ref={ref}>
                <sphereGeometry args={[size, 6, 6]} />
                <meshBasicMaterial color={color} /> 
            </mesh>
            {showLabels && (
                <Text
                    ref={textRef}
                    fontSize={0.2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {name}
                </Text>
            )}
        </group>
    );
};
export default SolarSystem;
