import EmptyBookmarks from "common/EmptyBookmarks";
import LoadingContainer from "common/LoadingContainer";
import Aside from "components/aside/Aside";
import FeedContainer from "components/feedContainer/FeedContainer";
import Nav from "components/nav/Nav";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { myFirestore, useAuth } from "myFirebase";
import React, { useEffect, useState } from "react";
import MainFrame from "layouts/MainFrame";
import BookmarkHeader from "components/bookmarkHeader.jsx/BookmarkHeader";

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
    <MainFrame
      secA={<Nav />}
      secB={
        <>
          <BookmarkHeader />
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
        </>
      }
      secC={<Aside />}
    />
  );
};

export default Bookmark;
