import React, { useEffect } from "react";
import "./Preperation.scss";
import { useNavigate } from "react-router-dom";

const Preparation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 3000);
  });
  return (
    <div className="preperation">
      <h1 className="prep-text">
        준비중인 페이지입니다.
        <br />
        3초 후 이전페이지로 이동합니다.
      </h1>
    </div>
  );
};

export default Preparation;
