// Agregamos la fuente Montserrar de Google Fonts
import { Montserrat } from "next/font/google";

// Importamos los estilos definidos en el globals.css
import './globals.css';

// Definimos las características de la fuente agregada
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat'
});

// Definimos datos básicos adicionales de la página
export const metadata = {
  title: 'Listado de inscripciones',
  description: 'Aplicación demo en Next.js para mostrar listado de inscripciones',
};

// Esta es la función que crea la estructura del sitio, variable del contenido
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={montserrat.variable}>
        <header>
          <h1 className="text-3xl font-bold mb-6 text-center">Listado de inscripciones</h1>
        </header>
        {children}
        <hr className="border-red-500"/>
        <footer>
          <p>Creado por: <a href="mailto:camilomonsalve07@inacapmail.cl">Camilo Monsalve</a></p>
        </footer>
      </body>
    </html>
  );
}