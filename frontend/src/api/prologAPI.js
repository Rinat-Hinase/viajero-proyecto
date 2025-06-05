// Placeholder para archivo JS/React
const API_URL = "http://localhost:8000";

export async function obtenerRutaMasCorta(origen, destino) {
  const res = await fetch(`${API_URL}/ruta_mas_corta?origen=${origen}&destino=${destino}`);
  if (!res.ok) throw new Error("No se pudo obtener la ruta más corta.");
  return res.json();
}

export async function obtenerRutaMasRapida(origen, destino) {
  const res = await fetch(`${API_URL}/ruta_mas_rapida?origen=${origen}&destino=${destino}`);
  if (!res.ok) throw new Error("No se pudo obtener la ruta más rápida.");
  return res.json();
}

export async function obtenerRutaMejorCalidad(origen, destino) {
  const res = await fetch(`${API_URL}/ruta_mejor_calidad?origen=${origen}&destino=${destino}`);
  if (!res.ok) throw new Error("No se pudo obtener la ruta de mejor calidad.");
  return res.json();
}

export async function obtenerRutaConLugares(origen, destino, lugares) {
  const queryString = encodeURIComponent(lugares);
  const res = await fetch(`${API_URL}/ruta_con_lugares_requeridos?origen=${origen}&destino=${destino}&lugares=${queryString}`);
  if (!res.ok) throw new Error("No se pudo obtener la ruta con lugares requeridos.");
  return res.json();
}
