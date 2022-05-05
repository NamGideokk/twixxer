import React from "react";
import styled from "styled-components";

const LcStyle = styled.div`
  .loading__container {
    width: 100%;
    height: 235px;
    border: 1px solid #525252;
    padding: 20px;

    div {
      :nth-of-type(1) {
        span {
          :nth-of-type(1) {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #525252;
            display: inline-block;
            margin-right: 20px;
          }
          :nth-of-type(2) {
            width: 30%;
            height: 30px;
            background-color: #525252;
            display: inline-block;
            margin-bottom: 15px;
          }
        }
      }

      :nth-of-type(2) {
        width: 80%;
        height: 30px;
        background-color: #525252;
        margin-top: 15px;
      }
      :nth-of-type(3) {
        width: 70%;
        height: 30px;
        background-color: #525252;
        margin: 15px 0;
      }
      :nth-of-type(4) {
        width: 30%;
        height: 20px;
        background-color: #525252;
        margin-top: 15px;
      }
    }
  }

  @media screen and (max-width: 414px) {
    .loading__container {
      width: 100vw !important;
    }
  }
`;

const LoadingContainer = () => {
  return (
    <LcStyle>
      <div className="loading__container">
        <div>
          <span></span>
          <span></span>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LcStyle>
  );
};

export default LoadingContainer;
