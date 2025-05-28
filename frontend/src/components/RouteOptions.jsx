// Placeholder para archivo JS/React
import React from "react";
import {
  obtenerRutaMasCorta,
  obtenerRutaMasRapida,
  obtenerRutaMejorCalidad,
  obtenerRutaConInteres,
  obtenerRutaConLugares
} from "../api/prologAPI";

export default function RouteOptions({ origen, destino, setRuta }) {
  const manejarConsulta = async (tipo) => {
    if (!origen || !destino) {
      alert("Selecciona origen y destino.");
      return;
    }

    try {
      let data;
      switch (tipo) {
        case "corta":
          data = await obtenerRutaMasCorta(origen, destino);
          break;
        case "rapida":
          data = await obtenerRutaMasRapida(origen, destino);
          break;
        case "calidad":
          data = await obtenerRutaMejorCalidad(origen, destino);
          break;
        case "interes":
          data = await obtenerRutaConInteres(origen, destino);
          break;
        case "lugares":
          const lugares = prompt("Lugares separados por coma (ej. catedral,laguna):");
          if (!lugares) return;
          data = await obtenerRutaConLugares(origen, destino, lugares);
          break;
        default:
          return;
      }

      if (data?.ruta) {
        setRuta(data.ruta);
      } else {
        alert("No se encontró una ruta.");
        setRuta([]);
      }
    } catch (err) {
      console.error(err);
      alert("Error al consultar la ruta.");
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-4">
      <button onClick={() => manejarConsulta("corta")} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Ruta más corta</button>
      <button onClick={() => manejarConsulta("rapida")} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Más rápida</button>
      <button onClick={() => manejarConsulta("calidad")} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Mejor calidad</button>
      <button onClick={() => manejarConsulta("interes")} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">Con interés</button>
      <button onClick={() => manejarConsulta("lugares")} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded">Con lugares</button>
    </div>
  );
}
