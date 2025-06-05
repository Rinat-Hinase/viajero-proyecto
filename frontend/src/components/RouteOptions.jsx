import React, { useState } from "react";
import {
  obtenerRutaMasCorta,
  obtenerRutaMasRapida,
  obtenerRutaMejorCalidad,
  obtenerRutaConLugares
} from "../api/prologAPI";

// Lugares de interés por ciudad
const lugaresPorCiudad = {
  zamora: ["Catedral", "Parque", "Río Duero"],
  jacona: ["Catedral", "Parque"],
  chilchota: ["Laguna"],
  zacapu: ["Laguna"],
  churintzio: ["Plaza"],
  la_piedad: ["Plaza", "Río Duero"],
  la_barca: ["Puente Histórico"],
};

export default function RouteOptions({ origen, destino, setRuta }) {
  const [mostrarLugares, setMostrarLugares] = useState(false);
  const [lugaresSeleccionados, setLugaresSeleccionados] = useState([]);
  const [textoRuta, setTextoRuta] = useState("");

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
        case "lugares":
          setMostrarLugares(true);
          return;
        default:
          return;
      }

      if (data?.ruta) {
        setRuta(data.ruta);
        setTextoRuta(""); // Limpia el texto si no es "Con lugares"
      } else {
        alert("No se encontró una ruta.");
        setRuta([]);
        setTextoRuta("");
      }
    } catch (err) {
      console.error(err);
      alert("Error al consultar la ruta.");
      setTextoRuta("");
    }
  };

  const handleLugarChange = (ciudad, lugar) => {
    const id = `${ciudad}:${lugar}`;
    setLugaresSeleccionados((prev) =>
      prev.includes(id)
        ? prev.filter((l) => l !== id)
        : [...prev, id]
    );
  };

  const handleConfirmarLugares = async () => {
  setMostrarLugares(false);
  if (lugaresSeleccionados.length === 0) return;

  const lugaresSoloNombres = lugaresSeleccionados.map((l) => l.split(":")[1]);
  try {
    const data = await obtenerRutaConLugares(
      origen,
      destino,
      lugaresSoloNombres.join(",")
    );
    if (data?.ruta) {
      setRuta(data.ruta);

      // Generar texto descriptivo de los lugares seleccionados
      const textoLugares = lugaresSoloNombres
        .map((lugar, idx) =>
          idx === 0
            ? `Primero pasas por ${lugar}`
            : `enseguida por ${lugar}`
        )
        .join(", ");

      // Mostrar el texto generado
      setTextoRuta(`${textoLugares}.`);
    } else {
      alert("No se encontró una ruta.");
      setRuta([]);
      setTextoRuta("");
    }
  } catch (err) {
    alert("Error al consultar la ruta.");
    setTextoRuta("");
  }
  setLugaresSeleccionados([]);
};

  return (
    <div className="flex flex-col gap-4">
      {/* Botones estilizados */}
      <button
        onClick={() => manejarConsulta("corta")}
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
      >
        Ruta más corta
      </button>
      <button
        onClick={() => manejarConsulta("rapida")}
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
      >
        Más rápida
      </button>
      <button
        onClick={() => manejarConsulta("calidad")}
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
      >
        Mejor calidad
      </button>
      <button
        onClick={() => manejarConsulta("lugares")}
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
      >
        Con lugares
      </button>

      {/* Modal de selección de lugares */}
      {mostrarLugares && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Selecciona lugares de interés</h2>
            <div className="max-h-60 overflow-y-auto mb-4">
              {Object.entries(lugaresPorCiudad).map(([ciudad, lugares]) => (
                <div key={ciudad} className="mb-4">
                  <div className="font-semibold text-blue-700 mb-2">
                    {ciudad.charAt(0).toUpperCase() + ciudad.slice(1)}
                  </div>
                  {lugares.map((lugar) => {
                    const id = `${ciudad}:${lugar}`;
                    return (
                      <label key={id} className="flex items-center ml-4 mb-2">
                        <input
                          type="checkbox"
                          checked={lugaresSeleccionados.includes(id)}
                          onChange={() => handleLugarChange(ciudad, lugar)}
                          className="mr-2"
                        />
                        {lugar}
                      </label>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarLugares(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarLugares}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Texto de la ruta */}
      {textoRuta && (
        <div className="w-full mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 shadow-md">
          {textoRuta}
        </div>
      )}
    </div>
  );
}