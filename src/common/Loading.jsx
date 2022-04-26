import React from "react";
import styled from "styled-components";

const LoadingStyle = styled.div`
  .loading__wrapper {
    padding: 20px;
    width: fit-content;
    height: fit-content;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 60px;
    color: var(--logo-color);
    font-weight: bold;
    transition: 0.3s;

    span {
      margin: 0 7px;
      position: relative;
      bottom: 0;
    }

    span:nth-of-type(1) {
      animation: updown 0.5s infinite alternate ease-out;
    }
    span:nth-of-type(2) {
      animation: updown 0.5s 0.1s infinite alternate ease-out;
    }
    span:nth-of-type(3) {
      animation: updown 0.5s 0.2s infinite alternate ease-out;
    }
    span:nth-of-type(4) {
      animation: updown 0.5s 0.3s infinite alternate ease-out;
    }
    span:nth-of-type(5) {
      animation: updown 0.5s 0.4s infinite alternate ease-out;
    }
    span:nth-of-type(6) {
      animation: updown 0.5s 0.5s infinite alternate ease-out;
    }
    span:nth-of-type(7) {
      animation: updown 0.5s 0.6s infinite alternate ease-out;
    }
  }

  @keyframes colorchange {
    from {
      color: #3cbcdf;
    }
    to {
      color: #28df4d;
    }
  }

  @keyframes updown {
    from {
      bottom: 0;
    }
    to {
      bottom: 10px;
    }
  }
`;

const Loading = () => {
  return (
    <LoadingStyle>
      <div className="loading__wrapper">
        <span>t</span>
        <span>w</span>
        <span>i</span>
        <span>x</span>
        <span>x</span>
        <span>e</span>
        <span>r</span>
      </div>
    </LoadingStyle>
  );
};

export default Loading;
