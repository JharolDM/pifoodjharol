import Loader from '../../components/Loader/Loader';
import Pagination from "../../components/Pagination/Pagination";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRecipe, deleteRecipe } from '../../redux/actions';
import { useParams, useHistory } from 'react-router-dom';
import style from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [stepsPerPage] = useState(1);

  useEffect(() => {
    dispatch(getRecipe(id))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        alert(`Error:\n${error.response}\n${error.response}`);
        setLoading(false);
      });
  }, [dispatch, id]);

  const recipe = useSelector((state) => state.recipe);

  const handleDelete = () => {
    if (typeof recipe.id === "string") {
      dispatch(deleteRecipe(recipe.id))
        .then(() => {
          history.push('/recipes');
        })
        .catch((error) => {
          console.log(error.response);
          alert(`Error:\n${error.response}\n${error.response}`);
        });
    }
  };

  if (!recipe || !recipe.analyzedInstructions || recipe.analyzedInstructions.length === 0) {
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

  const indexOfLastStep = (currentPage + 1) * stepsPerPage;
  const indexOfFirstStep = indexOfLastStep - stepsPerPage;
  const currentSteps = recipe.analyzedInstructions[0].steps.slice(indexOfFirstStep, indexOfLastStep);

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
            {typeof recipe.id === "string" && (
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
