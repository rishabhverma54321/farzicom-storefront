import { styled } from "@styles/themes";

export const Footer = styled.div<{ divider: boolean }>`
  position: relative;
  text-align: right;
  padding: ${props => `1.1rem ${props.theme.spacing.gutter}`};
  ${({ divider, theme }) =>
    divider && `border-top: 1px solid ${theme.colors.light};`}
    ${({ fixedposition})=> 
      fixedposition && `
      display:flex;
      justify-content:flex-end;
      `

    }
  button {
    &:last-child {
      margin-left: 2rem;
      margin-right: 0.7rem;
      ${({ fixedposition})=> 
          fixedposition && `
          margin:0px;
          background-color:#5DD37C;
          color:#FEFFED;
          border-radius:8px;
          font-family:CocoSharp XL;
          font-size:16px;
          font-weight:800;
          text-transform:uppercase;
          `
    
      }

    }
  }
`;
