import React, { useState } from "react";
import Map from "./components/Map";
import RouteOptions from "./components/RouteOptions";

export default function App() {
  const [origen, setOrigen] = useState(null);
  const [destino, setDestino] = useState(null);
  const [ruta, setRuta] = useState([]);

  const manejarCiudadClick = (ciudad) => {
    if (!origen) {
      setOrigen(ciudad);
    } else if (!destino && ciudad !== origen) {
      setDestino(ciudad);
    } else if (ciudad === origen && destino) {
      setOrigen(destino);
      setDestino(null);
    } else if (ciudad === destino) {
      setDestino(null);
    } else {
      setOrigen(ciudad);
      setDestino(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 shadow-lg p-6 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-gray-200">Opciones de Ruta</h2>
        <RouteOptions origen={origen} destino={destino} setRuta={setRuta} />
      </aside>

      {/* Mapa */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full h-full bg-gray-800 shadow-lg rounded-lg border border-gray-700 overflow-hidden">
          <Map
            origen={origen}
            destino={destino}
            ruta={ruta}
            onCityClick={manejarCiudadClick}
          />
        </div>
      </main>
    </div>
  );
}