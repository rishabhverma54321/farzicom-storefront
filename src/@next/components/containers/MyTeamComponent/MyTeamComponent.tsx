import { BlankScreen } from "@components/atoms/BlankScreen";
import React, { useState } from "react";
import { useCustomHistory } from "@hooks/useCustomHistory";
import Card from "./components/Card";
import Search from "./components/Search";
const TypedMyTeamMembersQuery = React.lazy(() => import("./queries"));
import * as MT from "./styles";

export interface IMyTeamComponentProps {}

export const MyTeamComponent: React.FC<IMyTeamComponentProps> = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const history = useCustomHistory();
  const companyMeta = localStorage.getItem("userMeta");
  const companyId = companyMeta ? JSON.parse(companyMeta).company.id : "";
  const handleClick = (id: string) => {
    history.push({
      pathname: "/",
      state: {
        id,
      },
    });
  };
  const getSearchedUser = (val: string) => {
    setSearchInput(val);
  };
  return (
    <TypedMyTeamMembersQuery
      variables={{
        id: companyId,
        filter: {
          search: searchInput,
        },
      }}
    >
      {({ data }) => {
        const companyDetails = data?.company?.edges[0]?.node;
        const teamMembers = companyDetails?.companyTeamMembers?.edges;
        return (
          <MT.Section className="team">
            <MT.PageName>My Team</MT.PageName>
            <MT.TopSection className="team__top">
              <Card
                compName={companyDetails?.companyName}
                imgUrl={companyDetails?.avatar?.url}
              />
              <MT.Row className="team__top--admin">
                <span>Admin</span>
                <span>{`${
                  companyDetails?.user?.user?.firstName
                    ? companyDetails?.user?.user?.firstName
                    : "-"
                } ${
                  companyDetails?.user?.user?.lastName
                    ? companyDetails?.user?.user?.lastName
                    : "-"
                }`}</span>
              </MT.Row>
              <MT.Row className="team__top--members">
                <span>Team Members</span>
                <span>
                  {companyDetails?.companyTeamMembers?.edges?.length
                    ? companyDetails?.companyTeamMembers.edges?.length
                    : "--"}
                </span>
              </MT.Row>
            </MT.TopSection>
            <MT.BottomSection className="team__bottom">
              <MT.Heading>Team Members</MT.Heading>
              <Search
                getSearchedData={getSearchedUser}
                searchBy="team member"
              />
              {teamMembers?.length ? (
                <MT.TeamMembers>
                  {teamMembers?.map((item: any, index: number) => {
                    const { node } = item;
                    const {
                      teamMember: {
                        company,
                        user,
                        department,
                        designation,
                        phone,
                      },
                    } = node;
                    const memberDetail = {
                      id: node?.id,
                      companyAvatar: company?.avatar?.url,
                      firstName: user?.firstName,
                      lastName: user?.lastName,
                      department,
                      designation,
                      phoneNo: phone,
                    };
                    if (user.id) {
                      return (
                        <div className="member" key={memberDetail.id}>
                          <Card
                            compName={`${
                              memberDetail?.firstName
                                ? memberDetail?.firstName
                                : ""
                            } ${
                              memberDetail?.lastName
                                ? memberDetail.lastName
                                : ""
                            }`}
                            phoneNo={
                              memberDetail?.phoneNo ? memberDetail.phoneNo : ""
                            }
                            postAndDepartment={`${
                              memberDetail?.designation
                                ? memberDetail.designation
                                : ""
                            } | ${
                              memberDetail?.department
                                ? memberDetail.department
                                : ""
                            }`}
                            buttonDetail="View Profile"
                            imgUrl={memberDetail?.companyAvatar}
                            handleClick={handleClick}
                            id={user.id}
                          />
                        </div>
                      );
                    }
                  })}
                </MT.TeamMembers>
              ) : (
                <BlankScreen info="Not available!" color="#005BC2" />
              )}
            </MT.BottomSection>
          </MT.Section>
        );
      }}
    </TypedMyTeamMembersQuery>
  );
};
MyTeamComponent.displayName = "MyTeamComponent";
export default MyTeamComponent;
