import React from "react";
import ProfileInfoWrapper from "../ProfileInfoWrapper/ProfileInfoWrapper";
import TestComponent from "../TestComponent/TestComponent";
import * as S from "./style";

export interface IPaymentsOptionCompanyProfileProps {
  billingTitle?: string;
  userInfo: any;
}

export const PaymentsOptionCompanyProfile: React.FC<IPaymentsOptionCompanyProfileProps> = ({
  billingTitle,
  userInfo,
}) => {
  return (
    <>
      {userInfo?.paymentInfo?.information
        ? userInfo.paymentInfo.information?.map((item: any, index: number) => {
            return (
              <S.Container key={index}>
                <S.HeaderContainerProfile>
                  {`${billingTitle} ${index + 1}`}
                </S.HeaderContainerProfile>
                <ProfileInfoWrapper
                  profileInfoComponents={[
                    <TestComponent
                      svgSrc={<></>}
                      innerTitle="A/C Name"
                      rightContainerContent={[`${item.accountName}`]}
                      bgColor="#f4f8f9"
                      titleColor="#9F9F9F"
                      fontSizeTitle={1}
                      fontSizeSvg={1.1}
                      className="billing-address"
                    />,

                    <TestComponent
                      svgSrc={<></>}
                      innerTitle="A/C Number"
                      rightContainerContent={[`${item.accountNumber}`]}
                      bgColor="#ffffff"
                      titleColor="#9F9F9F"
                      fontSizeTitle={1}
                      fontSizeSvg={1.1}
                      className="billing-address"
                    />,

                    <TestComponent
                      svgSrc={<></>}
                      innerTitle="IFSC Code"
                      rightContainerContent={[`${item.ifsc}`]}
                      bgColor="#f4f8f9"
                      titleColor="#9F9F9F"
                      fontSizeTitle={1}
                      fontSizeSvg={1.1}
                      className="billing-address"
                    />,

                    <TestComponent
                      svgSrc={<></>}
                      innerTitle="Bank Name"
                      rightContainerContent={[`${item.bankName}`]}
                      bgColor="#ffffff"
                      titleColor="#9F9F9F"
                      fontSizeTitle={1}
                      fontSizeSvg={1.1}
                      className="billing-address"
                    />,
                    <TestComponent
                      svgSrc={<></>}
                      innerTitle="Branch Name"
                      rightContainerContent={[`${item.branchName}`]}
                      bgColor="#f4f8f9"
                      titleColor="#9F9F9F"
                      fontSizeTitle={1}
                      fontSizeSvg={1.1}
                      className="billing-address"
                    />,

                    // <TestComponent
                    //   svgSrc={<></>}
                    //   innerTitle="City, State & Country"
                    //   rightContainerContent={["Pune, Maharashtra"]}
                    //   bgColor="#ffffff"
                    //   titleColor="#9F9F9F"
                    //   fontSizeTitle={1}
                    //   fontSizeSvg={1.1}
                    //   className="billing-address"
                    // />,
                  ]}
                />
              </S.Container>
            );
          })
        : "No payment information!"}
    </>
  );
};
PaymentsOptionCompanyProfile.displayName = "PaymentsOptionCompanyProfile";
export default PaymentsOptionCompanyProfile;
