
import React from "react";
import "./Toggle.css";

const Toggle = ({ isChecked, handleToggle, size }) => {
  return (
    <div className={`toggle tg-${size}`}>
      {/* <h1>toggle</h1> */}
      <label className={`switch tg-lab-${size}`}>
        <input
          type="checkbox"
          className="toggle-checkbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <span className={`slider tg-${size}`}></span>
      </label>
    </div>
  );
};


export default Toggle;