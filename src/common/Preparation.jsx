import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PreStyle = styled.div`
  div {
    width: 100%;
    text-align: center;
  }
  h1 {
    color: white;
    margin-top: 150px;
  }

  @media screen and (max-width: 414px) {
    h1 {
      font-size: 1.5em;
      margin-top: 300px;
    }
  }
`;

const Preparation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 3000);
  });
  return (
    <PreStyle>
      <div>
        <h1>
          준비중인 페이지입니다.
          <br />
          3초 후 이전페이지로 이동합니다.
        </h1>
      </div>
    </PreStyle>
  );
};

export default Preparation;
