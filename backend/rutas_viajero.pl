% --- Hechos: conexiones entre ciudades ---
% camino(Ciudad1, Ciudad2, DistanciaKM, Calidad, Trafico, [LugaresInteres])

camino(zamora, jacona, 5, excelente, bajo, [catedral, parque]).
camino(jacona, zamora, 5, excelente, bajo, [catedral, parque]).

camino(jacona, chilchota, 20, buena, medio, []).
camino(chilchota, jacona, 20, buena, medio, []).

camino(chilchota, zacapu, 40, regular, alto, [laguna]).
camino(zacapu, chilchota, 40, regular, alto, [laguna]). 

camino(zamora, churintzio, 25, buena, bajo, []).
camino(churintzio, zamora, 25, buena, bajo, []).

camino(churintzio, la_piedad, 35, buena, medio, [plaza]).
camino(la_piedad, churintzio, 35, buena, medio, [plaza]).

camino(zamora, la_piedad, 45, excelente, medio, [rio_duero]).
camino(la_piedad, zamora, 45, excelente, medio, [rio_duero]).

camino(zamora, la_barca, 60, regular, alto, []).
camino(la_barca, zamora, 60, regular, alto, []).

camino(la_piedad, la_barca, 30, buena, medio, [puente_historico]).
camino(la_barca, la_piedad, 30, buena, medio, [puente_historico]).

camino(la_barca, zacapu, 70, regular, medio, []).
camino(zacapu, la_barca, 70, regular, medio, []).

camino(churintzio, zacapu, 55, mala, alto, []).
camino(zacapu, churintzio, 55, mala, alto, []).
% Penalización por calidad del camino
penaliza_calidad(excelente, 0).
penaliza_calidad(buena, 1).
penaliza_calidad(regular, 2).
penaliza_calidad(mala, 3).

% Penalización por tráfico
penaliza_trafico(bajo, 0).
penaliza_trafico(medio, 2).
penaliza_trafico(alto, 4).

% Ruta entre dos ciudades sin repetir ciudades ya visitadas
ruta(Inicio, Fin, Ruta, DistanciaTotal) :-
    ruta(Inicio, Fin, [Inicio], RutaInvertida, 0, DistanciaTotal),
    reverse(RutaInvertida, Ruta).

% Caso base: hemos llegado al destino
ruta(Fin, Fin, Ruta, Ruta, Distancia, Distancia).

% Paso recursivo: seguimos buscando ciudad vecina no visitada
ruta(Actual, Fin, Visitadas, RutaFinal, DistAcum, DistTotal) :-
    camino(Actual, Siguiente, Dist, _, _, _),
    \+ member(Siguiente, Visitadas),
    NuevoDist is DistAcum + Dist,
    ruta(Siguiente, Fin, [Siguiente|Visitadas], RutaFinal, NuevoDist, DistTotal).

% Encontrar la ruta más corta evaluando todas las posibles
ruta_mas_corta(Inicio, Fin, RutaOptima, DistanciaMin) :-
    findall([Ruta, Dist], ruta(Inicio, Fin, Ruta, Dist), Rutas),
    menor_distancia(Rutas, [RutaOptima, DistanciaMin]).

% Comparar rutas por distancia y elegir la menor
menor_distancia([Ruta], Ruta).
menor_distancia([[R1, D1]|Resto], [RMin, DMin]) :-
    menor_distancia(Resto, [R2, D2]),
    (D1 < D2 -> (RMin = R1, DMin = D1) ; (RMin = R2, DMin = D2)).

% Ruta que considera tiempo total (basado en calidad y tráfico)
ruta_rapida(Inicio, Fin, Ruta, TiempoTotal) :-
    ruta_rapida(Inicio, Fin, [Inicio], RutaInvertida, 0, TiempoTotal),
    reverse(RutaInvertida, Ruta).

ruta_rapida(Fin, Fin, Ruta, Ruta, Tiempo, Tiempo).

ruta_rapida(Actual, Fin, Visitadas, RutaFinal, TiempoAcum, TiempoTotal) :-
    camino(Actual, Siguiente, _, Calidad, Trafico, _),
    \+ member(Siguiente, Visitadas),
    penaliza_calidad(Calidad, P1),
    penaliza_trafico(Trafico, P2),
    Penalizacion is P1 + P2,
    NuevoTiempo is TiempoAcum + Penalizacion,
    ruta_rapida(Siguiente, Fin, [Siguiente|Visitadas], RutaFinal, NuevoTiempo, TiempoTotal).
ruta_mas_rapida(Inicio, Fin, RutaOptima, TiempoMin) :-
    findall([Ruta, Tiempo], ruta_rapida(Inicio, Fin, Ruta, Tiempo), Rutas),
    menor_tiempo(Rutas, [RutaOptima, TiempoMin]).

menor_tiempo([Ruta], Ruta).
menor_tiempo([[R1, T1]|Resto], [RMin, TMin]) :-
    menor_tiempo(Resto, [R2, T2]),
    (T1 < T2 -> (RMin = R1, TMin = T1) ; (RMin = R2, TMin = T2)).


% --- Ruta por calidad ---
% Ruta que suma solo la calidad total de los tramos
ruta_calidad(Inicio, Fin, Ruta, CalidadTotal) :-
    ruta_calidad(Inicio, Fin, [Inicio], RutaInvertida, 0, CalidadTotal),
    reverse(RutaInvertida, Ruta).

ruta_calidad(Fin, Fin, Ruta, Ruta, Calidad, Calidad).

ruta_calidad(Actual, Fin, Visitadas, RutaFinal, CalidadAcum, CalidadTotal) :-
    camino(Actual, Siguiente, _, Calidad, _, _),
    \+ member(Siguiente, Visitadas),
    penaliza_calidad(Calidad, Penalizacion),
    NuevoCalidad is CalidadAcum + Penalizacion,
    ruta_calidad(Siguiente, Fin, [Siguiente|Visitadas], RutaFinal, NuevoCalidad, CalidadTotal).
ruta_mejor_calidad(Inicio, Fin, RutaOptima, CalidadMin) :-
    findall([Ruta, Calidad], ruta_calidad(Inicio, Fin, Ruta, Calidad), Rutas),
    menor_calidad(Rutas, [RutaOptima, CalidadMin]).

menor_calidad([Ruta], Ruta).
menor_calidad([[R1, C1]|Resto], [RMin, CMin]) :-
    menor_calidad(Resto, [R2, C2]),
    (C1 < C2 -> (RMin = R1, CMin = C1) ; (RMin = R2, CMin = C2)).

% --- Ruta por lugares de interés ---
ruta_con_interes(Inicio, Fin, Ruta, LugaresInteresEncontrados) :-
    ruta_con_interes(Inicio, Fin, [Inicio], RutaInvertida, [], LugaresInteresEncontrados),
    reverse(RutaInvertida, Ruta).

ruta_con_interes(Fin, Fin, Ruta, Ruta, Lugares, Lugares).

ruta_con_interes(Actual, Fin, Visitadas, RutaFinal, LugaresAcum, LugaresFinal) :-
    camino(Actual, Siguiente, _, _, _, LugaresTramo),
    \+ member(Siguiente, Visitadas),
    union(LugaresTramo, LugaresAcum, NuevosLugares),
    ruta_con_interes(Siguiente, Fin, [Siguiente|Visitadas], RutaFinal, NuevosLugares, LugaresFinal).
% Regla que verifica que todos los lugares requeridos estén en la ruta
ruta_con_lugares_requeridos(Inicio, Fin, Ruta, LugaresRequeridos) :-
    ruta_con_interes(Inicio, Fin, Ruta, LugaresEncontrados),
    subset(LugaresRequeridos, LugaresEncontrados).
