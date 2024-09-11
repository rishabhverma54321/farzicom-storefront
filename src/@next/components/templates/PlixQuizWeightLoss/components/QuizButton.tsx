import React from "react";
import style from "../scss/index.module.scss";
import MyCustomLink from "@components/next-react/MyCustomLink";

const QuizButton = ({
    url,
    text,
    onClick = null,
    isSkin = false,
    pageConfig= null
}: {
    url: string;
    text: string;
    onClick: any;
    isSkin: boolean;
    pageConfig?: any
}) => {
    return (
        <div className={isSkin ? style.skincause_button : style.weightcause_button}>
            <div style={{background: `${pageConfig?.primaryColor || ""}`}} className={isSkin ? style.skincause_bottom : style.weightcause_bottom}>
                {onClick ? (
                    <MyCustomLink onClick={onClick} href={url}>
                        {text}
                    </MyCustomLink>
                ) : (
                    <MyCustomLink href={url}>{text}</MyCustomLink>
                )}
            </div>
            <div className={isSkin ? style.skincause_layer : style.weightcause_layer} />
        </div>
    );
};

export default QuizButton;
