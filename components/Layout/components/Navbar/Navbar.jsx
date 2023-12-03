import styles from "./navbar.module.css";
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <a>Logo</a>
      </div>
      <div className={styles.logout}>
        <button>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
