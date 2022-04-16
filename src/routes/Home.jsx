import React, { useState } from "react";
import Footer from "components/Footer";
import Auth from "./Auth";
import Navigation from "components/Navigation";
import { useAuth } from "myFirebase";

const Home = () => {
  const currentUser = useAuth();
  const [feed, setFeed] = useState("");

  function onSubmit(e) {
    e.preventDefault();
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
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="내용을 입력하세요"
              maxLength={120}
              value={feed}
              onChange={onChange}
            />
            <input type="submit" value="트윗" />
          </form>
          <Footer />
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Home;
