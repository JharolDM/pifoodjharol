import { useState } from "react";
// import { useState, useEffect } from "react";
import { validate } from "./validator";
import axios from "axios";
import style from "./Form.module.css";
import { useHistory } from 'react-router-dom';

// import { useDispatch, useSelector } from "react-redux";
// import { getDiets }from "../../redux/actions";

const Form = () => {
  const history = useHistory();

  // const dispatch = useDispatch();
  // const allDiets = useSelector(state => state.diets);

  // useEffect(() => {
  //   dispatch(getDiets());
  // }, [dispatch]);
  
  
  // Definición de la lista de dietas disponibles
  const allDiets = [
    "dairy free",
    "fodmap friendly",
    "gluten free",
    "ketogenic",
    "lacto ovo vegetarian",
    "paleolithic",
    "pescatarian",
    "primal",
    "vegan",
    "vegetarian",
    "whole 30",
  ];

  // Estado inicial del formulario
  const [form, setForm] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: "",
    diets: [],
    analyzedInstructions: []
  });

  // Estado inicial de los errores del formulario
  const [errors, setErrors] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: "",
    diets: "",
    analyzedInstructions: ""
  });

  const [stepCount, setStepCount] = useState(0);


  // Manejador de cambios de los campos de entrada del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
    const newErrors = validate({
      ...form,
      [name]: value
    });
    setErrors(newErrors);
  };

 // Manejador de cambios de las opciones de dieta
const handleDietsChange = (event) => {
  const { value, checked } = event.target;
  const prevForm = { ...form };

  if (checked) {
    prevForm.diets = [...prevForm.diets, value];
  } else {
    prevForm.diets = prevForm.diets.filter((diet) => diet !== value);
  }

  setForm(prevForm);

  const newErrors = validate(prevForm);
  setErrors(newErrors);
};



  // Manejador de cambios del número de pasos en las instrucciones
  const handleStepsChange = (event) => {
    const { value } = event.target;
    const stepsCount = parseInt(value);
  
    if (!isNaN(stepsCount) && stepsCount >= 0 && stepsCount <= 10) {
      const updatedSteps = [];
  
      for (let i = 0; i < stepsCount; i++) {
        updatedSteps.push({ step: "" });
      }
  
      setForm((prevForm) => ({
        ...prevForm,
        analyzedInstructions: updatedSteps
      }));
      setStepCount(stepsCount);
    }
  };
  

  // Manejador de cambios de un paso en las instrucciones
  const handleStepChange = (index, value) => {
    const updatedSteps = [...form.analyzedInstructions];
    updatedSteps[index] = { step: value };
  
    setForm((prevForm) => ({
      ...prevForm,
      analyzedInstructions: updatedSteps
    }));
  
    const newErrors = validate({
      ...form,
      analyzedInstructions: updatedSteps
    });
    setErrors(newErrors);
  };
  

  // Manejador del envío del formulario
  const submitHandler = (event) => {
    event.preventDefault();
  
    // Verificar si hay algún paso vacío
    const hasEmptyStep = form.analyzedInstructions.some((step) => step.step.trim() === "");
  
    if (hasEmptyStep) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        analyzedInstructions: "Please fill in all steps"
      }));
      return; // Evita que el formulario se envíe
    }
      else {
      // Creación de las instrucciones analizadas para enviar al backend
      const analyzedInstructions = [
        {
          name: "",
          steps: form.analyzedInstructions.map((step, index) => ({
            number: index + 1,
            step: step.step,
            ingredients: [],
            equipment: [],
          })),
        },
      ];
  
      const updatedForm = {
        ...form,
        analyzedInstructions,
      };
  
      // Envío del formulario al servidor usando axios
      axios
        .post("http://localhost:3001/recipes", updatedForm)
        .then((res) => {
          alert(`Success!!\n${res.statusText}\nID:${res.data[0].id}\n${res.data[0].title}`);
          history.push("/home"); // Redireccionar al home después de crear la receta
        })
        .catch((error) => {
          alert(`ERROR\nStatus: ${error.response.status}\nMessage: ${error.response.data.error}`);
        });
    }
  };

//   fetch("http://localhost:3001/recipes", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedForm),
//   })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error(
//           `ERROR\nStatus: ${res.status}\nMessage: ${res.statusText}`
//         );
//       }
//     })
//     .then((data) => {
//       alert(`Success!!\nID:${data[0].id}\n${data[0].title}`);
//       history.push("/home"); // Redireccionar al home después de crear la receta
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// };

    
  

  // Renderizado del componente del formulario
  return (
    <>
      <div className={style.mainCont}>
        <div className={style.formContainer}>
          <h3>Create a new recipe</h3>
          <form onSubmit={submitHandler}>
            {/* Campo de entrada para el título */}
            <div>
              <label htmlFor="title">Recipe title: </label>
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleInputChange}
              />
              {errors.title && <span> {errors.title}</span>}
            </div>
            
            {/* Campo de entrada para la URL de la imagen */}
            <div>
              <label htmlFor="image">Image URL: </label>
              <input
                type="text"
                id="image"
                name="image"
                value={form.image}
                onChange={handleInputChange}
              />
              {errors.image && <span> {errors.image}</span>}
            </div>
            
            {/* Campo de entrada para el resumen */}
            <div>
              <label htmlFor="summary">Description: </label>
              <input
                type="text"
                id="summary"
                name="summary"
                value={form.summary}
                onChange={handleInputChange}
              />
              {errors.summary && <span> {errors.summary}</span>}
            </div>
            
            {/* Campo de entrada para el HealthScore */}
            <div>
              <label htmlFor="healthScore">HealthScore (0-100): </label>
              <input
                type="number"
                id="healthScore"
                name="healthScore"
                value={form.healthScore}
                min="0"
                max="100"
                onChange={handleInputChange}
              />
              {errors.healthScore && <span> {errors.healthScore}</span>}
            </div>
            
            
            {/* Campo de entrada para el número de pasos */}
            <div>
              <label htmlFor="steps">Steps For Recipe: </label>
              <input
                type="number"
                id="steps"
                name="steps"
                value={form.analyzedInstructions.length}
                min="0"
                onChange={handleStepsChange}
              />
            </div>
            
            {/* Pasos de las instrucciones */}
            {errors.analyzedInstructions && <span className={style.error}> {errors.analyzedInstructions}</span>}
{form.analyzedInstructions.slice(0, stepCount).map((step, index) => (
  <div key={index}>
    <label htmlFor={`step-${index}`}>Step {index + 1}: </label>
    <input
      type="text"
      id={`step-${index}`}
      name={`step-${index}`}
      value={step.step}
      onChange={(event) => handleStepChange(index, event.target.value)}
    />
    {step.step.trim() === "" && <span className={style.error}>Step cannot be empty</span>}
  </div>
))}


            {/* Opciones de dieta */}
            <div className={style.dietsBoxes}>
              <label htmlFor="">Diets: </label>
              {allDiets.map((option) => (
                <div key={option}>
                  <label>
                    <input
                      type="checkbox"
                      value={option}
                      checked={form.diets.includes(option)}
                      onChange={handleDietsChange}
                    />
                    {option}
                  </label>
                </div>
              ))}
              {errors.diets && <span> {errors.diets}</span>}
            </div>
            
            {/* Botón de envío */}
            <button type="submit" disabled={Object.values(errors).some((error) => error !== "") ||
                Object.values(form).some((value) => value === "") ||
                form.analyzedInstructions.length === 0 }>
              Submit Recipe
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Form;
