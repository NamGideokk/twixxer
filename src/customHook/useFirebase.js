import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { myFirestore } from "myFirebase";
import { useEffect, useState } from "react";

const useFirebase = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    console.log("모든 피드 불러오기 작업 실행");
    const collectionRef = collection(myFirestore, "feeds");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      setFeeds(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          //   isLike: doc.data().like.includes(currentUser.uid),
          //   isBookmark: doc.data().bookmark.includes(currentUser.uid),
        }))
      );
    });

    return unsub();
  }, []);

  return feeds;
};

export default useFirebase;
