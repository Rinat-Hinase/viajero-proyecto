// Placeholder para archivo JS/React
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
    <g onClick={onClick} className="cursor-pointer hover:scale-105 transition-transform duration-200">
      <circle
        cx={x}
        cy={y}
        r="2.5"
        fill={color}
        stroke="#10b981"
        strokeWidth="0.5"
      />
      <text x={x + 1.5} y={y - 1.5} fontSize="1.5" fill="black">

        {nombre}
      </text>
    </g>
  );
}
