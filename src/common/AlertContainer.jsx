import React from "react";
import styled from "styled-components";
import { AlertCircleOutline } from "react-ionicons";

const AlertContStyle = styled.div`
  .new-feed-alert__wrapper {
    position: fixed;
    left: 5%;
    bottom: 0;
    width: fit-content;
    height: fit-content;
    display: flex;

    .alert__container {
      display: none;
      position: relative;
      width: fit-content;
      height: fit-content;
      color: white;
      padding: 20px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      margin: 0 10px 0 10px;
      text-align: center;
      transition: 0.5s;
      /* box-shadow: 3px 3px 10px #b79aec inset, -3px -3px 7px #563692 inset; */
      z-index: 99;

      .alert__icon {
        margin-bottom: 6px;
        display: inline-block;
      }
    }
  }
`;

const AlertContainer = ({
  animation,
  display,
  alertContent,
  backgroundColor = "#a984ed",
}) => {
  return (
    <AlertContStyle>
      <div className="new-feed-alert__wrapper">
        <div
          style={{ backgroundColor: backgroundColor }}
          className={`alert__container ${animation} ${display}`}
        >
          <AlertCircleOutline
            color={"white"}
            width="30px"
            height="30px"
            shake={true}
            className="alert__icon"
          />
          <p>{alertContent}</p>
        </div>
      </div>
    </AlertContStyle>
  );
};

export default AlertContainer;
