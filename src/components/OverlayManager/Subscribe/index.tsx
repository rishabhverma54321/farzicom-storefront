/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { StatusTypes, SubscriptionInput } from "gqlTypes/globalTypes";
// import CloseIcon from "@material-ui/icons/Close";
import { styled } from "@styles/themes";
//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";
import { Button } from "@components/atoms/Button";
import { IconButton } from "@components/atoms/IconButton";
// import * as Yup from "yup";
import { useAuth, useAuthState } from "@saleor/sdk";
import { SubscriptionButtonState } from "@components/organisms/AddToCartSection";
import MyCustomLink from "@components/next-react/MyCustomLink";

import * as S from "./styles";
// import { theme } from "@styles/constants";
// import {
//   InnerOverlayContextInterface,
//   OverlayTheme,
//   OverlayType,
// } from "@temp/components/Overlay/context";
import {
  TypedCreateProductSubscription,
  TypedDeleteProductSubscription,
  TypedUpdateProductSubscription,
} from "./queries";
import { Overlay, OverlayContextInterface } from "../..";
import MemoSideNavCloseIcon from "@components/atoms/SvgIcons/SideNavCloseIcon";

export interface ISubscribe {
  overlay: OverlayContextInterface;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

export const StyledErrorMessage = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-size: 0.8rem;
  margin: auto;
  margin-bottom: 10px;
  font-weight: 600;
  /* padding: 10px; */
  /* border: none; */
`;

// const WRITE_A_REVIEW = "Write a Review";

// const validationSchema = Yup.object({
//   rating: Yup.number().required("Required"),
//   name: Yup.string().required("Required"),
//   review: Yup.string().required("Required"),
// });

const Subscribe: React.FC<ISubscribe> = ({ overlay, testingContext }) => {
  const {
    // show,
    hide,
    context: { data },
  } = overlay;
  const [afterSubmitMessage, setAfterSubmitMessage] = useState("");
  const { user } = useAuthState();
  const [weeklyArray, setWeeklyArray] = useState([
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ]);

  const handleChange = (index: number) => {
    setWeeklyArray(prev => {
      const temp = prev;
      temp[index] = temp[index] === "0" ? "1" : "0";
      return temp;
    });
  };
  return (
    <Overlay testingContext={testingContext} context={overlay}>
      <div className="WriteAReviewContainer">
        <S.Header className="WriteAReviewContainer__header">
          <div className="WriteAReviewContainer__header__text">
            Subscribe - Save upto 10%
          </div>

          <div onClick={hide} className="WriteAReviewContainer__header__close">
            {/* <IconButton
              name="x"
              size={16}
              testingContext="closeModal"
              onClick={hide}
              color="white"
            /> */}
            <MemoSideNavCloseIcon/>
          </div>
        </S.Header>
        <div className="WriteAReviewContainer__body">
          {data.type === SubscriptionButtonState.CREATE ? (
            <TypedCreateProductSubscription
              onCompleted={({ subscriptionCreate }) => {
                // setTimeout(() => hide(), 2000);
                // hide();

                if (subscriptionCreate.subscriptionErrors.length)
                  setAfterSubmitMessage(
                    "Oops!! Subscription not created. Try Again..."
                  );
                else {
                  setAfterSubmitMessage("Subscription successfully created!");
                  data.refetch();
                }
              }}
            >
              {mutation => {
                if (afterSubmitMessage) {
                  return (
                    <div className="WriteAReviewContainer__afterSubmitMessage">
                      {afterSubmitMessage}
                      <MyCustomLink href="/page/subscriptions">
                        <Button testingContext="viewSubscriptions">
                          {" "}
                          View Subscriptions{" "}
                        </Button>
                      </MyCustomLink>
                    </div>
                  );
                }
                // AT YOUR DOOR STEP <EVERY:></EVERY:>
                return (
                  <>
                    <form
                      onSubmit={async e => {
                        e.preventDefault();

                        const input: SubscriptionInput = {
                          productId: data.productId,
                          status: StatusTypes.ACTIVE,
                          userId: user.id,
                          quantity: weeklyArray,
                        };
                        const res = await mutation({ variables: { input } });
                      }}
                    >
                      <div className="formContainer">
                        <div className="rowContainer">
                          <div>SUBSCRIBE FOR:</div>
                          <ul className="subscribe">
                            <li>
                              <input
                                type="radio"
                                id="1box"
                                name="boxAmount"
                                className="hideRadio"
                                value={1}
                              />
                              <label className="radioLabel" htmlFor="1box">
                                1 box
                              </label>
                            </li>
                            <li>
                              <input
                                type="radio"
                                id="2box"
                                name="boxAmount"
                                className="hideRadio"
                                value={2}
                              />
                              <label className="radioLabel" htmlFor="2box">
                                2 box
                              </label>
                            </li>
                            <li>
                              <input
                                type="radio"
                                id="4box"
                                name="boxAmount"
                                className="hideRadio"
                                value={4}
                              />
                              <label className="radioLabel" htmlFor="4box">
                                4 box
                              </label>
                            </li>
                          </ul>
                        </div>
                        <div className="rowContainer">
                          <div>TIME PERIOD:</div>
                          <ul className="subscribe">
                            <li>
                              <input
                                type="radio"
                                id="weekly"
                                name="timePeriod"
                                className="hideRadio"
                                value={0}
                              />
                              <label className="radioLabel" htmlFor="weekly">
                                Weekly
                              </label>
                            </li>
                          </ul>
                        </div>

                        <div className="rowContainer">
                          <div>AT YOUR DOORSTEP EVERY:</div>
                          <ul className="subscribe">
                            <li>
                              <input
                                type="checkbox"
                                id="monday"
                                name="monday"
                                className="hideRadio"
                                value={0}
                                onChange={() => handleChange(0)}
                              />
                              <label className="radioLabel" htmlFor="monday">
                                Mon
                              </label>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                id="tuesday"
                                name="tuesday"
                                className="hideRadio"
                                value={1}
                                onChange={() => handleChange(1)}
                              />
                              <label className="radioLabel" htmlFor="tuesday">
                                Tue
                              </label>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                id="wednesday"
                                name="wednesday"
                                className="hideRadio"
                                value={2}
                                onChange={() => handleChange(2)}
                              />
                              <label className="radioLabel" htmlFor="wednesday">
                                Wed
                              </label>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                id="thursday"
                                name="thursday"
                                className="hideRadio"
                                value={3}
                                onChange={() => handleChange(3)}
                              />
                              <label className="radioLabel" htmlFor="thursday">
                                Thu
                              </label>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                id="Friday"
                                name="Friday"
                                className="hideRadio"
                                value={4}
                                onChange={() => handleChange(4)}
                              />
                              <label className="radioLabel" htmlFor="Friday">
                                Fri
                              </label>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                id="saturday"
                                name="saturday"
                                className="hideRadio"
                                value={5}
                                onChange={() => handleChange(5)}
                              />
                              <label className="radioLabel" htmlFor="saturday">
                                Sat
                              </label>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                id="sunday"
                                name="sunday"
                                className="hideRadio"
                                value={6}
                                onChange={() => handleChange(6)}
                              />
                              <label className="radioLabel" htmlFor="sunday">
                                Sun
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="rowContainer">
                        <Button testingContext="subscribe" type="submit">
                          {" "}
                          Subscribe{" "}
                        </Button>
                      </div>
                    </form>
                  </>
                );
              }}
            </TypedCreateProductSubscription>
          ) : (
            <TypedUpdateProductSubscription
              onCompleted={({ subscriptionUpdate }) => {
                // setTimeout(() => hide(), 2000);
                // hide();

                if (subscriptionUpdate.subscriptionError.length)
                  setAfterSubmitMessage(
                    "Oops!! Subscription not updated. Try Again..."
                  );
                else {
                  setAfterSubmitMessage("Subscription successfully updated!");
                  data.refetch();
                }
              }}
            >
              {mutation => {
                if (afterSubmitMessage) {
                  return (
                    <div className="WriteAReviewContainer__afterSubmitMessage">
                      {afterSubmitMessage}
                      <MyCustomLink href="/page/subscriptions">
                        <Button testingContext="viewSubscriptions">
                          {" "}
                          View Subscriptions{" "}
                        </Button>
                      </MyCustomLink>
                    </div>
                  );
                }
                // AT YOUR DOOR STEP <EVERY:></EVERY:>
                return (
                  <>
                    <form
                      onSubmit={async e => {
                        e.preventDefault();

                        const input: SubscriptionInput = {
                          productId: data.productId,
                          status: StatusTypes.ACTIVE,
                          userId: user.id,
                          quantity: weeklyArray,
                        };
                        await mutation({
                          variables: { input, id: data.subsriptionID },
                        });
                      }}
                    >
                      <div className="formContainer">
                        <div className="rowContainer">
                          <div>SUBSCRIBE FOR:</div>
                          <ul className="subscribe">
                            <li>
                              <input
                                type="radio"
                                id="1box"
                                name="boxAmount"
                                className="hideRadio"
                                value={1}
                              />
                              <label className="radioLabel" htmlFor="1box">
                                1 box
                              </label>
                            </li>
                            <li>
                              <input
                                type="radio"
                                id="2box"
                                name="boxAmount"
                                className="hideRadio"
                                value={2}
                              />
                              <label className="radioLabel" htmlFor="2box">
                                2 box
                              </label>
                            </li>
                            <li>
                              <input
                                type="radio"
                                id="4box"
                                name="boxAmount"
                                className="hideRadio"
                                value={4}
                              />
                              <label className="radioLabel" htmlFor="4box">
                                4 box
                              </label>
                            </li>
                          </ul>
                        </div>
                        <div className="rowContainer">
                          <div>TIME PERIOD:</div>
                          <ul className="subscribe">
                            <li>
                              <input
                                type="radio"
                                id="weekly"
                                name="timePeriod"
                                className="hideRadio"
                                value={0}
                              />
                              <label className="radioLabel" htmlFor="weekly">
                                Weekly
                              </label>
                            </li>
                          </ul>
                        </div>

                        <div className="rowContainer">
                          <div>AT YOUR DOORSTEP EVERY:</div>
                          <ul className="subscribe">
                            <li className="weekdaysLi">
                              <input
                                type="checkbox"
                                id="monday"
                                name="monday"
                                className="weekdaysInput"
                                value={0}
                                onChange={() => handleChange(0)}
                              />
                              <label className="weekdaysLabel" htmlFor="monday">
                                Mon
                              </label>
                            </li>
                            <li className="weekdaysLi">
                              <input
                                type="checkbox"
                                id="tuesday"
                                name="tuesday"
                                className="weekdaysInput"
                                value={1}
                                onChange={() => handleChange(1)}
                              />
                              <label
                                className="weekdaysLabel"
                                htmlFor="tuesday"
                              >
                                Tue
                              </label>
                            </li>
                            <li className="weekdaysLi">
                              <input
                                type="checkbox"
                                id="wednesday"
                                name="wednesday"
                                className="weekdaysInput"
                                value={2}
                                onChange={() => handleChange(2)}
                              />
                              <label
                                className="weekdaysLabel"
                                htmlFor="wednesday"
                              >
                                Wed
                              </label>
                            </li>
                            <li className="weekdaysLi">
                              <input
                                type="checkbox"
                                id="thursday"
                                name="thursday"
                                className="weekdaysInput"
                                value={3}
                                onChange={() => handleChange(3)}
                              />
                              <label
                                className="weekdaysLabel"
                                htmlFor="thursday"
                              >
                                Thu
                              </label>
                            </li>
                            <li className="weekdaysLi">
                              <input
                                type="checkbox"
                                id="Friday"
                                name="Friday"
                                className="weekdaysInput"
                                value={4}
                                onChange={() => handleChange(4)}
                              />
                              <label className="weekdaysLabel" htmlFor="Friday">
                                Fri
                              </label>
                            </li>
                            <li className="weekdaysLi">
                              <input
                                type="checkbox"
                                id="saturday"
                                name="saturday"
                                className="weekdaysInput"
                                value={5}
                                onChange={() => handleChange(5)}
                              />
                              <label
                                className="weekdaysLabel"
                                htmlFor="saturday"
                              >
                                Sat
                              </label>
                            </li>
                            <li className="weekdaysLi">
                              <input
                                type="checkbox"
                                id="sunday"
                                name="sunday"
                                className="weekdaysInput"
                                value={6}
                                onChange={() => handleChange(6)}
                              />
                              <label className="weekdaysLabel" htmlFor="sunday">
                                Sun
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="rowContainer">
                        <Button testingContext="subscribe" type="submit">
                          {" "}
                          Update{" "}
                        </Button>
                      </div>
                    </form>
                  </>
                );
              }}
            </TypedUpdateProductSubscription>
          )}
          <div className="rowContainer">
            <TypedDeleteProductSubscription
              onCompleted={({ subscriptionDelete }) => {
                // setTimeout(() => hide(), 2000);
                // hide();

                if (subscriptionDelete.subscriptionError.length)
                  setAfterSubmitMessage(
                    "Oops!! Subscription not created. Try Again..."
                  );
                else {
                  setAfterSubmitMessage("Subscription successfully deleted!");
                  data.refetch();
                }
              }}
            >
              {mutation => {
                return (
                  <Button
                    testingContext="subscribe"
                    color="secondary"
                    onClick={async () => {
                      await mutation({
                        variables: { id: data.subsriptionID },
                      });
                    }}
                  >
                    {" "}
                    Delete{" "}
                  </Button>
                );
              }}
            </TypedDeleteProductSubscription>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default Subscribe;
