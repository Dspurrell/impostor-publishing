import React from "react";
import axios from "axios";
import Layout from "../components/Layout";

import * as indexStyles from "../styles/index.module.css";
import satelites from "../images/Satelites.jpg";
import { useEffect } from "react";
const Index = () => {
  const fetchData = async () => {
    const results = await axios.get(
      "http://localhost:8888/.netlify/functions/stripeGetProducts"
    );
    console.log(results.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout>
      <div className={indexStyles.blog}>
        <div className={indexStyles.imageInfo}>
          <img src={satelites} alt="Book Cover" />
        </div>

        <div className={indexStyles.blogText}>
          <p className={indexStyles.pHeader}>Book Title</p>
          <p className={indexStyles.pText}>Book description</p>
        </div>
        <div className={indexStyles.newsletter}>
          <p className={indexStyles.pHeader}>Newsletter</p>
          <p className={indexStyles.pText}>Important news</p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
