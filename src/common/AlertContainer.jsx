import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

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
      padding: 15px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      margin: 0 10px 0 10px;
      text-align: center;
      transition: 0.5s;
      /* box-shadow: 3px 3px 10px #b79aec inset, -3px -3px 7px #563692 inset; */
      z-index: 100;

      .alert__icon {
        margin-bottom: 6px;
        font-size: 20px;
        display: inline-block;
      }
    }
  }

  @media screen and (max-width: 414px) {
    .new-feed-alert__wrapper {
      width: 414px !important;
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
          <FontAwesomeIcon icon={faCircleExclamation} className="alert__icon" />
          <p>{alertContent}</p>
        </div>
      </div>
    </AlertContStyle>
  );
};

export default AlertContainer;
