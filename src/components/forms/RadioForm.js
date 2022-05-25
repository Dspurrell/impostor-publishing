import React from "react";

import * as radioFormStyles from "../../styles/radioForm.module.css";

const RadioForm = ({ isPhysical, setIsPhysical, productStyles }) => {
  return (
    <div className={radioFormStyles.container}>
      <div>
        <input
          type="radio"
          id="physical"
          name="type"
          value="physical"
          checked={isPhysical}
          onChange={() => setIsPhysical(!isPhysical)}
        />
        <label htmlFor="physical">Physical</label>
      </div>
      <div>
        <input
          type="radio"
          id="digital"
          name="type"
          value="digital"
          checked={!isPhysical}
          onChange={() => setIsPhysical(!isPhysical)}
        />
        <label htmlFor="digital">Digital</label>
      </div>
    </div>
  );
};

export default RadioForm;
