import React, { useEffect, useState } from "react";
import Page from "./Page";
import { useRouter } from "next/router";

interface ViewProps {
  content?: any;
}
const View: React.FC<ViewProps> = ({ content }) => {
  const [currentLocation, setCurrentLocation] = useState(undefined);
  const router = useRouter();
  useEffect(() => {
    setCurrentLocation(window.location);
  }, [router.asPath]);
  return (
    <>
      <Page content={content} location={currentLocation} />
    </>
  );
};
export default React.memo(View);
