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
const FilterPanel = ({ showSunLabels, setShowSunLabels, showPlanetLabels, setShowPlanetLabels, showAsteroidLabels, setShowAsteroidLabels, handleLayerToggle, setShowPlanetTrails, showPlanetTrails, showAsteroidTrails, setShowAsteroidTrails }) => {
  return (
    <div className="absolute right-0 z-50 flex flex-col items-center w-64 h-full p-4 text-white">
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

  const handlePlayToggle = () => {
    setOnPlay(prev => !prev);
  };
  const handleLayerToggle = () => {
    setShowLayerPanel(prev => !prev);
  };

  return (
    <>
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
          onClick={setInfo(prev => !prev)}
          className={`rounded-lg  bg-gray-700  ${info ? "opacity-100" : 'opacity-35'} transition duration-300 z-50`}
        >
          <LuInfo className='text-xl' />
        </button>

      </div>
    </>
  )
}
function App() {
  const [showSunLabels, setShowSunLabels] = useState(true);
  const [showPlanetLabels, setShowPlanetLabels] = useState(true);
  const [showPlanetTrails, setShowPlanetTrails] = useState(true);
  const [showAsteroidLabels, setShowAsteroidLabels] = useState(true);
  const [showAsteroidTrails, setShowAsteroidTrails] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(true);
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  
  const [info, setInfo] = useState(false)
  const [onPlay, setOnPlay] = useState(true)
  const [onPass, setOnPass] = useState(false)
  const [onBack, setOnBack] = useState(false)
  console.log(info)
  const handleFilterToggle = () => {
    setShowFilterPanel(prev => !prev);
  };
  const handleLayerToggle = () => {
    setShowLayerPanel(prev => !prev);
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
