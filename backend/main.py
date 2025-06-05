# FastAPI backend con consulta a Prolog
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pyswip import Prolog

app = FastAPI()

# Permitir solicitudes desde el frontend (localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Para pruebas, puedes restringir luego
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar Prolog al iniciar
prolog = Prolog()
prolog.consult("rutas_viajero.pl")

@app.get("/ruta_mas_corta")
def ruta_mas_corta(origen: str, destino: str):
    try:
        consulta = f"ruta_mas_corta({origen}, {destino}, Ruta, D)"
        resultado = list(prolog.query(consulta, maxresult=1))
        if not resultado:
            raise HTTPException(status_code=404, detail="No se encontró ruta.")
        return {
            "ruta": resultado[0]["Ruta"],
            "distancia": resultado[0]["D"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/ruta_mas_rapida")
def ruta_mas_rapida(origen: str, destino: str):
    try:
        consulta = f"ruta_mas_rapida({origen}, {destino}, Ruta, Tiempo)"
        resultado = list(prolog.query(consulta, maxresult=1))
        if not resultado:
            raise HTTPException(status_code=404, detail="No se encontró ruta.")
        return {
            "ruta": resultado[0]["Ruta"],
            "tiempo": resultado[0]["Tiempo"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/ruta_mejor_calidad")
def ruta_mejor_calidad(origen: str, destino: str):
    try:
        consulta = f"ruta_mejor_calidad({origen}, {destino}, Ruta, Calidad)"
        resultado = list(prolog.query(consulta, maxresult=1))
        if not resultado:
            raise HTTPException(status_code=404, detail="No se encontró ruta.")
        return {
            "ruta": resultado[0]["Ruta"],
            "calidad": resultado[0]["Calidad"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/ruta_con_lugares_requeridos")
def ruta_con_lugares_requeridos(origen: str, destino: str, lugares: str):
    try:
        lugares_formato = "[" + ",".join(l.strip() for l in lugares.split(",")) + "]"
        consulta = f"ruta_con_lugares_requeridos({origen}, {destino}, Ruta, {lugares_formato})"
        resultado = list(prolog.query(consulta, maxresult=1))
        if not resultado:
            raise HTTPException(status_code=404, detail="No se encontró una ruta que pase por todos esos lugares.")
        return {
            "ruta": resultado[0]["Ruta"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
