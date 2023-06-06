import style from './Card.module.css'; // Importa los estilos CSS específicos para el componente de tarjeta
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom para manejar la navegación entre rutas

const Card = (props) => {
  const id = props.id; // Obtiene el ID de la tarjeta de las props

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h3>{props.title}</h3> {/* Renderiza el título de la receta */}
        <h4>Health Score: {props.healthScore}</h4> {/* Renderiza el puntaje de salud de la receta */}
      </div>
      <div className={style.list}>
        <Link to={`/detail/${id}`}>
          {/* Crea un enlace que navega a la ruta "/detail/:id" donde ":id" es el ID de la receta */}
          <img className={style.img} src={props.image} alt={props.title} /> {/* Renderiza la imagen de la receta */}
        </Link>
        {props.diets && (
          <ul className={style.dietList}>
            <h4>Diet Types:</h4> {/* Renderiza el título de los tipos de dieta */}
            {props.diets.map((diet, index) => (
              <li key={index}>{diet}</li> /* Renderiza cada tipo de dieta como un elemento de lista */
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Card;
