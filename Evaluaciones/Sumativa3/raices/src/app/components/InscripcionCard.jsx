export default function InscriptionCard({ nombres, apellidos, correo, tallerNombre, tallerDescripcion, tallerProfesor }) {
  return (
    <div className="tarjeta">
      <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--fuente-titulos)', color: 'var(--color-primario)' }}>
        {nombres} {apellidos}
      </h3>
      <p style={{ fontFamily: 'var(--fuente-texto)' }}>
        <span className="font-bold">Correo:</span> {correo}
      </p>
      <p style={{ fontFamily: 'var(--fuente-texto)' }}>
        <span className="font-bold">Taller:</span> {tallerNombre}
      </p>
      <p style={{ fontFamily: 'var(--fuente-texto)' }}>
        <span className="font-bold">Descripción:</span> {tallerDescripcion}
      </p>
      <p style={{ fontFamily: 'var(--fuente-texto)' }}>
        <span className="font-bold">Profesor:</span> {tallerProfesor}
      </p>
    </div>
  );
}