import React from "react";
import "./userArticle.scss";

const UserArticle = () => {
  return (
    <article className="follow__wrapper">
      <header>
        <h2>팔로우 추천</h2>
        <p className="more">더보기＞</p>
      </header>

      <main className="follow__item">
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
      </main>
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
    </article>
  );
};

export default UserArticle;
