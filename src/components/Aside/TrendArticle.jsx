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
import { useContext } from "react";
import { LanguageContext } from "context/LanguageContext";

const TrendArticle = () => {
  const { isKor } = useContext(LanguageContext);
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
        <h2>{isKor ? "당신을 위한 핫이슈 🔥" : "Trends for you 🔥"}</h2>
        <p className="more">{isKor ? "더보기＞" : "More＞"}</p>
      </header>

      {/* 필터를 통한 추천 (일단 하드 코딩) */}
      {getHotFeeds.length > 0 && !loading ? (
        getHotFeeds.map((twixx) => (
          <main className="trends__item" key={twixx.id}>
            <small>
              {isKor ? "한국에서 핫한 게시물" : "Trending in South Korea"}
            </small>
            <h3>
              {twixx.userName}　<small>{twixx.content}</small>
            </h3>
            <p>
              {twixx.reTwixx} {isKor ? "리트윅" : "Re-twixx"}
            </p>
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
            {isKor
              ? "추천할 게시물이 없네요 😥"
              : "There are no twixxs to recommend."}
          </h3>
          <p></p>
        </section>
      )}
    </article>
  );
};

export default TrendArticle;
