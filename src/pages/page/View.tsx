import * as React from "react";

import Page from "Themes/views/Article/Page";

// type ViewProps = RouteComponentProps<{
//   id: string;
// }>;

interface IProps {
  data: any;
}

export const View: React.FC<IProps> = ({ data }) => {
  const page = { slug: "shop" };
  return (
    <>
      <Page page={data?.PageData?.page} />
    </>
  );
};

export default View;
