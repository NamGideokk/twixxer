import React, { useEffect } from "react";
import "./preperation.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Preparation = () => {
  const navigate = useNavigate();

  const [num, setNum] = useState(3);

  function timer() {
    const fn = setInterval(() => {
      setNum((prev) => prev - 1);
      console.log("timer 시작");
    }, 1000);

    setTimeout(() => {
      clearInterval(fn);
    }, 3000);
  }

  useEffect(() => {
    timer();
    setTimeout(() => {
      navigate(-1);
    }, 3000);
  }, []);

  return (
    <div className="preperation">
      <h1 className="prep-text">
        준비중인 페이지입니다.
        <br />
        {num}초 후 이전페이지로 이동합니다.
      </h1>
    </div>
  );
};

export default Preparation;
