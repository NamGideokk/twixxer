import React from "react";
import styled from "styled-components";

const AsideStyle = styled.div`
  .aside__wrapper {
    max-width: 380px;
    width: 100%;
    position: fixed;
    top: 0;
    margin: 0 auto;

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
    height: fit-content;
    background-color: var(--logo-color);
    margin-top: 30px;
    padding: 20px 0;
  }

  .trends__wrapper > div:nth-of-type(1),
  .follow__wrapper > div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0 20px;

    p {
      cursor: pointer;
      margin-top: 6px;
      display: inline-block;
      padding: 5px;
      border-radius: 10px;
      transition: 0.3s;

      :hover {
        background-color: var(--logo-dark-color);
      }
    }
  }

  .trends__item {
    transition: 0.3s;
    cursor: pointer;
    padding: 5px 20px;
    :hover {
      background-color: white;
    }

    small {
      color: #2a2a2a;
    }
  }

  .follow__item {
    padding: 5px 20px;
    transition: 0.3s;
    cursor: pointer;
    display: grid;

    grid-template-columns: 70px 2fr 74px;
    grid-template-rows: 1fr;
    grid-template-areas: "fi01 fi02 fi03";

    .fi01 {
      grid-area: fi01;
    }
    .fi02 {
      grid-area: fi02;

      h3 {
        margin-top: 15px;
      }
      p {
        color: #2a2a2a;
      }
    }
    .fi03 {
      grid-area: fi03;
      text-align: right;
    }

    :hover {
      background-color: white;
    }

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-top: 5px;
      object-fit: cover;
    }

    div:nth-of-type(1) {
      display: inline-block;

      p {
        color: #2a2a2a;
      }
    }

    button {
      margin-top: 19px;
      padding: 5px 15px;
      font-size: 16px;
      border-radius: 20px;
      background-color: rgb(30, 30, 30);
      color: white;
    }
  }

  @media screen and (max-width: 1280px) {
    .aside__wrapper {
      max-width: 300px;
      width: 100%;
      top: 540px;
    }

    .trends__wrapper,
    .follow__wrapper {
      div {
        h2 {
          font-size: 20px;
        }
        .more {
          font-size: 13px;
          transform: translateY(-2px);
        }
      }
    }
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
          <div>
            <h2>당신을 위한 핫이슈 🔥</h2>
            <p className="more">더보기＞</p>
          </div>

          {/* 필터를 통한 추천 (일단 하드 코딩) */}
          <div className="trends__item">
            <small>Trending in South Korea</small>
            <h3>일론 머스크</h3>
            <p>3.4k Twixxs</p>
          </div>
          <div className="trends__item">
            <small>Trending in South Korea</small>
            <h3>디즈니</h3>
            <p>5.2k Twixxs</p>
          </div>
        </div>
        <div className="follow__wrapper">
          <div>
            <h2>팔로우 추천</h2>
            <p className="more">더보기＞</p>
          </div>

          {/* 필터를 통한 추천 (일단 하드 코딩) */}
          <div className="follow__item">
            <div className="fi01">
              <img
                src="https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/optimize/90"
                alt="avatar"
              />
            </div>
            <div className="fi02">
              <h3>아이유</h3>
              <p>@IUlje</p>
            </div>
            <div className="fi03">
              <button>팔로우</button>
            </div>
          </div>
          <div className="follow__item">
            <div className="fi01">
              <img
                src="http://image.cine21.com/resize/cine21/person/2018/0423/13_42_54__5add644ed52f5[W578-].jpg"
                alt="avatar"
              />
            </div>
            <div className="fi02">
              <h3>마동석</h3>
              <p>@mavley</p>
            </div>
            <div className="fi03">
              <button>팔로우</button>
            </div>
          </div>
        </div>
      </div>
    </AsideStyle>
  );
};

export default Aside;
