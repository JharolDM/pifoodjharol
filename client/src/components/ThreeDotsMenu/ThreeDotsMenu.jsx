import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ThreeDotsMenu.module.css';

const ThreeDotsMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className={`${styles.menu} ${isMenuOpen && styles.active}`} onClick={handleCloseMenu}>
        <Link to="/home" className={styles.link}>
          <p>Back to Home</p>
        </Link>
        <Link to="/create" className={styles.link}>
          <p>Create new recipe</p>
        </Link>
        <Link to="/about" className={styles.link}>
          <p>About</p>
        </Link>
        <Link to="/" className={styles.link}>
          <p>Back to Landing</p>
        </Link>
      </div>
      {isMenuOpen && <div className={styles.backdrop} onClick={handleCloseMenu}></div>}
    </>
  );
};

export default ThreeDotsMenu;
