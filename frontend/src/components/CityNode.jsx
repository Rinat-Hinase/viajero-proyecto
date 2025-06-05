import React from "react";

export default function CityNode({ nombre, coords, seleccionado, onClick }) {
  const { x, y } = coords;

  const color =
    seleccionado === "origen"
      ? "#10b981" // verde esmeralda (Tailwind: emerald-500)
      : seleccionado === "destino"
      ? "#ef4444" // rojo suave (Tailwind: red-500)
      : "#93c5fd"; // azul suave (Tailwind: blue-300)

  return (
    <g
      onClick={onClick}
      className="cursor-pointer transition-transform duration-200"
    >
      {/* Nodo circular */}
      <circle
        cx={x}
        cy={y}
        r="2.5"
        fill={color}
        stroke="#10b981"
        strokeWidth="0.5"
        className="hover:scale-110 origin-center" // Escala desde el centro
        style={{
          transformOrigin: `${x}px ${y}px`, // Asegura que el origen de la escala sea el centro del nodo
        }}
      />
      {/* Texto del nodo */}
      <text
        x={x + 3} // Ajusta la posición del texto para que no se desplace
        y={y - 1.5}
        fontSize="1.5"
        fill="black"
      >
        {nombre}
      </text>
    </g>
  );
}