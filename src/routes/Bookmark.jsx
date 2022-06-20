import EmptyBookmarks from "common/EmptyBookmarks";
import LoadingContainer from "common/LoadingContainer";
import Aside from "components/Aside";
import FeedContainer from "components/FeedContainer";
import Nav from "components/Nav/Nav";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { myFirestore, useAuth } from "myFirebase";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MainFrameStyle = styled.div`
  .main__frame {
    display: grid;
    grid-template-columns: 300px minmax(500px, 820px) minmax(300px, 380px);
    grid-template-rows: 1fr;
    grid-template-areas: "a b c";
    max-width: 1500px;
    margin: 0 auto;

    .sec__a {
      grid-area: a;
      z-index: 90;
    }
    .sec__b {
      grid-area: b;
      padding-bottom: 100px;
      min-width: 500px;
      padding: 0 20px;
      padding-bottom: 100px;
    }

    .sec__c {
      grid-area: c;
      max-width: 380px;
      min-width: 300px;
    }
  }

  .bookmark__header {
    padding: 10px 0;
    color: #dcdcdc;
    background-color: rgba(30, 30, 30, 0.7);
    backdrop-filter: blur(10px);
    width: 100%;
    font-size: 24px;
    position: sticky;
    top: 0;

    small {
      font-size: 14px;
      color: #979797;
      margin-left: 10px;
    }
  }

  @media screen and (max-width: 1280px) and (min-width: 821px) {
    .main__frame {
      grid-template-columns: 300px minmax(500px, 1fr);
      grid-template-rows: 1fr 1fr;
      grid-template-areas:
        "a b"
        "c b";
    }
    .sec__c {
    }
  }

  @media screen and (max-width: 820px) {
    .main__frame {
      grid-template-columns: 80px minmax(300px, auto) !important;
      grid-template-rows: 1fr !important;
      grid-template-areas: "a b" !important;
    }
    .sec__b {
      width: 90vw !important;
    }
    .sec__c {
      width: 0 !important;
    }
  }

  @media screen and (max-width: 414px) {
    .main__frame {
      grid-template-columns: 1fr !important;
      grid-template-rows: 1fr 70px !important;
      grid-template-areas:
        "b"
        "a" !important;
      width: 100vw !important;
    }
    .sec__a {
      width: 100vw !important;
      height: 55px !important;
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      padding: 0 !important;
    }
    .sec__b {
      width: 100vw !important;
      min-width: 100vw !important;
      padding: 0 !important;
      margin: 0 0 30px 0 !important;
    }
    .sec__c {
      width: 0 !important;
      display: none;
    }
    .bookmark__header {
      padding-left: 10px;
    }
  }
`;

const FormStyle = styled.div`
  .feed__cont__wrapper {
    margin-top: 10px;
  }
  .feed__container {
    /* width: 555px; */
    width: 100%;
    height: fit-content;
    padding: 20px;
    background-color: rgb(30, 30, 30);
    color: #dcdcdc;
    margin: 0 auto;
    transition: 0.3s;
    border: 1px solid #525252;
    display: grid;
    grid-template-columns: 60px 1fr 70px;
    grid-template-rows: 60px 1fr 20px 50px;
    grid-template-areas:
      "fc01 fc02 fc03"
      "fc04 fc04 fc04"
      "fc05 fc05 fc05"
      "fc06 fc06 fc06";

    .fc01 {
      grid-area: fc01;
    }
    .fc02 {
      grid-area: fc02;
      padding-top: 5px;

      p {
        color: #717171;
      }
    }
    .fc03 {
      grid-area: fc03;
    }
    .fc04 {
      grid-area: fc04;
      padding-top: 20px;
      padding-bottom: 10px;
    }
    .fc05 {
      grid-area: fc05;
    }
    .fc06 {
      grid-area: fc06;
      padding-top: 20px;
    }

    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 50%;
    }

    .name-email {
      margin-left: 20px;
      margin-right: 50px;
      margin-bottom: 3px;
    }

    h3 {
      margin-bottom: 10px;
    }

    .feed-menu__button {
      margin-left: 20px;
      transition: 0.3s;

      :hover {
        color: white;
      }
    }

    .feed-icons__wrapper {
      display: flex;
      justify-content: space-between;
    }

    span {
      text-align: center;
      width: fit-content;
      padding: 7px;
      font-size: 17px;
      cursor: pointer;
      border-radius: 50%;
      transition: 0.3s;

      .heart__button {
        margin-right: 5px;
      }
      .fill-heart {
        color: #ff4444;
      }
    }

    .bm__icon {
      width: 30px;
      height: 30px;

      :hover {
        color: #5252ff;
        background-color: #5252ff2f;
      }
    }
    .cm__icon {
      width: 30px;
      height: 30px;

      :hover {
        color: #14ad14;
        background-color: #40c9402f;
      }
    }
    .rp__icon {
      width: 30px;
      height: 30px;

      :hover {
        color: #d000be;
        background-color: #d000be2f;
      }
    }
    .sr__icon {
      width: 30px;
      height: 30px;
      :hover {
        color: #d48e0e;
        background-color: #f0b4432f;
      }
    }

    .writer__buttons {
      text-align: right;
      font-size: 20px;
    }
  }
  .edit__button {
    margin-right: 10px;
    color: #ffb01f95;
  }

  .edit__button,
  .delete__button {
    cursor: pointer;
    transition: 0.3s;

    :hover {
      color: #ffb01f;
      transform: rotate(180deg);
    }
  }
  .delete__button {
    color: #ff353595;
    :hover {
      color: #ff3535;
    }
  }

  .prev-content {
    width: 100%;
    height: 50px;
  }

  @media screen and (max-width: 414px) {
    .feed__cont__wrapper {
      margin-top: 0 !important;
    }
  }
`;

const Bookmark = () => {
  const currentUser = useAuth();

  const [getBookmarks, setGetBookmarks] = useState();
  const [loading, setLoading] = useState(false);

  // 데이터(북마크) 가져오기
  useEffect(() => {
    setLoading(true);
    const collectionRef = collection(myFirestore, "feeds");
    const q = query(
      collectionRef,
      where("bookmark", "array-contains", `${currentUser?.uid}`),
      orderBy("timestamp", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setGetBookmarks(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          isLike: doc.data().like.includes(currentUser.uid),
          isBookmark: doc.data().bookmark.includes(currentUser.uid),
        }))
      );
    });

    setLoading(false);

    return unsub;
  }, [currentUser?.uid]);

  return (
    <MainFrameStyle>
      <div className="main__frame">
        <div className="sec__a">
          <Nav />
        </div>
        <div className="sec__b">
          <div className="bookmark__header">
            북마크
            <small>Bookmarks</small>
          </div>
          <FormStyle>
            <div className="feed__cont__wrapper">
              {getBookmarks ? (
                getBookmarks.map((twixx) => (
                  <FeedContainer
                    key={twixx.id}
                    photo={twixx.photo}
                    userName={twixx.userName}
                    userId={twixx.userId}
                    content={twixx.content}
                    createdAt={twixx.createdAt.substring(0, 21)}
                    editAt={twixx.editAt}
                    like={twixx.isLike}
                    likeCount={twixx.like.length}
                    bookmark={twixx.isBookmark}
                    reTwixxCount={twixx.reTwixx}
                    id={twixx.id}
                  />
                ))
              ) : (
                <>
                  <LoadingContainer />
                  <LoadingContainer />
                  <LoadingContainer />
                </>
              )}
              {getBookmarks?.length === 0 && <EmptyBookmarks />}
            </div>
          </FormStyle>
        </div>
        <div className="sec__c">
          <Aside />
        </div>
      </div>
    </MainFrameStyle>
  );
};

export default Bookmark;
