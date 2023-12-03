import styles from "./leftNavbar.module.css";

const LeftNavbar = () => {
  return (
    <nav className={styles.leftNavbar}>
      <ul>
        <li>
          <a>Dashboard</a>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNavbar;
