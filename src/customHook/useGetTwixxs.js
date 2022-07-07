import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { myFirestore } from "myFirebase";
import { useEffect, useState } from "react";

const useGetTwixxs = ({ uid }) => {
  const [twixxs, settwixxs] = useState([]);

  useEffect(() => {
    console.log("모든 피드 불러오기 작업 실행");
    const collectionRef = collection(myFirestore, "feeds");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      settwixxs(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          isLike: doc.data().like.includes(uid),
          isBookmark: doc.data().bookmark.includes(uid),
        }))
      );
    });

    return unsub();
  }, []);

  return twixxs;
};

export default useGetTwixxs;
