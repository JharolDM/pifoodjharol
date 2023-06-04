import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.landing}>
      <div>
      <h1 className={styles.title}>foods API project</h1>
      <Link to="/home">
        <button className={styles.button}> Home </button>
      </Link>
      </div>
    </div>
  );
}

export default Landing;
