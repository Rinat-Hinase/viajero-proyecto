import React from "react";
import zamoraImg from "../assets/zamora.png";
import jaconaImg from "../assets/jacona.jpg";
import chilchotaImg from "../assets/chilchota.jpg";
import zacapuImg from "../assets/zacapu.jpg";
import churintzioImg from "../assets/churintzio.jpg";
import laPiedadImg from "../assets/la_piedad.jpg";
import laBarcaImg from "../assets/la_barca.jpg";

const posiciones = {
  zamora: { x: 25, y: 50, img: zamoraImg, nombre: "Zamora" },
  jacona: { x: 15, y: 65, img: jaconaImg, nombre: "Jacona" },
  chilchota: { x: 55, y: 85, img: chilchotaImg, nombre: "Chilchota" },
  zacapu: { x: 90, y: 70, img: zacapuImg, nombre: "Zacapu" },
  churintzio: { x: 65, y: 35, img: churintzioImg, nombre: "Churintzio" },
  la_piedad: { x: 85, y: 10, img: laPiedadImg, nombre: "La Piedad" },
  la_barca: { x: 0, y: 25, img: laBarcaImg, nombre: "La Barca" },
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
    <div className="flex items-center justify-center w-full h-screen"> {/* Centra el mapa */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full bg-gray-100 border rounded shadow-md" // Fondo gris claro
      >
        {/* Conexiones grises de fondo */}
        {conexiones.map(([a, b], i) => (
          <line
            key={i}
            x1={posiciones[a].x}
            y1={posiciones[a].y}
            x2={posiciones[b].x}
            y2={posiciones[b].y}
            stroke="#ccc"
            strokeWidth="1.5" // Líneas más gruesas
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
                  strokeWidth="3" // Líneas de ruta más gruesas
                />
              );
            }
            return null;
          })}

        {/* Nodos de ciudad como imágenes */}
        {Object.entries(posiciones).map(([ciudad, { x, y, img, nombre }]) => (
          <g key={ciudad} onClick={() => onCityClick(ciudad)} className="cursor-pointer">
            <foreignObject
              x={x - 6} // Ajusta la posición para centrar la imagen
              y={y - 6}
              width={12} // Tamaño más proporcionado para los nodos
              height={12}
              className="transition-transform duration-300 hover:scale-110" // Animación de inflado como un globo
              style={{
                transformOrigin: `${x}px ${y}px`
              }}
            >
              <img
                src={img}
                alt={ciudad}
                className={`w-full h-full rounded-full border-2 ${
                  ciudad === origen
                    ? "border-green-500"
                    : ciudad === destino
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </foreignObject>
            {/* Nombre de la ciudad */}
            <text
              x={x} // Centra el texto horizontalmente
              y={y + 8} // Coloca el texto debajo del nodo
              textAnchor="middle"
              fontSize="3"
              fill="#333"
              fontWeight="bold"
            >
              {nombre}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}