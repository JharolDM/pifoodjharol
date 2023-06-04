import Loader from '../../components/Loader/Loader';
import Pagination from "../../components/Pagination/Pagination";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRecipe } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import style from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [stepsPerPage] = useState(1); // Define el número de pasos por página

  useEffect(() => {
    dispatch(getRecipe(id))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        alert(`Error:\n${error.response}\n${error.response}`)
        setLoading(false);
      });
  }, [dispatch, id]);

  const recipe = useSelector((state) => state.recipe);

  if (!recipe || !recipe.analyzedInstructions || recipe.analyzedInstructions.length === 0) {
    // Manejar el caso cuando la receta o las instrucciones analizadas no están disponibles
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

  // Calcula el índice del último paso de la página actual
  const indexOfLastStep = (currentPage + 1) * stepsPerPage;

  // Calcula el índice del primer paso de la página actual
  const indexOfFirstStep = indexOfLastStep - stepsPerPage;

  // Obtiene los pasos de la página actual
  const currentSteps = recipe.analyzedInstructions[0].steps.slice(indexOfFirstStep, indexOfLastStep);

  // Cambia la página actual
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <>
      {loading || !recipe ? (
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
                    <Pagination
                  totalPages={recipe.analyzedInstructions[0].steps.length}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  />
                  )}
                </div>

          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
