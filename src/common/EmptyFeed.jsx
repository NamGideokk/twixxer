import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { EarthOutline } from "react-ionicons";
import styled from "styled-components";

const EmptyFeedStyle = styled.div`
  .ef__wrapper {
    width: 80%;
    height: fit-content;
    padding: 50px 0;
    margin: 50px auto;
    text-align: center;

    p {
      color: #d5d5d5;
      margin-top: 30px;
    }
  }
  .earth {
    font-size: 200px;
    color: #d5d5d5;
  }
  .plane__wrapper {
    width: 250px;
    height: 250px;
    background-color: transparent;
    margin: 0 auto;
    text-align: center;
    position: relative;
    bottom: 380px;

    animation: flying-plane 5s infinite;
  }
  .plane {
    transform: rotate(40deg);
    color: var(--logo-color);
  }

  @keyframes flying-plane {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const EmptyFeed = () => {
  return (
    <EmptyFeedStyle>
      <div className="ef__wrapper">
        <EarthOutline width="200px" height="200px" color="#d5d5d5" />
        <p>전 세계인들과의 소통을 지금 시작해 보세요</p>
      </div>
      <div className="plane__wrapper">
        <FontAwesomeIcon icon={faPaperPlane} className="plane" />
      </div>
    </EmptyFeedStyle>
  );
};

export default EmptyFeed;
