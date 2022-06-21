import React from "react";
import "./MainFrame.scss";

const MainFrame = ({ secA, secB, secC }) => {
  return (
    <div className="main__frame">
      <section className="sec__a">{secA}</section>
      <section className="sec__b">{secB}</section>
      <section className="sec__c">{secC}</section>
    </div>
  );
};

export default MainFrame;
