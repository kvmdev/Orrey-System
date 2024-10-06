import React, { useState } from 'react';
import './App.css';
import { IoIosArrowForward } from "react-icons/io";
import { IoPlayBack } from "react-icons/io5";
import Orrery from "../src/Orrery";
import { VscSettings } from "react-icons/vsc";
import { FaLayerGroup } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { IoPlayForward } from "react-icons/io5";
import { FaPause } from "react-icons/fa6";
import { LuInfo } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { solarSystemPlanets } from "./infoplanets";

const FilterPanel = ({ showSunLabels, setShowSunLabels, showPlanetLabels, setShowPlanetLabels, showAsteroidLabels, setShowAsteroidLabels, handleLayerToggle, setShowPlanetTrails, showPlanetTrails, showAsteroidTrails, setShowAsteroidTrails }) => {
  return (
    <div className="absolute right-0 z-50 flex flex-col items-center w-64 h-full p-4 pt-[80px] text-white">
      <h2 onClick={handleLayerToggle} className="absolute flex items-center mb-4 text-lg font-bold cursor-pointer right-10">Capas <IoIosArrowForward className='pt-1 text-xl' /></h2>
      <div className="flex flex-col mt-10">
        <div className="text-base font-bold ">Textos</div>
        <hr className='my-2' />
        <label className="flex items-center mb-2">
          <div className="flex items-center justify-center w-6 h-6 text-xs text-gray-800 bg-gray-200 border-0 border-none rounded-md focus:ring-0 checked:bg-blue-500 "
            onClick={() => setShowSunLabels(prev => !prev)}
          >
            {showSunLabels ? <FaCheck /> : ""}
          </div>
          <span className="ml-2 text-base font-semibold">Sol</span>
        </label>
        <label className="flex items-center mb-2">
          <div className="flex items-center justify-center w-6 h-6 text-xs text-gray-800 bg-gray-200 border-0 border-none rounded-md focus:ring-0 checked:bg-blue-500 "
            onClick={() => setShowPlanetLabels(prev => !prev)}
          >
            {showPlanetLabels ? <FaCheck /> : ""}
          </div>
          <span className="ml-2 text-base font-semibold">Planetas</span>
        </label>
        <label className="flex items-center mb-2 ">
          <div className="flex items-center justify-center w-6 h-6 text-xs text-gray-800 bg-gray-200 border-0 border-none rounded-md focus:ring-0 checked:bg-blue-500 "
            onClick={() => setShowAsteroidLabels(prev => !prev)}
          >
            {showAsteroidLabels ? <FaCheck /> : ""}
          </div>
          <span className="ml-2 text-base font-semibold">Cometas</span>
        </label>
        <div className="mt-6 text-base font-bold">Trayectorias</div>
        <hr className='my-2' />
        <label className="flex items-center mb-2">
          <div className="flex items-center justify-center w-6 h-6 text-xs text-gray-800 bg-gray-200 border-0 border-none rounded-md focus:ring-0 checked:bg-blue-500 "
            onClick={() => setShowPlanetTrails(prev => !prev)}
          >
            {showPlanetTrails ? <FaCheck /> : ""}
          </div>
          <span className="ml-2 text-base font-semibold">Planetas</span>
        </label>
        <label className="flex items-center mb-2">
          <div className="flex items-center justify-center w-6 h-6 text-xs text-gray-800 bg-gray-200 border-0 border-none rounded-md focus:ring-0 checked:bg-blue-500 "
            onClick={() => setShowAsteroidTrails(prev => !prev)}
          >
            {showAsteroidTrails ? <FaCheck /> : ""}
          </div>
          <span className="ml-2 text-base font-semibold">Cometas</span>
        </label>
      </div>
    </div>
  );
};
const LayerPanel = ({ panel, showLayerPanel, setShowLayerPanel, setOnPlay, onPlay, setOnBack, setOnPass, onBack, onPass, info, setInfo }) => {
  const [IsMenuOpen, setMenuOpen] = useState(false);
  const handlePlayToggle = () => {
    setOnPlay(prev => !prev);
  };
  const handleLayerToggle = () => {
    setShowLayerPanel(prev => !prev);
  };

  return (
    <>
      <header className="fixed top-0 z-50 flex items-center justify-between w-full px-6 py-2 text-white md:px-32">
        <div className='flex items-center justify-center gap-2 font-bold cursor-pointer hover:scale-110'>
          <img src={'https://cdn.discordapp.com/attachments/749326094800519179/1292225019279310969/DALLE-2024-10-05-13.28.png?ex=6702f5d4&is=6701a454&hm=31109079e112cccc619808a8e4ce17380aef86245ff744c8c92593bb4c420c61&'} alt="Logo" className='w-16 transition-all' />
          Eyes on Stars
        </div>
        <ul className='items-center hidden gap-12 text-base font-semibold xl:flex'>
          <li className='p-3 transition-all rounded-md cursor-pointer hover:bg-white-400 hover:text-gray'>Learn</li>
          <li className='p-3 transition-all rounded-md cursor-pointer hover:bg-white-400 hover:text-gray'>Asteroid Watch</li>
          <li className='p-3 transition-all rounded-md cursor-pointer hover:bg-white-400 hover:text-gray'>Filters</li>
        </ul>
        <div className='relative items-center justify-center hidden gap-3 md:flex'>
          <IoSearchSharp className='text-2xl ' />
          <input type="text" placeholder='search....' className='py-2 pl-4 text-gray-800 border border-black rounded-xl focus:bg-slate-100 focus:outline-none' />
        </div>

        <div
          className='text-5xl cursor-pointer xl:hidden' >
          <IoIosMenu className='text-5xl cursor-pointer xl:hidden' onClick={() => setMenuOpen(prev => !prev)} />
          <div className={`absolute xl:hidden top-24 left-0 w-full  flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${IsMenuOpen ? "opacity-100" : "hidden"}`}>
            <li className='w-full p-4 text-center list-none transition-all cursor-pointer hover:bg-black hover:text-gray'>Learn</li>
            <li className='w-full p-4 text-center list-none transition-all cursor-pointer hover:bg-black hover:text-gray'>Asteroid Watch</li>
            <li className='w-full p-4 text-center list-none transition-all cursor-pointer hover:bg-black hover:text-gray'>Filters</li>
          </div>
        </div>
      </header>
      <div className={`absolute text-2xl text-white left-0 z-10 flex items-center justify-center w-10 h-10 p-4 mb-4 ml-4 bg-gray-700 rounded-lg transition duration-300 bottom-[45px]  ${panel ? "" : "opacity-0"}`}>
        <button
          onClick={handleLayerToggle}
          className={`rounded-lg  bg-gray-700  ${showLayerPanel ? "opacity-100" : 'opacity-35'} transition duration-300 z-50`}
        >
          <FaLayerGroup className='text-xl' />
        </button>

      </div>
      <div className={`absolute text-2xl gap-4 flex-col justify-around text-white left-0 z-10 flex items-center  w-10 h-30 p-4 mb-4 ml-4 bg-gray-700 rounded-lg transition duration-300 bottom-[90px]  ${panel ? "" : "opacity-0"}`}>
        <button
          onClick={() => { onBack ? "" : setOnPass(prev => !prev); }}
          className={`rounded-lg  bg-gray-700  ${onPass ? "opacity-100" : 'opacity-35'} transition duration-300 z-50`}
        >
          <IoPlayForward className='text-xl' />
        </button>
        <button
          onClick={handlePlayToggle}
          className={`rounded-lg  bg-gray-700  ${onPlay ? "opacity-100" : 'opacity-35'} transition duration-300 z-50`}
        >
          {onPlay ? <FaPause className='text-xl' /> : <IoPlay className='text-xl' />}

        </button>
        <button
          onClick={() => { onPass ? "" : setOnBack(prev => !prev); }}
          className={`rounded-lg  bg-gray-700  ${onBack ? "opacity-100" : 'opacity-35'} transition duration-300 z-50`}
        >
          <IoPlayBack className='text-xl' />
        </button>

      </div>
      <div className={`absolute text-2xl text-white left-0 z-10 flex items-center justify-center w-10 h-10 p-4 mb-4 ml-4 bg-gray-700 rounded-lg transition duration-300 bottom-[219px]  ${panel ? "" : "opacity-0"}`}>
        <button
          onClick={() => { setInfo(prev => !prev) }}
          className={`rounded-lg  bg-gray-700  ${info ? "opacity-100" : 'opacity-35'} transition duration-300 z-50`}
        >
          <LuInfo className='text-xl' />
        </button>

      </div>
    </>
  )
}
const PlanetPanel = ({ setIsZoomed, info }) => {
  console.log(info)
  return (
    <div className='absolute right-0 z-40 flex items-center justify-center h-screen w-80'>
      <div className='w-[300px] font-bold text-white pt-[20px] bg-zinc-950 h-[70%] rounded-xl'>
        <h2 onClick={() => { setIsZoomed(false) }} className="absolute flex items-center mb-4 text-lg font-bold cursor-pointer right-10">Volver<IoIosArrowForward className='pt-1 text-xl' /></h2>
        <div className='flex flex-col w-full h-full p-10'>
          <h1 className='text-xl '>{info.name == 'Tierra' ? info.name + ' ( Estas aquí )' : info.name}</h1>
          <div><img src={info.image} alt="" /></div>
          <div className='flex flex-col p-4 text-xs border-2 rounded-xl'>
            <div>Diametro: {info.meanRadius} km</div>
            <div>Masa: {info.mass} kg</div>
            <div>Gravedad: {info.gravity} m/s²</div>
            <div>Temperatura: {info.temperature.surface} °C</div>
            <div>
              <strong>Atmósfera:</strong>
              {info.atmosphere.composition.map((gas, index) => (
                <div className='font-extralight' key={index}>
                  {gas.gas}: {gas.percentage}%
                </div>
              ))}
            </div>
            <div>Lunas: {info.moons}</div>
          </div>

        </div>
      </div>
    </div>
  )
}
function App() {
  const [showSunLabels, setShowSunLabels] = useState(false);
  const [showPlanetLabels, setShowPlanetLabels] = useState(false);
  const [showPlanetTrails, setShowPlanetTrails] = useState(true);
  const [showAsteroidLabels, setShowAsteroidLabels] = useState(true);
  const [showAsteroidTrails, setShowAsteroidTrails] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(true);
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [info, setInfo] = useState(false)
  const [onPlay, setOnPlay] = useState(true)
  const [onPass, setOnPass] = useState(false)
  const [onBack, setOnBack] = useState(false)
  const [infoPlanet, setinfoPlanet] = useState('')
  const handleFilterToggle = () => {
    setShowFilterPanel(prev => !prev);
  };
  const handleLayerToggle = () => {
    setShowLayerPanel(prev => !prev);
  };

  const handlePlanetClick = (name) => {
    setIsZoomed(true);
    solarSystemPlanets.forEach((planet) => {
      if (planet.name == name) { setinfoPlanet(planet) }
    })
  };
  return (
    <div className="relative flex w-screen h-screen overflow-hidden bg-gray-950">

      <div className="absolute bottom-0 left-0 flex justify-end p-4 text-white z-100">
        {/* Botón de filtro */}
        <button
          onClick={handleFilterToggle}
          className={`w-10 h-10 flex items-center rounded-lg justify-center bg-gray-700 hover:opacity-90  ${showFilterPanel ? "opacity-100" : 'opacity-35'} transition duration-300 z-50`}
        >
          <VscSettings className="text-2xl" />
        </button>

      </div>
      <LayerPanel info={info} setInfo={setInfo} setOnBack={setOnBack} onBack={onBack} setOnPass={setOnPass} onPass={onPass} onPlay={onPlay} setOnPlay={setOnPlay} panel={showFilterPanel} showLayerPanel={showLayerPanel} setShowLayerPanel={setShowLayerPanel} />

      {/* Ventana lateral de filtro */}
      {isZoomed && (<PlanetPanel setIsZoomed={setIsZoomed} info={infoPlanet} />)}
      {showLayerPanel && (
        <FilterPanel
          handleLayerToggle={handleLayerToggle}
          showSunLabels={showSunLabels}
          setShowSunLabels={setShowSunLabels}
          showPlanetLabels={showPlanetLabels}
          setShowPlanetLabels={setShowPlanetLabels}
          showAsteroidLabels={showAsteroidLabels}
          setShowAsteroidLabels={setShowAsteroidLabels}
          setShowPlanetTrails={setShowPlanetTrails}
          showPlanetTrails={showPlanetTrails}
          showAsteroidTrails={showAsteroidTrails}
          setShowAsteroidTrails={setShowAsteroidTrails}

        />
      )}


      {/* Componente Orrery separado para evitar re-renderizados */}
      <Orrery
        handlePlanetClick={handlePlanetClick}
        onBack={onBack}
        onPass={onPass}
        onPlay={onPlay}
        showSunLabels={showSunLabels}
        showPlanetLabels={showPlanetLabels}
        showPlanetTrails={showPlanetTrails}
        showAsteroidLabels={showAsteroidLabels}
        showAsteroidTrails={showAsteroidTrails}
      />
    </div>
  );
}

export default App;
