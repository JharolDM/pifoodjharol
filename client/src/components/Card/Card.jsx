import style from './Card.module.css'
import {Link} from "react-router-dom";

const Card = (props) => {
  const id = props.id
  return (
    <div className={style.container}>
      <div className={style.title}>
        <h3>{props.title}</h3>
        <h4>Health Score: {props.healthScore}</h4>
        </div>
      <div className={style.list}>
      <Link to={`/detail/${id}`}>
      <img className={style.img} src={props.image} alt={props.title} />
      </Link>
      {props.diets && (
           <ul className={style.dietList}> <h4>Diet Types:</h4>
           {props.diets.map((diet, index) => (
             <li key={index}>{diet}</li>
           ))}
         </ul> 
      )}
      </div>
    </div>
  );
};

export default Card;
