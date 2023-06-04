import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  sortAZAsc,
  sortAZDes,
  sortHSAsc,
  sortHSDes,
  filterSource,
  filterByDiets,
  getDiets,
  filterSourceApi,
  filterSourceCreate,
  resetFilters
} from "../../redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import style from "./Buttons.module.css";

const Buttons = ({
  sortAZAsc,
  sortAZDes,
  sortHSAsc,
  sortHSDes,
  filterSource,
  filterByDiets,
}) => {
  const dispatch = useDispatch();
  const allDiets = useSelector(state => state.diets);

  const handleReset = () => {
    dispatch(resetFilters());
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handleSortAZChange = (e) => {
    const value = e.target.value;
    if (value === "asc") {
      sortAZAsc();
    } else if (value === "des") {
      sortAZDes();
    }
  };

  const handleSortHSChange = (e) => {
    const value = e.target.value;
    if (value === "asc") {
      sortHSAsc();
    } else if (value === "des") {
      sortHSDes();
    }
  };

  const handleSourceChange = (creator) => {
    if (creator === "API") {
      dispatch(filterSourceApi());
    } else if (creator === "Database") {
      dispatch(filterSourceCreate());
    } else {
      // Si se selecciona "All Recipes" o cualquier otro valor, no se aplica ningún filtro
      dispatch(filterSource("none"));
    }
  };

  const handleDietChange = (e) => {
    const value = e.target.value;
    filterByDiets(value === "" ? "all" : value);
  };

  return (
    <div className={style.filterContainer}>
      <form>
        <div className={style.filterColumn}>
          <label>Sort A-Z:</label>
          <select className={style.filterSelect} onChange={handleSortAZChange}>
            <option value="">Select</option>
            <option value="asc">A-Z Ascending</option>
            <option value="des">Z-A Descending</option>
          </select>
        </div>
        <div className={style.filterColumn}>
          <label>Sort by Health Score:</label>
          <select className={style.filterSelect} onChange={handleSortHSChange}>
            <option value="">Select</option>
            <option value="asc">100-0 Descending</option>
            <option value="des">0-100 Ascending</option>
          </select>
        </div>
        <div className={style.filterColumn}>
          <label>Filter By Source:</label>
          <select className={style.filterSelect} onChange={(e) => handleSourceChange(e.target.value)}>
            <option value="none">All Recipes</option>
            <option value="API">API Recipes</option>
            <option value="Database">Database Recipes</option>
          </select>
        </div>
        <div className={style.filterColumn}>
          <label>Filter By Diet:</label>
          <select className={style.filterSelect} onChange={handleDietChange}>
            <option value="">All Diets</option>
            {allDiets.map((diet) => (
              <option key={diet} value={diet}>
                {diet}
              </option>
            ))}
          </select>
        </div>
        <div className={style.buttonsContainer}>
      <button className={style.button} onClick={handleReset}>
        Reset Filters
      </button>
    </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    diets: state.diets
  };
};

const mapDispatchToProps = {
  sortAZAsc,
  sortAZDes,
  sortHSAsc,
  sortHSDes,
  filterSource,
  filterByDiets
};

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
