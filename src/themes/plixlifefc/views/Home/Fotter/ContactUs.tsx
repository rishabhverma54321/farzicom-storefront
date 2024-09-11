import React from "react";
import ReactSVG from "react-svg";
//FIXME:NextJs Make it a CSS module
//import "./index.scss";
import Insta from "./assets/Vector (3).svg";
import Facebook from "./assets/Vector (4).svg";
import Twitter from "./assets/Vector (5).svg";

export const ContactUs: React.FC = () => {
  return (
    <div className="contactusContainer">
      <div className="contactusHeading">ContactUs</div>
      <div className="contacUsBlock">
        <p className="contactTitle">Write us:</p>
        <p className="contactDescription"> care@drinkswa.com</p>
      </div>
      <div className="contacUsBlock">
        <p className="contactTitle">Call us:</p>
        <p className="contactDescription">+91 87623-13885</p>
      </div>
      <div className="contacUsBlock">
        <p className="contactTitle">Address:</p>
        <p className="contactDescription" style={{ maxWidth: "250px" }}>
          Swa Artisanal Syrups, #365, 1st Floor, 3rd Cross, Opp HLRC, Whitefield
          Main Rd, Bengaluru, Karnataka 560066
        </p>
      </div>
      <div className="contacUsBlock">
        <p className="contactTitle">Follow us on</p>
        <div style={{ display: "flex", marginTop: "5px" }}>
          <a href="https://www.instagram.com/swa.artisanalsyrups/">
            <ReactSVG path={Insta} style={{ marginRight: "10px" }} />
          </a>
          <a href="https://www.instagram.com/swa.artisanalsyrups/">
            <ReactSVG path={Facebook} style={{ marginRight: "10px" }} />
          </a>
          <a href="https://www.instagram.com/swa.artisanalsyrups/">
            <ReactSVG path={Twitter} style={{ marginRight: "10px" }} />
          </a>
        </div>
      </div>
    </div>
  );
};
ContactUs.displayName = "ContactUs";
export default ContactUs;
