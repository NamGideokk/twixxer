import React from "react";

const Mobile = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100px",
          backgroundColor: `yellowgreen`,
        }}
        className="mobile"
      >
        <h1>100% - 500px</h1>
      </div>
      <div
        style={{
          width: "100vw",
          height: "100px",
          backgroundColor: `skyblue`,
        }}
      >
        <h1>100vw - 390px</h1>
      </div>
    </>
  );
};

export default Mobile;
