export const solarSystemPlanets = [
  {
    name: "Mercurio",
    meanRadius: 2439.7, // en kilómetros
    mass: 3.3011e23, // en kg
    gravity: 3.7, // m/s²
    distanceFromSun: {
      perihelion: 46e6, // en km
      aphelion: 69.8e6, // en km
    },
    orbit: {
      eccentricity: 0.2056,
      inclination: 7.01, // en grados
      orbitalPeriod: 88, // en días terrestres
      rotationPeriod: 58.6, // en días terrestres
    },
    atmosphere: {
      composition: [
        { gas: "Oxígeno (O₂)", percentage: 42 },
        { gas: "Sodio (Na)", percentage: 29 },
        { gas: "Hidrógeno (H₂)", percentage: 22 },
        { gas: "Helio (He)", percentage: 6 },
      ],
      pressure: 0, // casi inexistente
    },
    temperature: {
      surface: 167, // en °C
    },
    moons: 0, // no tiene lunas
    interestingFacts: [
      "Mercurio es el planeta más cercano al Sol y el más rápido en completar una órbita.",
      "Debido a su delgada atmósfera, las temperaturas varían drásticamente entre el día y la noche.",
    ],
    image: "https://example.com/images/mercury.jpg", // URL real de una imagen ligera
  },
  {
    name: "Venus",
    meanRadius: 6051.8, // en kilómetros
    mass: 4.8675e24, // en kg
    gravity: 8.87, // m/s²
    distanceFromSun: {
      perihelion: 107.48e6, // en km
      aphelion: 108.94e6, // en km
    },
    orbit: {
      eccentricity: 0.0067,
      inclination: 3.39, // en grados
      orbitalPeriod: 224.7, // en días terrestres
      rotationPeriod: 243, // en días terrestres
    },
    atmosphere: {
      composition: [
        { gas: "Dióxido de carbono (CO₂)", percentage: 96.5 },
        { gas: "Nitrógeno (N₂)", percentage: 3.5 },
      ],
      pressure: 92, // en atmósferas terrestres
    },
    temperature: {
      surface: 465, // en °C
    },
    moons: 0, // no tiene lunas
    interestingFacts: [
      "Venus tiene una rotación retrógrada, lo que significa que gira en dirección opuesta a su órbita.",
      "Es el planeta más caliente del Sistema Solar debido a su atmósfera de CO₂.",
    ],
    image: "https://example.com/images/venus.jpg", // URL real de una imagen ligera
  },
  {
    name: "Tierra",
    meanRadius: 6371, // en kilómetros
    mass: 5.97237e24, // en kg
    gravity: 9.8, // m/s²
    distanceFromSun: {
      perihelion: 147.1e6, // en km
      aphelion: 152.1e6, // en km
    },
    orbit: {
      eccentricity: 0.0167,
      inclination: 0, // en grados
      orbitalPeriod: 365.25, // en días terrestres
      rotationPeriod: 1, // en días terrestres
    },
    atmosphere: {
      composition: [
        { gas: "Nitrógeno (N₂)", percentage: 78 },
        { gas: "Oxígeno (O₂)", percentage: 21 },
        { gas: "Argón (Ar)", percentage: 0.93 },
      ],
      pressure: 1, // en atmósferas terrestres
    },
    temperature: {
      surface: 15, // en °C
    },
    moons: 1, // Luna
    interestingFacts: [
      "La Tierra es el único planeta conocido con vida y agua líquida en su superficie.",
      "Tiene una atmósfera que protege a los seres vivos de los rayos solares dañinos.",
    ],
    image: "https://example.com/images/earth.jpg", // URL real de una imagen ligera
  },
  {
    name: "Marte",
    meanRadius: 3389.5, // en kilómetros
    mass: 6.4171e23, // en kg
    gravity: 3.71, // m/s²
    distanceFromSun: {
      perihelion: 206.7e6, // en km
      aphelion: 249.2e6, // en km
    },
    orbit: {
      eccentricity: 0.0934,
      inclination: 1.85, // en grados
      orbitalPeriod: 687, // en días terrestres
      rotationPeriod: 1.03, // en días terrestres
    },
    atmosphere: {
      composition: [
        { gas: "Dióxido de carbono (CO₂)", percentage: 95.32 },
        { gas: "Nitrógeno (N₂)", percentage: 2.7 },
        { gas: "Argón (Ar)", percentage: 1.6 },
      ],
      pressure: 0.006, // en atmósferas terrestres
    },
    temperature: {
      surface: -60, // en °C
    },
    moons: 2, // Fobos y Deimos
    interestingFacts: [
      "Marte tiene la montaña más alta del Sistema Solar, el Olympus Mons.",
      "Es el planeta que más ha fascinado a los humanos por su similitud con la Tierra.",
    ],
    image: "https://example.com/images/mars.jpg", // URL real de una imagen ligera
  },
  {
    name: "Júpiter",
    meanRadius: 69911, // en kilómetros
    mass: 1.8982e27, // en kg
    gravity: 24.79, // m/s²
    distanceFromSun: {
      perihelion: 740.5e6, // en km
      aphelion: 816.6e6, // en km
    },
    orbit: {
      eccentricity: 0.0489,
      inclination: 1.31, // en grados
      orbitalPeriod: 4333, // en días terrestres
      rotationPeriod: 0.41, // en días terrestres (10 horas)
    },
    atmosphere: {
      composition: [
        { gas: "Hidrógeno (H₂)", percentage: 89.8 },
        { gas: "Helio (He)", percentage: 10.2 },
      ],
      pressure: "Unknown", // atmósfera profunda desconocida
    },
    temperature: {
      surface: -108, // en °C
    },
    moons: 79, // incluye Ío, Europa, Ganimedes, Calisto
    interestingFacts: [
      "Júpiter es el planeta más grande del Sistema Solar y tiene una Gran Mancha Roja, una tormenta gigantesca.",
      "Tiene la mayor cantidad de lunas conocidas.",
    ],
    image: "https://example.com/images/jupiter.jpg", // URL real de una imagen ligera
  },
  {
    name: "Saturno",
    meanRadius: 58232, // en kilómetros
    mass: 5.6834e26, // en kg
    gravity: 10.44, // m/s²
    distanceFromSun: {
      perihelion: 1352.6e6, // en km
      aphelion: 1514.5e6, // en km
    },
    orbit: {
      eccentricity: 0.0565,
      inclination: 2.49, // en grados
      orbitalPeriod: 10759, // en días terrestres
      rotationPeriod: 0.44, // en días terrestres (10.7 horas)
    },
    atmosphere: {
      composition: [
        { gas: "Hidrógeno (H₂)", percentage: 96.3 },
        { gas: "Helio (He)", percentage: 3.25 },
      ],
      pressure: "Unknown", // atmósfera profunda desconocida
    },
    temperature: {
      surface: -139, // en °C
    },
    moons: 83, // incluye Titán
    interestingFacts: [
      "Saturno es famoso por sus anillos compuestos principalmente de partículas de hielo y roca.",
      "Titán, su luna más grande, tiene una atmósfera densa y lagos de metano.",
    ],
    image: "https://example.com/images/saturn.jpg", // URL real de una imagen ligera
  },
  {
    name: "Urano",
    meanRadius: 25362, // en kilómetros
    mass: 8.6810e25, // en kg
    gravity: 8.69, // m/s²
    distanceFromSun: {
      perihelion: 2741.3e6, // en km
      aphelion: 3003.6e6, // en km
    },
    orbit: {
      eccentricity: 0.0472,
      inclination: 0.77, // en grados
      orbitalPeriod: 30687, // en días terrestres
      rotationPeriod: -0.72, // en días terrestres (retrógrado)
    },
    atmosphere: {
      composition: [
        { gas: "Hidrógeno (H₂)", percentage: 83 },
        { gas: "Helio (He)", percentage: 15 },
        { gas: "Metano (CH₄)", percentage: 2 },
      ],
      pressure: "Unknown", // atmósfera profunda desconocida
    },
    temperature: {
      surface: -195, // en °C
    },
    moons: 27, // incluye Miranda, Ariel, Umbriel, Titania, Oberón
    interestingFacts: [
      "Urano rota de lado, lo que significa que sus polos están donde otros planetas tienen sus ecuador.",
      "Es un planeta gigante de hielo con una atmósfera rica en metano, lo que le da su color azul.",
    ],
    image: "https://example.com/images/uranus.jpg", // URL real de una imagen ligera
  },
  {
    name: "Neptuno",
    meanRadius: 24622, // en kilómetros
    mass: 1.02413e26, // en kg
    gravity: 11.15, // m/s²
    distanceFromSun: {
      perihelion: 4459.7e6, // en km
      aphelion: 4537.1e6, // en km
    },
    orbit: {
      eccentricity: 0.0086,
      inclination: 1.77, // en grados
      orbitalPeriod: 60190, // en días terrestres
      rotationPeriod: 0.67, // en días terrestres
    },
    atmosphere: {
      composition: [
        { gas: "Hidrógeno (H₂)", percentage: 80 },
        { gas: "Helio (He)", percentage: 19 },
        { gas: "Metano (CH₄)", percentage: 1.5 },
      ],
      pressure: "Unknown", // atmósfera profunda desconocida
    },
    temperature: {
      surface: -201, // en °C
    },
    moons: 14, // incluye Tritón
    interestingFacts: [
      "Neptuno fue el primer planeta descubierto a través de cálculos matemáticos antes de ser observado.",
      "Tiene los vientos más rápidos del Sistema Solar, con ráfagas de hasta 2,100 km/h.",
    ],
    image: "https://example.com/images/neptune.jpg", // URL real de una imagen ligera
  },
];
