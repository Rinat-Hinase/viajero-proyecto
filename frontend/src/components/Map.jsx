import React from "react";
import CityNode from "./CityNode";

const posiciones = {
  zamora: { x: 40, y: 50 },
  jacona: { x: 35, y: 60 },
  chilchota: { x: 60, y: 80 },
  zacapu: { x: 85, y: 78 },
  churintzio: { x: 70, y: 35 },
  la_piedad: { x: 90, y: 10 },
  la_barca: { x: 15, y: 25 },
};

const conexiones = [
  ["zamora", "jacona"],
  ["jacona", "chilchota"],
  ["chilchota", "zacapu"],
  ["zamora", "churintzio"],
  ["churintzio", "la_piedad"],
  ["zamora", "la_piedad"],
  ["zamora", "la_barca"],
  ["la_piedad", "la_barca"],
  ["la_barca", "zacapu"],
  ["churintzio", "zacapu"],
];

export default function Map({ origen, destino, ruta, onCityClick }) {
  return (
    <div className="flex justify-center">
      <svg viewBox="0 0 100 100" className="w-full max-w-[500px] h-auto bg-white border rounded shadow-md">

        {/* Conexiones grises de fondo */}
        {conexiones.map(([a, b], i) => (
          <line
            key={i}
            x1={posiciones[a].x}
            y1={posiciones[a].y}
            x2={posiciones[b].x}
            y2={posiciones[b].y}
            stroke="#ccc"
            strokeWidth="1"
          />
        ))}

        {/* Ruta actual en verde */}
        {ruta.length > 1 &&
          ruta.map((ciudad, i) => {
            if (i < ruta.length - 1) {
              const actual = posiciones[ciudad];
              const siguiente = posiciones[ruta[i + 1]];
              return (
                <line
                  key={`ruta-${i}`}
                  x1={actual.x}
                  y1={actual.y}
                  x2={siguiente.x}
                  y2={siguiente.y}
                  stroke="#22c55e"
                  strokeWidth="2.5"
                />
              );
            }
            return null;
          })}

        {/* Nodos de ciudad */}
        {Object.entries(posiciones).map(([ciudad, coords]) => (
          <CityNode
            key={ciudad}
            nombre={ciudad}
            coords={coords}
            seleccionado={
              ciudad === origen ? "origen" : ciudad === destino ? "destino" : null
            }
            onClick={() => onCityClick(ciudad)}
          />
        ))}
      </svg>
    </div>
  );
}
