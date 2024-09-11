import React from "react";

// import withStyles from "@material-ui/core/styles/withStyles";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
// import { AddOutlined } from "@material-ui/icons";
// import RemoveIcon from "@material-ui/icons/Remove";
import { withStyles } from '@mui/styles';
import ReactSVG from "react-svg";

import Plus from "images/plus.svg";
import Minus from "images/minus.svg";

import * as T from "../../../globalStyles/themes";

export interface IAccordianIconChangeProps {
  summary: string;
  details: string;
  expanded: string | false;
  handleChange: (
    panel: string
  ) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
}

const StyledAccordian = withStyles({
  root: {
    fontSize: T.defaultTheme.typography.baseFontSize,
    padding: "5px 0 5px 0",
    boxShadow: "none",
    borderRadius: 0,
  },

  expanded: {
    opacity: 1,
    margin: "20px",
  },
})(Accordion);

const StyledAccordianSummary = withStyles({
  root: {
    fontWeight: T.defaultTheme.typography.lighFontWeight,
    fontSize: T.defaultTheme.typography.baseFontSize,
    padding: 0,
  },
})(AccordionSummary);

const StyledAccordianDetails = withStyles({
  root: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
  },
})(AccordionDetails);

export const AccordianIconChange: React.FC<IAccordianIconChangeProps> = ({
  summary,
  details,
  expanded,
  handleChange,
}) => {
  return (
    <>
      <StyledAccordian
        key={summary}
        expanded={expanded === summary}
        onChange={handleChange(summary)}
      >
        <StyledAccordianSummary
          expandIcon={
            expanded === summary ? (
              <ReactSVG path={Minus} />
            ) : (
              <ReactSVG path={Plus} />
            )
          }
        >
          Q. {summary}
        </StyledAccordianSummary>
        <StyledAccordianDetails>{details}</StyledAccordianDetails>
      </StyledAccordian>
    </>
  );
};
AccordianIconChange.displayName = "AccordianIconChange";
export default AccordianIconChange;
