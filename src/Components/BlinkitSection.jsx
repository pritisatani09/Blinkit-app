import React from "react";
import "./BlinkitSection.css";

import paanImg from "../assets/pann.png";
import pharmacyImg from "../assets/pharmacy.png";
import petcareImg from "../assets/Pet-Care_WEB.png";
import babycareImg from "../assets/babycare-WEB.png";

const BlinkitSection = () => {
  return (
    <div className="blinkit-section">
      <div className="paan-header">
        <img src={paanImg} alt="Paan Corner" />
      </div>

      <div className="three-boxes">
        <div className="box">
          <img src={pharmacyImg} alt="Pharmacy" />
        </div>
        <div className="box">
          <img src={petcareImg} alt="Pet Care" />
        </div>
        <div className="box">
          <img src={babycareImg} alt="Baby Care" />
        </div>
      </div>
    </div>
  );
};

export default BlinkitSection;
