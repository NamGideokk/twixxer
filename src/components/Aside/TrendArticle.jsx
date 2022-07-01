import React, { useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { myFirestore } from "myFirebase";
import "./trendArticle.scss";

const TrendArticle = () => {
  const [getHotFeeds, setGetHotFeeds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const collectionRef = collection(myFirestore, "feeds");
    const q = query(collectionRef, orderBy("reTwixx", "desc"), limit(3));

    setLoading(true);
    const unsub = onSnapshot(q, (snapshot) => {
      setGetHotFeeds(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(false);
    });

    return unsub;
  }, []);

  return (
    <article className="trends__wrapper">
      <header>
        <h2>당신을 위한 핫이슈 🔥</h2>
        <p className="more">더보기＞</p>
      </header>

      {/* 필터를 통한 추천 (일단 하드 코딩) */}
      {getHotFeeds.length > 0 && !loading ? (
        getHotFeeds.map((twixx) => (
          <main className="trends__item" key={twixx.id}>
            <small>한국에서 핫한 게시물</small>
            <h3>
              {twixx.userName}　<small>{twixx.content}</small>
            </h3>
            <p>{twixx.reTwixx} 리트윅</p>
          </main>
        ))
      ) : (
        <section className="trends__item">
          <small></small>
          <h3
            style={{
              textAlign: "center",
              color: "#1e1e1e",
              fontWeight: "lighter",
            }}
          >
            추천할 게시물이 없네요 😥
          </h3>
          <p></p>
        </section>
      )}
    </article>
  );
};

export default TrendArticle;
