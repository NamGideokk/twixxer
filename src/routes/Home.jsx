import React, { useState } from "react";
import Footer from "components/Footer";
import Auth from "./Auth";
import Navigation from "components/Navigation";
import { useAuth } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const FormStyle = styled.div`
  .feed__form {
    width: 800px;
    height: fit-content;
    padding: 20px;
    margin: 100px auto;

    input {
      width: 100%;
      height: 50px;
      padding: 0 20px;
      border: none;
      border-radius: 10px;
      font-size: 24px;
      transition: 0.3s;

      :focus {
        box-shadow: 0 2px 10px var(--logo-color);
      }
    }

    button {
      font-size: 30px;
      padding: 5px;
      background-color: transparent;
      color: var(--logo-color);
      position: absolute;
      transform: translate(-50px, 5px);
    }
  }
`;

const Home = () => {
  const currentUser = useAuth();
  const [feed, setFeed] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (feed.length === 0) {
      alert("내용을 입력해 주세요.");
    } else {
      alert("피드 작성!");
      setFeed("");
    }
  }
  function onChange(e) {
    const {
      target: { value },
    } = e;
    setFeed(value);
  }

  return (
    <>
      {currentUser ? (
        <>
          <Navigation />
          <FormStyle>
            <form onSubmit={onSubmit} className="feed__form">
              <input
                type="text"
                placeholder="친구들과 소식을 공유하세요!"
                maxLength={120}
                value={feed}
                onChange={onChange}
              />
              <button type="submit" className="upload-feed__button">
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="upload-feed__icon"
                />
              </button>
            </form>
          </FormStyle>
          <Footer />
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Home;
