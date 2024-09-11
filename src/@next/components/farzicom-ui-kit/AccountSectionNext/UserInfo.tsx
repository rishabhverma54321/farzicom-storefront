import { CachedImage } from "@components/molecules/CachedImage";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { useAuth, useAuthState, useCheckout } from "@saleor/sdk";
import { getMetadataValue, parseJson } from "@utils/misc";
import { useRef, useState } from "react";
import styles from "./index.module.scss";

const  UserInfo = () =>{
    const { user } = useAuthState();
    const [showLogoutpopup,setshowLogoutpopup] = useState(false);
    const targetRef = useRef(null);
    const history = useCustomHistory();

    const { signOut, setToken } = useAuth();
    const closeHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        if( targetRef.current &&  !targetRef.current.contains(event.target)){
          setshowLogoutpopup(false);
        }
    }
    const { createCheckout, addPromoCode, createCheckoutRest } = useCheckout();

    const handleSignOut = () => {
        signOut().then(res => {
          //
          createCheckoutRest().then(res => {
            //
            if (res.errors?.length) {
              createCheckoutRest();
            }
          });
          history.push({
            pathname: "/",
          });
        });
      };

    const userAltEmail =
    getMetadataValue(user?.metadata, "alt_email") &&
    parseJson(getMetadataValue(user?.metadata, "alt_email"));
    const validUserMail =
      typeof user?.email === "string" && user?.email.includes("@example.com")
        ? userAltEmail
        : user?.email;

    return(
        <>
          <div className={styles.userInfo}>
            <div className={styles.inner_user_info}>
                <div className={styles.userinfor_content}>
                    <div className={styles.user_avatar}>
                    <CachedImage 	
                        url="https://plixlifefc-media.farziengineer.co/hosted/avatar-0e8296d1566e-d98297b07b3b.png"
                        isNextImage={true}	
                        nextImageLayout="fill"	
                        nextImageObjectFit="contain"	
                    />
                    </div>
                    <div className={styles.user_details}>
                    <p>{validUserMail}</p>
                    {user?.addresses[0]?.phone ? 
                    <span>{`+91 ${user?.addresses[0]?.phone?.split("+91")[1]}`}</span>
                    :
                    <span>-</span>
                    }
                    </div>
                </div>
                <div className={styles.logout}>
                    <p onClick={()=>setshowLogoutpopup(true)}>Logout</p>
                    <div className={styles.logout_icon}>
                    <CachedImage 	
                        url="https://plixlifefc-media.farziengineer.co/hosted/sign-out-1f55db50552e-ae9b6ec933a2.png"
                        isNextImage={true}	
                        nextImageLayout="fill"	
                        nextImageObjectFit="contain"	
                    />
                    </div>
                </div>
            </div>
            <div className={styles.orderHistoryImage1}>
            <CachedImage 	
                    url="https://plixlifefc-media.farziengineer.co/hosted/order_history_image1-10a32b7403ba-ff7bd0fccea3.png"
                    isNextImage={true}	
                    nextImageLayout="fill"	
                    nextImageObjectFit="contain"	
                />
            </div>
            <div className={styles.orderHistoryImage2}>
            <CachedImage 	
                    url="https://plixlifefc-media.farziengineer.co/hosted/order_history_image2-beb9aa09ec8a-823ad2c8fcc4.png"
                    isNextImage={true}	
                    nextImageLayout="fill"	
                    nextImageObjectFit="contain"	
                />
            </div>
            <div className={styles.orderHistoryImage3}>
            <CachedImage 	
                    url="https://plixlifefc-media.farziengineer.co/hosted/order_history_image3-f9d9c3d02402-7449dfc849dd.png"
                    isNextImage={true}	
                    nextImageLayout="fill"	
                    nextImageObjectFit="contain"	
                />
            </div>
        </div>

        {/* logout popup */}
        {showLogoutpopup && 
        <div className={styles.logout_popup_wrapper} onClick={(e)=>closeHandler(e)}>
            <div className={styles.logoutpopup} ref={targetRef}>
                <h3>Are you sure you want to logout?</h3>
                <div className={styles.buttons_wrapper}>
                <button onClick={()=>setshowLogoutpopup(false)}>cancel</button>
                <button onClick={handleSignOut}>Logout</button>
                </div>
            </div>
        </div>
        }
        </>
    );
}

export default UserInfo;