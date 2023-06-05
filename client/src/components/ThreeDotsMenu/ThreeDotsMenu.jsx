import { Link } from 'react-router-dom';
import styles from './ThreeDotsMenu.module.css';

const ThreeDotsMenu = () => {
  const menuItems = [
    { label: 'Back to Home', path: '/home' },
    { label: 'Create new recipe', path: '/create' },
    { label: 'About', path: '/about' },
    { label: 'Back to Landing', path: '/' }
  ];

  return (
    <div className={styles.menu}>
      {menuItems.map((item, index) => (
        <Link to={item.path} className={styles.link} key={index}>
          <p>{item.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default ThreeDotsMenu;
