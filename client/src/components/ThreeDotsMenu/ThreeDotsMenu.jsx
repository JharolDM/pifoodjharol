// Importa el componente "Link" de react-router-dom para crear enlaces de navegación
import { Link } from 'react-router-dom';
import styles from './ThreeDotsMenu.module.css';

// Define el componente ThreeDotsMenu
const ThreeDotsMenu = () => {
  // Define un arreglo de objetos que contiene las etiquetas de los elementos del menú y sus respectivas rutas
  const menuItems = [
    { label: 'Back to Home', path: '/home' },
    { label: 'Create new recipe', path: '/create' },
    { label: 'About', path: '/about' },
    { label: 'Back to Landing', path: '/' }
  ];

  return (
    <div className={styles.menu}>
      {menuItems.map((item, index) => (
        // Crea un enlace utilizando la ruta del elemento del menú y la clase CSS "link"
        <Link to={item.path} className={styles.link} key={index}> 
          <p>{item.label}</p> 
        </Link>// Muestra la etiqueta del elemento del menú dentro de un párrafo
      ))}
    </div>
  );
};

export default ThreeDotsMenu;
