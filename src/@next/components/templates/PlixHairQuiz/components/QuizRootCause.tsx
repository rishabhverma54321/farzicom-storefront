import React, { useContext, useState } from "react";
import style from "../scss/index.module.scss";
import MemoPushPinIcon from "@components/atoms/SvgIcons/MemoPushPinIcon";
import { CachedImage } from "@components/molecules/CachedImage";
import { OverlayContext, OverlayTheme, OverlayType } from "@temp/components";
import MemoPopCloseIcon from "@components/atoms/SvgIcons/PopupcloseIcon";
import parse from "html-react-parser";

const RootCauseModal = ({ rootCause, hide }: { rootCause: any; hide: any }) => {
  const [selectedCause, setSelectedCause] = useState<number>(0);
  const selectedRootCause: any = Object.values(rootCause)[selectedCause];
  return (
    <div className={style.rootcause_popup}>
      <div onClick={hide} className={style.rootcause_popup_close}>
        <MemoPopCloseIcon />
      </div>
      <div className={style.rootcause_popup_container}>
        <ul className={style.rootcause_popup_nav}>
          {Object.values(rootCause)?.map((item: any, index: number) => (
              <li
                className={`${
                  selectedCause === index
                    ? style.rootcause_popup_nav_selected
                    : ""
                }`}
                onClick={() => {
                  if (selectedCause !== index) {
                    setSelectedCause(index);
                  }
                }}
              >
                <span>{item?.key}</span>
              </li>
            ))}
        </ul>
        <div className={style.rootcause_popup_container_box}>
          {selectedRootCause?.image ? (
            <div className={style.rootcause_popup_container_box_image}>
              <CachedImage
                url={selectedRootCause?.image}
                isNextImage
                nextImageLayout="fill"
              />
            </div>
          ) : (
            <></>
          )}
          <div className={style.rootcause_popup_container_box_description}>
            {parse(`${selectedRootCause?.description}`)}
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizRootCause = ({ quizDetails }: { quizDetails: any }) => {
  const { show, hide } = useContext(OverlayContext);
  const rootCause =
    (quizDetails?.rootCause && Object.keys(quizDetails?.rootCause)?.length) ||
    null;
  if (rootCause) {
    let rootCauseLength = rootCause > 4 ? true : false
    return (
      <main className={style.rootcause}>
        <h3>
          <MemoPushPinIcon /> Root causes for your hair fall are:
        </h3>
        <div className={`${style.rootcause_container}  ${rootCauseLength ? style.rootcause_container_new : ''}`}>
          {Object.values(quizDetails?.rootCause)?.map((item: any) => (
            <div className={`${style.rootcause_container_box}`}>
              {item?.image ? (
                <div className={style.rootcause_container_box_image}>
                  <CachedImage
                    url={item?.image}
                    isNextImage
                    nextImageLayout="fill"
                  />
                </div>
              ) : (
                <div className={style.rootcause_container_box_image_default} />
              )}
              <p>{item?.key}</p>
            </div>
          ))}
        </div>
        <div
          onClick={() => {
            show(OverlayType.modal, OverlayTheme.modal, {
              content: (
                <RootCauseModal
                  rootCause={quizDetails?.rootCause}
                  hide={hide}
                />
              ),
              className: style.rootcause_modal,
              disableHide: true,
            });
          }}
          className={style.rootcause_learnmore}
        >
          Learn More
        </div>
      </main>
    );
  }

  return <></>;
};

export default QuizRootCause;
