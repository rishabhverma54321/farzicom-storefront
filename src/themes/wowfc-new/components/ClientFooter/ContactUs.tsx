import React from "react";
import ReactSVG from "react-svg";
import MemoFacebookSVG from "./assets/FacebookSVG";
import MemoInstagramSVG from "./assets/InstagramSVG";
// import "./index.scss";
// import Insta from "./assets/Vector (3).svg";
// import Facebook from "./assets/Vector (4).svg";
import MemoYoutubeSVG from "./assets/YoutubeSVG";

export const ContactUs: React.FC = () => {
  return (
    <div className="contactusContainer">
      <div className="contactusHeading">ContactUs</div>
      <div className="contacUsBlock">
        <p className="contactTitle">Write us:</p>
        <p className="contactDescription">support@buywow.in</p>
      </div>
      <div className="contacUsBlock">
        <p className="contactTitle">Call us:</p>
        <p className="contactDescription">+91-80-42896000</p>
      </div>
      <div className="contacUsBlock">
        <p className="contactTitle">Address:</p>
        <p className="contactDescription" style={{ maxWidth: "250px" }}>
          Body Cupid Pvt Ltd. #51, IndiQube Penta, 5th Floor, Richmond Road,
          Bengaluru 560025, Karnataka, India.
        </p>
      </div>
      <div className="contacUsBlock">
        <p className="contactTitle">Follow us on</p>
        <div style={{ display: "flex", marginTop: "5px", gap: "1rem" }}>
          <a
            href="https://www.instagram.com/wowlifescienceindia/?hl=en"
            target="_blank"
          >
            <MemoInstagramSVG />
          </a>
          <a
            href="https://www.facebook.com/wowlifescienceindia/"
            target="_blank"
          >
            <MemoFacebookSVG />
          </a>
          <a href="https://youtube.com/c/WOWLifeScience" target="_blank">
            <MemoYoutubeSVG />
          </a>
        </div>
      </div>
    </div>
  );
};
ContactUs.displayName = "ContactUs";
export default ContactUs;
