import React from "react";
// import from "@components/templates/AppHeader/style.scss"


type RedirectDetailsProps = {
  countryCode: null | number | string;
  onClose?: (_i: null | boolean) => void;
};

const RedirectCountryPopup = ({ countryCode, onClose }: RedirectDetailsProps) => {
    
  return (
    <div className="redirect-container">
        <div className="content_wrapper">
            <div>
            <p>Based on your location you have been directed to plixlife.com </p>
            <p><span className="subtext">Do you want to</span> <a href={`https://${countryCode}.plixlife.com?redirectOverride=true`} id="goto" data-prevsource={countryCode}>go to <span>{`${countryCode}.plixlife.com`}</span>?</a></p>
            </div>
            <div className="close-btn" onClick={() => onClose(false)}>&#10005;</div>
        </div>
    </div>
  );
};

export default RedirectCountryPopup;
