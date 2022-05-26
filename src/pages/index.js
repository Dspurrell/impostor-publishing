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
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout>
      <div className={indexStyles.blog}>
        <div className={indexStyles.imageInfo}>
          <img
            src={satelites}
            alt="Book Cover"
            height="1080px"
            width="1080px"
          />
        </div>

        <div className={indexStyles.blogText}>
          <p className={indexStyles.pHeader}>Book Title</p>
          <p className={indexStyles.pText}>Place book description here.</p>
        </div>
        <div className={indexStyles.newsletter}>
          <p className={indexStyles.pHeader}>Newsletter</p>
          <p className={indexStyles.pText}>Place important news here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
