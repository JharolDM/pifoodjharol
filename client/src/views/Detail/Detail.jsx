import Loader from '../../components/Loader/Loader';
import Pagination from "../../components/Pagination/Pagination";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRecipe, deleteRecipe } from '../../redux/actions';
import { useParams, useHistory } from 'react-router-dom';
import style from './Detail.module.css';

const Detail = () => {
  const { id } = useParams(); // Obtener el parámetro de la URL (ID de la receta)
  const dispatch = useDispatch(); // Obtener la función dispatch del store
  const history = useHistory(); // Obtener el objeto de historial para redireccionar
  const [loading, setLoading] = useState(true); // Estado para controlar si se está cargando la receta
  const [currentPage, setCurrentPage] = useState(0); // Estado para controlar la página actual de los pasos
  const [stepsPerPage] = useState(1); // Número de pasos a mostrar por página

  useEffect(() => {
    // Obtener la receta al cargar el componente
    dispatch(getRecipe(id))
      .then(() => {
        setLoading(false); // Se ha cargado la receta, cambiar el estado de carga a false
      })
      .catch((error) => {
        console.log(error.response);
        alert(`Error:\n${error.response}\n${error.response}`);
        setLoading(false); // Ocurrió un error al obtener la receta, cambiar el estado de carga a false
      });
  }, [dispatch, id]);

  const recipe = useSelector((state) => state.recipe); // Obtener la receta del estado global

  const handleDelete = () => {
    // Eliminar la receta
    if (typeof recipe.id === "string") {
      dispatch(deleteRecipe(recipe.id))
        .then(() => {
          history.push('/recipes'); // Redireccionar al listado de recetas después de eliminar
        })
        .catch((error) => {
          console.log(error.response);
          alert(`Error:\n${error.response}\n${error.response}`);
        });
    }
  };

  if (!recipe || !recipe.analyzedInstructions || recipe.analyzedInstructions.length === 0) {
    // Mostrar una versión simplificada si no hay instrucciones analizadas en la receta
    return (
      <>
        <div className={style.mainCont}>
          <div className={style.container}>
            <div className={style.cardDetails}>
              <h2>{recipe.title} Id: {recipe.id}</h2>
              <img className={style.image} src={recipe.image} alt={recipe.title} />
              <div className={style.article}>
                <article dangerouslySetInnerHTML={{ __html: recipe.summary }} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const indexOfLastStep = (currentPage + 1) * stepsPerPage; // Índice del último paso de la página actual
  const indexOfFirstStep = indexOfLastStep - stepsPerPage; // Índice del primer paso de la página actual
  const currentSteps = recipe.analyzedInstructions[0].steps.slice(indexOfFirstStep, indexOfLastStep); // Pasos de la página actual

  const handlePageChange = (pageIndex) => {
    // Cambiar de página de pasos
    setCurrentPage(pageIndex);
  };

  return (
    <>
      {loading || !recipe ? (
        // Mostrar el componente Loader mientras se carga la receta
        <Loader />
      ) : (
        <div className={style.mainCont}>
          <div className={style.container}>
            <div className={style.cardDetails}>
              <h2>{recipe.title} Id: {recipe.id}</h2>
              <img className={style.image} src={recipe.image} alt={recipe.title} />
              <div className={style.article}>
                <article dangerouslySetInnerHTML={{ __html: recipe.summary }} />
              </div>
            </div>
            <div className={style.cardSteps}>
              {currentSteps.map((step) => (
                <div className={style.stepCard} key={step.number}>
                  <div>
                    <h3>Step {step.number}</h3>
                    <p>{step.step}</p>
                  </div>
                  <div>
                    {step.ingredients.length > 0 && (
                      <div>
                        <h4>Ingredients:</h4>
                        <ul>
                          {step.ingredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {step.equipment.length > 0 && (
                      <div>
                        <h4>Equipment:</h4>
                        <ul>
                          {step.equipment.map((equipment) => (
                            <li key={equipment.id}>{equipment.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className={style.pagination}>
                {recipe.analyzedInstructions[0].steps.length > stepsPerPage && (
                  // Mostrar el componente Pagination si hay más pasos que los que se muestran por página
                  <Pagination
                    totalPages={recipe.analyzedInstructions[0].steps.length}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
            {typeof recipe.id === "string" && (
              // Mostrar el botón de eliminar receta si el ID de la receta es de tipo string
              <div>
                <button className={style.button} onClick={handleDelete}>Delete Recipe</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
