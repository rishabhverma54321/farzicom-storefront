import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    // if (this.state.hasError) {
    //   if (typeof window !== "undefined" && typeof window.localStorage === "object") {
    //     // window.localStorage.clear();
    //     Object.keys(window.localStorage).forEach((key)=>{
    //       if(!key.includes("WZRK")){
    //         window.localStorage.removeItem(key)
    //       }
    //     })
    //     window.location.href = `/${window.location.search}`;
    //   }
    //   return <></>;
    // }

    return this.props.children;
  }
}

export default ErrorBoundary;
