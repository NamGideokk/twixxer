import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "components/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useAuth, upload, myFirestore } from "myFirebase";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

const ProfileStyle = styled.div`
  .profile__wrapper {
    width: fit-content;
    height: fit-content;
    padding: 20px;
    background-color: var(--logo-color);
    border-radius: 10px;
    margin: 50px auto;
  }
  .avatar__label {
    background-color: var(--logo-dark-color);
    padding: 10px 15px;
    width: 100%;
    height: fit-content;
    font-size: 20px;
    color: white;
    cursor: pointer;
    display: block;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  .img__icon {
    margin-right: 10px;
  }
  #file {
    display: none;
  }
  .avatar {
    width: 150px;
    height: 150px;
    border: 2px solid var(--logo-dark-color);
    border-radius: 50%;
    background-color: white;
    object-fit: cover;
    margin-top: 10px;
    margin-right: 20px;
    display: block;
    margin: 0 auto 20px auto;
  }

  .upload__button {
    width: 100%;
    height: fit-content;
    padding: 5px 10px;
    font-size: 20px;
    margin-top: 10px;
  }

  .all-feeds-delete__button {
    background-color: var(--logo-dark-color);
    padding: 10px 15px;
    width: 100%;
    height: fit-content;
    font-size: 20px;
    color: white;
    cursor: pointer;
    display: block;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    margin-top: 10px;
    transition: 0.3s;

    :hover {
      background-color: red;
      box-shadow: 0 5px 5px rgba(255, 0, 0, 0.3);
    }
  }
`;

const Profile = () => {
  const currentUser = useAuth();

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(
    "http://cdn.onlinewebfonts.com/svg/img_264570.png"
  );

  useEffect(() => {
    // 현재 유저정보가 null이 아니고 (로그인 된 상태), photoURL이 null이 아니면
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  function handleFile(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleUpload() {
    upload(photo, currentUser, setLoading);
  }

  async function allFeedsDelete() {
    const collectionRef = collection(myFirestore, "feeds");

    const deleteConfirm = window.confirm(
      "정말 나의 모든 게시물을 삭제하시겠습니까?"
    );

    if (deleteConfirm) {
      const q = query(collectionRef, where("userId", "==", currentUser.email));

      const snapshot = await getDocs(q);

      const results = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(results);

      results.forEach(async (result) => {
        const docRef = doc(myFirestore, "feeds", result.id);

        if (results.length === 0) {
          alert("삭제할 게시물이 없습니다.");
        }

        try {
          await deleteDoc(docRef);
          alert("모든 게시물을 삭제했습니다.");
        } catch (e) {
          console.log(e.code, e.message);
          alert(e.message);
        }
      });
    }
  }

  return (
    <>
      <Navigation />
      <ProfileStyle>
        <div className="profile__wrapper">
          <img src={photoURL} alt="avatar" className="avatar" />

          {photo ? (
            <button
              disabled={loading}
              onClick={handleUpload}
              className="upload__button"
            >
              {loading ? "업로드중..." : "업로드"}
            </button>
          ) : (
            <label htmlFor="file" className="avatar__label">
              <FontAwesomeIcon icon={faImage} className="img__icon" />
              아바타 변경
            </label>
          )}
          <input type="file" id="file" onChange={handleFile} />
          <button className="all-feeds-delete__button" onClick={allFeedsDelete}>
            내 게시물 전부 삭제
          </button>
        </div>
      </ProfileStyle>
    </>
  );
};

export default Profile;
