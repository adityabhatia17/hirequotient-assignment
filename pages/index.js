import Layout from "@/components/Layout/Layout";
import Table from "@/components/Table/Table";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.container}>
      <Layout>
        <Table />
      </Layout>
    </div>
  );
}
