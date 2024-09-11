import React from "react";
import MemoPopCloseIcon from "@components/atoms/SvgIcons/PopupcloseIcon";
import { getMetadataValue, parseJson } from "@utils/misc";
import CardsContainer from "@components/organisms/CardsContainer";
import NewAddToCartButton from "@components/molecules/NewAddToCartButton";
import MemoCaretRightIcon from "@components/atoms/SvgIcons/CarratRightIcon";
import MemoCartPlusIcon from "@components/atoms/SvgIcons/CartPlusIcon";
import MemoStopwatch from "@components/atoms/SvgIcons/Stopwatch";
import * as S from "./CartRow/styles";

const ProductDetailPopup = ({productdata,setpopupstate,showTimer,upsellTimer,upsell_product,upsell_image,onUpsellAdd}:{
    productdata: any;
    setpopupstate: any;
    showTimer?: any;
    upsellTimer?: any;
    upsell_product?: any;
    upsell_image?: any;
    onUpsellAdd?:any;
}) =>{

    let productDetails =
    getMetadataValue(productdata?.metadata, "product_details") &&
    parseJson(getMetadataValue(productdata?.metadata, "product_details")) ||
    getMetadataValue(productdata?.metadata, "perfume_product_details") &&
    parseJson(getMetadataValue(productdata?.metadata, "perfume_product_details"));

    let productShortName =
    getMetadataValue(productdata?.metadata, "product_short_name") &&
    parseJson(getMetadataValue(productdata?.metadata, "product_short_name"));

  
    const howtouse = productDetails ? productDetails?.uses : [];
    const whatsGood = productDetails ? productDetails?.whats_good : [];

    const ingredients = productDetails ? productDetails?.ingredients : [];
    const [ingredientsExpanded, setIngredientsExpanded] = React.useState(false);

    return(
        <>
        {productdata &&
            <div className="popup_overlay">
            <div className="product_popup_info">
                <div className="inner_product_popup">
                    <div className="close_icon" onClick={()=>setpopupstate(false)}>
                        <MemoPopCloseIcon />
                    </div>
                    {upsell_product ? 
                        <div className="product_image_wrapper">
                            <h3>{upsell_product?.product?.name.split(" ").slice(0,4).join(" ")}</h3>
                            <div className="image">
                                <img src={upsell_image} />
                            </div>
                        </div>
                    :
                    <div className="product_image_wrapper">
                        <h3>{productShortName || productdata?.name}</h3>
                        <div className="image">
                        <img src={productdata?.thumbnail2x.url} />
                        </div>
                    </div>
                    
                    }
                {/* Product benfits */}
                <>
                {whatsGood &&
                <div className="product__ingredients">
                    <div className="plixContainer">
                        <div className="section--title">
                            <h2>What's Good</h2>
                        </div>
                        <div className="flex ingredientsWrapper">
                            {whatsGood &&
                                whatsGood
                                .slice(0, 4)
                                .map((item, index) => (
                                    <CardsContainer
                                        data={item}
                                        containerClass="cards-container"
                                        cardClass="make-perfect-card"
                                        key={index}
                                        disableLazyload={true}
                                    />
                                ))}
                        </div>
                        </div>
                    </div>
                }
                </>

                {/* Product benefits */}
                {/* {ingredients &&
                <div className="ingredients_container">
                    <div className="heading">
                    Main Ingredients
                    </div>
                    <div className="details">
                    {ingredients &&
                        (ingredientsExpanded
                            ? ingredients.map((item, index) => (
                                <CardsContainer
                                    data={item}
                                    containerClass="cards-container"
                                    cardClass="make-perfect-card"
                                    key={index}
                                    disableLazyload={true}
                                />
                            ))
                            : ingredients
                                .slice(0, 4)
                                .map((item, index) => (
                                    <CardsContainer
                                        data={item}
                                        containerClass="cards-container"
                                        cardClass="make-perfect-card"
                                        key={index}
                                        disableLazyload={true}
                                    />
                                ))
                        )
                    }
                    </div>
                </div>

                }
                {howtouse &&
                <div className="product__howtoUse__whenToUse">
                    <div className="flex plixContainer flex-wrap">
                        <div className="flex-50 border-right">
                            <h3 className="section-title">How to use</h3>
                            <div className="containers-container-how-to-use">
                                {howtouse && howtouse.length>0 &&
                                    howtouse.map((item, index) => (
                                        <CardsContainer
                                            data={item}
                                            containerClass="cards-container-how-to-use"
                                            cardClass="how-to-use-card"
                                            key={index}
                                            disableLazyload={true}
                                        />
                                    ))}
                            </div>
                        </div>
                        </div>
                    </div>
                } */}
                {showTimer ?
                   upsellTimer > 0 &&
                   <div className="addtocart_section">
                    <S.UpsellHeader>
                        <>
                        <div className="limited_time">
                        Limited time deal
                        </div>
                        <S.UpsellTimerTag>
                            <div className="timer">
                            <MemoStopwatch />
                            </div>
                            <span>{Math.floor(upsellTimer / 60)}:{upsellTimer % 60} Left!</span>
                        </S.UpsellTimerTag>
                        </>
                    </S.UpsellHeader>
                    
                    <NewAddToCartButton
                        onSubmit={() => {
                        onUpsellAdd();
                        setpopupstate(false);
                        }}
                        size="sm"
                        itemAdded={false}
                        disabled={false}
                        fullyDisabled={false}
                        page=""
                        productId={upsell_product?.product?.id}
                        leftIcon={<MemoCartPlusIcon />}
                        withIcons
                        mainText="Add To Cart"
                        variantId={upsell_product?.id}
                        buttonClassName={
                            true
                            ? "atc-button-upsell"
                            : "atc-button-upsell-disabled"
                        }
                        product={{...upsell_product?.product,defaultVariant:upsell_product}}
                        rightIcon={<MemoCaretRightIcon />}
                        showprice={true}
                    />
                   
                   </div>

                 :
                 <div className="addtocart_section">
 
                     <NewAddToCartButton
                         onSubmit={() => {
                         setpopupstate(false);
                         }}
                         size="sm"
                         itemAdded={false}
                         disabled={false}
                         fullyDisabled={false}
                         page=""
                         productId={productdata?.id}
                         withIcons
                         mainText="Add To Cart"
                         variantId={productdata?.defaultVariant?.id}
                         buttonClassName={
                             true
                             ? "atc-button-upsell"
                             : "atc-button-upsell-disabled"
                         }
                         product={productdata}
                         showprice={true}
                         rightIcon={<MemoCaretRightIcon />}
                     />
                  
                </div>
                }

                </div>
            
            </div>
            </div>

        } 
        </>
    )
}

export default ProductDetailPopup;

