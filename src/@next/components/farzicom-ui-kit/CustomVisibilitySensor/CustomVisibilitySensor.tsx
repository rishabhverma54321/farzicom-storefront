import React from "react";
import ReactVisibilitySensor from "react-visibility-sensor";

export interface ICustomVisibilitySensorProps {
  children?: React.ReactNode;
  onChange: (isVisible: boolean) => void;
  partialVisibility?:boolean;
  disable?:boolean;
}

export const CustomVisibilitySensor: React.FC<ICustomVisibilitySensorProps> = ({
  children,
  onChange,
  partialVisibility,
  disable,
  ...props
}) => {
  const [eventFired, setEventFired] = React.useState(false);

  return (
    <>
      <ReactVisibilitySensor
        active={disable ? false : !eventFired}
        partialVisibility={partialVisibility}
        onChange={isVisible => {
          if (!eventFired) {
            if(isVisible){
              setEventFired(true);
            }
            onChange(isVisible);
          }
        }}
        {...props}
      >
        {children}
      </ReactVisibilitySensor>
    </>
  );
};
CustomVisibilitySensor.displayName = "CustomVisibilitySensor";
export default CustomVisibilitySensor;
