import React from "react";
import styled from "styled-components";

const EBStyle = styled.div`
  div {
    margin-top: 100px;
    text-align: center;
  }
  h2 {
    color: #dcdcdc;
    margin-bottom: 20px;
  }
  p {
    color: #979797;
  }

  @media screen and (max-width: 414px) {
    div {
      margin-top: 190px;
    }
  }
`;

const EmptyBookmarks = () => {
  return (
    <EBStyle>
      <div>
        <img
          src="https://abs.twimg.com/sticky/illustrations/empty-states/book-in-bird-cage-400x200.v1.png"
          alt="bookmarks"
        />
        <h2>트윅을 북마크에 저장하세요</h2>
        <p>좋은 트윅은 그냥 흘려 보내지 마세요.</p>
        <p>나중에 다시 쉽게 찾을 수 있도록 북마크에 추가하세요.</p>
      </div>
    </EBStyle>
  );
};

export default EmptyBookmarks;
