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
      width: 100vw !important;
      bottom: 65px !important;
      top: 0;
      left: 0;
      z-index: 99;
    }
    .alert__container {
      width: 100vw !important;
      padding-top: 20px !important;
      border-top-left-radius: 0 !important;
      border-top-right-radius: 0 !important;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;

      .alert__icon {
        margin-right: 10px;
      }
      p {
        display: inline-block;
        transform: translateY(-6px);
      }
    }
  }
`;

const AlertContainer = ({
  animation,
  display = "none",
  alertContent,
  backgroundColor = "#a984ed",
}) => {
  return (
    <AlertContStyle>
      <div className="new-feed-alert__wrapper">
        <div
          style={{ backgroundColor: backgroundColor, display: display }}
          className={`alert__container ${animation}`}
        >
          <FontAwesomeIcon icon={faCircleExclamation} className="alert__icon" />
          <p>{alertContent}</p>
        </div>
      </div>
    </AlertContStyle>
  );
};

export default AlertContainer;
