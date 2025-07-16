"use client";

// Importamos las bibliotecas para utilizar efectos y estados de objetos
import { useEffect, useState } from "react";

// Importamos el componente reusable ClienteCard
import InscripcionCard from "./components/InscripcionCard";

// Definimos el componente principal de la página
export default function Home() {
  // Se declaran los 3 objetos que representarán las entidades de dato de la API
  const [inscripciones, setInscripciones] = useState([]);
  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Definición de la función asíncrona para obtener los datos de la API
    async function fetchData() {
      try {
        // Definimos los objetos y llamamos a los servicios de la API
        const [inscripcionesRes, talleresRes] = await Promise.all([
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/inscripciones.json"),
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/talleres.json"),
        ]);

        // Definimos las variables que estarán esperando los datos de respuesta de 
        // los servicios de la API
        const [inscripcionesData, talleresData] = await Promise.all([
          inscripcionesRes.json(),
          talleresRes.json(),
        ]);

        // Filtramos valores null y aseguramos que sean arreglos
        const arregloInscripciones = inscripcionesData ? inscripcionesData.filter(item => item !== null) : [];
        const arregloTalleres = talleresData ? talleresData.filter(item => item !== null) : [];

        // Almacenamiento de los datos ya obtenidos en los objetos que representan
        // las entidades de datos de la API.
        setInscripciones(arregloInscripciones);
        setTalleres(arregloTalleres);
      } catch (error) {
        // En caso de error, no se detiene el programa
        console.error("Error al cargar datos:", error);
      } finally {
        // Si todo sale bien, se deja de mostrar el mensaje "Cargando datos"
        setCargando(false);
      }
    }

    // Se invoca a la función que obtiene y almacena los datos de la API
    fetchData();
  }, []);

  // Función para obtener detalles de un taller por su ID
  const obtenerTallerPorId = (idTaller) => {
    return talleres.find((taller) => taller.id === idTaller) || {};
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {cargando ? (
        <p className="text-center text-gray-500">Cargando datos...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {inscripciones.map((inscripcion) => {
            const taller = obtenerTallerPorId(inscripcion.taller);
            // Combinamos nombres y apellidos para mostrar un nombre completo
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
    </main>
  );
}