import React, { useState } from "react";
import Footer from "components/Footer";
import { useAuth } from "myFirebase";

const Home = () => {
  const [feed, setFeed] = useState("");

  const currentUser = useAuth();

  console.log(currentUser);

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
  );
};

export default Home;
