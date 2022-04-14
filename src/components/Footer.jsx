import React from "react";
import styled from "styled-components";

const FooterStyle = styled.div`
  .footer__wrapper {
    width: 100%;
    height: 100px;
    background-color: rgb(30, 30, 30);
    text-align: center;

    h2 {
      color: white;
    }
  }
`;

const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer__wrapper">
        <h2>TWIXXER ⓒ 2022</h2>
      </div>
    </FooterStyle>
  );
};

export default Footer;
