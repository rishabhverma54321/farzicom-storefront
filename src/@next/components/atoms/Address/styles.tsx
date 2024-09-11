import { styled } from "@styles/themes";

export const Useraddress = styled.div`
  ${({ updateAddressstyle })=> 
    updateAddressstyle && `
      font-family: CocoSharp XL !important;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      color: #808080;
    `
  }
`;

export const Name = styled.span`
  display: block;
  margin-bottom: 0.625rem;
  font-weight: ${props => props.theme.typography.boldFontWeight};

  ${({ updateAddressstyle })=> 
    updateAddressstyle && `
      font-family: CocoSharp XL !important;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 140%;
      color: #000000;
    `
  }
`;
