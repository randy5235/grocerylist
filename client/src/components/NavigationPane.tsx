import * as styles from '../styles/NavigationPane.module.css';

export default function NavigationPane() {
  return (
    <div className={styles.navPane}>
    <nav >
        <button>Home</button>
        <button>About</button>
        <button>Services</button>
        <button>Contact</button>
    </nav>
    </div>
  );
}