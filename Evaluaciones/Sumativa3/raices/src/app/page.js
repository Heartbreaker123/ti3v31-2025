"use client";

import { useEffect, useState } from "react";
import InscripcionCard from "./components/InscripcionCard";

export default function Home() {
  const [inscripciones, setInscripciones] = useState([]);
  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [inscripcionesRes, talleresRes] = await Promise.all([
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/inscripciones.json"),
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/talleres.json"),
        ]);

        const [inscripcionesData, talleresData] = await Promise.all([
          inscripcionesRes.json(),
          talleresRes.json(),
        ]);

        const arregloInscripciones = inscripcionesData ? inscripcionesData.filter(item => item !== null) : [];
        const arregloTalleres = talleresData ? talleresData.filter(item => item !== null) : [];

        setInscripciones(arregloInscripciones);
        setTalleres(arregloTalleres);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setCargando(false);
      }
    }

    fetchData();
  }, []);

  const obtenerTallerPorId = (idTaller) => {
    return talleres.find((taller) => taller.id === idTaller) || {};
  };

  const filtrarInscripciones = () => {
    return inscripciones.filter((inscripcion) => {
      const nombreCompleto = `${inscripcion.nombres || ""} ${inscripcion.apellidos || ""}`.toLowerCase();
      const correo = inscripcion.correo?.toLowerCase() || "";
      const termino = busqueda.toLowerCase();
      return nombreCompleto.includes(termino) || correo.includes(termino);
    });
  };

  const inscripcionesFiltradas = filtrarInscripciones();
  const sinInscripciones = inscripciones.length === 0 && !cargando;
  const sinResultadosBusqueda = inscripciones.length > 0 && inscripcionesFiltradas.length === 0;

  return (
    <section className="talleres">
      <h2 className="titulo-seccion">Inscripciones Registradas</h2>

      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {cargando ? (
        <p className="mensaje-vacio">Cargando datos...</p>
      ) : sinInscripciones ? (
        <p className="mensaje-vacio">No hay inscripciones disponibles en este momento.</p>
      ) : sinResultadosBusqueda ? (
        <p className="mensaje-vacio">No se encontraron resultados para tu búsqueda.</p>
      ) : (
        <div className="tarjetas">
          {inscripcionesFiltradas.map((inscripcion) => {
            const taller = obtenerTallerPorId(inscripcion.taller);
            const nombreCompleto = `${inscripcion.nombres || ''} ${inscripcion.apellidos || ''}`.trim();
            return (
              <InscripcionCard
                key={inscripcion.id}
                nombres={nombreCompleto || "Sin nombre"}
                correo={inscripcion.correo || "Sin correo"}
                tallerNombre={taller.nombre || "Taller no encontrado"}
                tallerDescripcion={taller.descripcion || "Sin descripción"}
                tallerProfesor={taller.profesor || "Sin profesor"}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

