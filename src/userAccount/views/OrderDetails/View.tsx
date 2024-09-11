//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

import { Loader } from "@components/atoms/Loader";
import { useAuth, useAuthState, useOrderDetails } from "@saleor/sdk";

import Page from "./Page";

const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
  match: {
    params: { token },
  },
}) => {
  const { data: order, loading } = useOrderDetails(
    { token },
    { fetchPolicy: "network-only" }
  );
  const { user } = useAuthState();
  const guest = !user;

  const handleDownloadInvoice = () => {
    if (order && "invoices" in order && order.invoices?.length > 0) {
      // Always download latest invoice
      const invoice = order.invoices.reduce((a, b) => {
        return new Date(a.createdAt) > new Date(b.createdAt) ? a : b;
      });

      if (invoice) {
        window.open(invoice.url, "_blank");
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="order-details container">
      <Page
        guest={guest}
        order={order}
        downloadInvoice={handleDownloadInvoice}
      />
    </div>
  );
};

export default View;
