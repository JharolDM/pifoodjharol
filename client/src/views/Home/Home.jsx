import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false); // Estado local para comprobar si ya se han cargado las recetas

  useEffect(() => {
    if (!loaded) {
      // Si las recetas aún no se han cargado, se llama a la acción "getRecipes" para obtener las recetas del servidor
      dispatch(getRecipes())
        .then(() => {
          setLoading(false);
          setLoaded(true); // Se establece loaded en true para indicar que las recetas ya se han cargado
        })
        .catch((error) => {
          console.log("Error fetching recipes:", error.response.data);
          setLoading(false);
          alert(error.response.data.message);
        });
    }
  }, [dispatch, loaded]);

  return (
    // Si el estado de carga es verdadero o no hay recetas disponibles, se muestra el componente "Loader" (indicador de carga)
    // De lo contrario, se muestra el componente "CardsContainer" que contiene las tarjetas de receta
    <>
      {loading || recipes.length === 0 ? <Loader /> : <CardsContainer />}
    </>
  );
};

export default Home;
