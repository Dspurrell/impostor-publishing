import React from "react";
import { Link } from "gatsby";

import * as layoutStyles from "../styles/layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={layoutStyles.layoutBody}>
      <header>
        {/* <div className={layoutStyles.iconContainer}>
          <i className={layoutStyles.icon} aria-hidden="true">
            icon
          </i>
          <i className={layoutStyles.icon} aria-hidden="true">
            Icon
          </i>
          <i className={layoutStyles.icon} aria-hidden="true">
            Icon
          </i>
        </div> */}
        <h1>Impostor Publishing</h1>
        <div>
          <nav>
            <ul className="flex navbar">
              <li></li>
              <li>
                <Link to="/products">Buy</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <p className="pText">Impostor Publishing Website</p>
      </footer>
    </div>
  );
};

export default Layout;
