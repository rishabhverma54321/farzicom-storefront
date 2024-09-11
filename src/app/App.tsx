import React from "react";
//FIXME:NextJs Make it a CSS module
//import "./app.scss";
import { useAuth } from "@saleor/sdk";
import { Loader } from "@components/atoms/Loader";
import { largeScreen } from "@styles/constants";
import { CLIENT } from "Themes/config";
import Media from "react-media";

import { YarnSidebar } from "@components/containers/YarnSidebar";
import AppHeader from "@components/templates/AppHeader";
import AppFooter from "@components/templates/AppFooter";
import {
  MetaConsumer,
  OverlayManager,
  OverlayProvider,
  OverlayManager2,
  OverlayProvider2,
} from "../components";
import ShopProvider from "../components/ShopProvider";
import { Routes } from "./routes";
import Notifications from "./Notifications";

const App: React.FC = () => {
  const { tokenRefreshing, tokenVerifying } = useAuth();

  if (tokenRefreshing || tokenVerifying) {
    return <Loader />;
  }

  return (
    <OverlayProvider2>
      <OverlayProvider>
        <MetaConsumer />
        <AppHeader />
        {CLIENT === "yarnbazar" ? (
          <div className="app-handler">
            <Media
              query={{ minWidth: largeScreen }}
              render={() => <YarnSidebar />}
            />
            <main className="yarnbazar-body">
              <Routes />
            </main>
          </div>
        ) : (
          <Routes />
        )}

        <AppFooter />
        <OverlayManager />
        <OverlayManager2 />
        <Notifications />
      </OverlayProvider>
    </OverlayProvider2>
  );
};

export default React.memo(App);
