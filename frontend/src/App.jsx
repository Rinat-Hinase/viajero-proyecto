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
    <div className="min-h-screen bg-gray-100 px-6 py-8">

      <h1 className="text-3xl font-bold text-center mb-6">Ruta Visualizer</h1>

      <RouteOptions origen={origen} destino={destino} setRuta={setRuta} />

      <Map
        origen={origen}
        destino={destino}
        ruta={ruta}
        onCityClick={manejarCiudadClick}
      />
    </div>
  );
}
