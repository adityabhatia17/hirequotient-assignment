import Table from "../Table/Table";
import LeftNavbar from "./components/LeftNavbar/LeftNavbar";
import Navbar from "./components/Navbar/Navbar";
import styles from "./layout.module.css";

const Layout = ({ children }) => {
  return (
    <div style={{ boxSizing: "border-box" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftNavbar />
        <main className={styles.mainContainer}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
