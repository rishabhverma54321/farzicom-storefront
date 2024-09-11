import React from "react";
import ReactSVG from "react-svg";
//FIXME:NextJs Make it a CSS module
//import "./index.scss";
import Insta from "./assets/instaWhite.svg";
import Facebook from "./assets/facebookWhite.svg";
import Twitter from "./assets/twitterWhite.svg";
import PlixLogo from "./assets/plixLogo.svg";

export const SignupSection: React.FC = () => {
  return (
    <div className="signupContainer">
      <div className="signupSection">
        <p className="signUpHeading">Sign up for our newsletter</p>
        <p className="signUpDescription">
          Get a sneak peek on upcoming promos and first look of our new
          launches.
        </p>
        <div className="emailInputWrapper">
          <input className="emailInput" placeholder="Email Address" />
          <button className="emailInputButton">Sign Up</button>
        </div>
        <p className="privacyPolicyText">
          By signing up, you agree to our Privacy Policy
        </p>
      </div>
      <div className="contactUsIcons">
        <a target="_blank" href="https://www.instagram.com/swa.artisanalsyrups/">
          <ReactSVG path={PlixLogo} style={{ marginRight: "10px" }} />
        </a>
        <div>
          <a className="social-icons" target="_blank" href="https://www.instagram.com/swa.artisanalsyrups/">
            <ReactSVG path={Facebook} style={{ marginRight: "10px" }} />
          </a>
          <a className="social-icons" target="_blank" href="https://www.instagram.com/swa.artisanalsyrups/">
            <ReactSVG path={Twitter} style={{ marginRight: "10px" }} />
          </a>
          <a className="social-icons" target="_blank" href="https://www.instagram.com/swa.artisanalsyrups/">
            <ReactSVG path={Insta} style={{ marginRight: "10px" }} />
          </a>
        </div>
      </div>
    </div>
  );
};
SignupSection.displayName = "SignupSection";
export default SignupSection;
