import React from "react";
import styled from "styled-components";

const AsideStyle = styled.div`
  .aside__wrapper {
    width: 100%;
    height: fit-content;

    form > input {
      width: 100%;
      height: 50px;
      font-size: 20px;
      padding: 0 20px;
      border: none;
    }

    .search__icon {
      position: relative;
      right: 200px;
    }
  }

  .trends__wrapper,
  .follow__wrapper {
    width: 100%;
    height: 500px;
    background-color: var(--logo-color);
    margin-top: 30px;
    padding: 20px;
  }
`;

const Aside = () => {
  function searchTwixxer(e) {
    e.preventDefault();
  }
  return (
    <AsideStyle>
      <div className="aside__wrapper">
        <form onSubmit={searchTwixxer}>
          <input type="text" placeholder="전세계의 소식을 검색하세요" />
          {/* <input type="submit" value="버튼" /> */}
        </form>
        <div className="trends__wrapper">
          <h2>당신을 위한 핫이슈 🔥</h2>
        </div>
        <div className="follow__wrapper">
          <h2>팔로우 추천</h2>
        </div>
      </div>
    </AsideStyle>
  );
};

export default Aside;
