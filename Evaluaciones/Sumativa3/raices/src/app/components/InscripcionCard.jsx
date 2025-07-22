export default function InscripcionCard({ nombres, correo, tallerNombre, tallerDescripcion, tallerProfesor }) {
  return (
    <div className="tarjeta tarjeta-hover">
      <h3 className="nombre-inscrito">{nombres}</h3>
      <p className="campo"><strong>Correo:</strong> {correo}</p>
      <p className="campo"><strong>Taller:</strong> {tallerNombre}</p>
      <span className="descripcion">{tallerDescripcion}</span>
      <p className="campo"><strong>Profesor:</strong> {tallerProfesor}</p>
    </div>
  );
}


