import React from 'react';
import styles from './Loader.module.css'; // Importa los estilos CSS específicos para el componente del cargador

const Loader = () => {
  return (
  <div className={styles.loader}> 
      <div className={styles.card}> 
        <div className={styles.spinner}></div> 
      </div>
    </div>
  );
};

export default Loader;
