import React from "react";
import styled from "styled-components";

const FooterStyle = styled.div`
  .footer__wrapper {
    width: 100%;
    height: 100px;
    background-color: rgb(20, 20, 20);
    text-align: center;
    margin-top: 100px;

    p {
      color: white;
      padding-top: 40px;
      font-size: 20px;
    }
  }
`;

const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer__wrapper">
        <p>TWIXXER ⓒ 2022</p>
      </div>
    </FooterStyle>
  );
};

export default Footer;
