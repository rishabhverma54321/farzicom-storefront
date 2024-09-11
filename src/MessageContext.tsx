import React, { useContext, useState } from "react";
import Snackbar,{ SnackbarOrigin } from "@mui/material";
import Alert from "@mui/material";

const MessageContext = React.createContext(null);
const MessageUpdateContext = React.createContext(null);

export function useMessageState() {
  return useContext(MessageContext);
}

export function useMessageStateUpdate(): (
  message: string,
  severity: "error" | "info" | "success" | "warning",
  position?: SnackbarOrigin
) => void {
  return useContext(MessageUpdateContext);
}

export function MessageProvider({ children }) {
  const defaultPosition = {
    horizontal: "center",
    vertical: "bottom",
  };
  const [messageObject, setMessageObject] = useState({
    message: "",
    severity: "info",
    position: defaultPosition,
  });

  function updateMessageState(
    message: string,
    severity: "error" | "info" | "success" | "warning",
    position?: SnackbarOrigin
  ) {
    setMessageObject(prev => ({ ...prev, message, severity, position }));
  }

  return (
    <MessageContext.Provider value={messageObject}>
      <MessageUpdateContext.Provider value={updateMessageState}>
        <>
          {children}
          {/* <Snackbar
            open={messageObject.message !== ""}
            autoHideDuration={3000}
            onClose={() =>
              setMessageObject({
                message: "",
                severity: "info",
                position: defaultPosition,
              })
            }
            anchorOrigin={(messageObject.position as any) || defaultPosition}
          >
            <Alert severity={messageObject.severity as any}>
              {messageObject.message}
            </Alert>
          </Snackbar> */}
        </>
      </MessageUpdateContext.Provider>
    </MessageContext.Provider>
  );
}
