import React, { useEffect, useState } from "react";
import SignUp from "components/SignUp/SignUp";
import Loading from "common/Loading/Loading";
import Login from "components/Login/Login";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [animation, setAnimation] = useState("");
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  function signUpModal(e) {
    const {
      target: { name },
    } = e;

    if (name === "showSignUp") {
      setShowSignUpModal(true);
      setAnimation("fec__open-animation");
      setTimeout(() => {
        setAnimation("");
      }, 500);
    } else if (name === "closeSignUp") {
      setAnimation("fec__close-animation");
      setTimeout(() => {
        setAnimation("fec__open-animation");
        setShowSignUpModal(false);
      }, 500);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Login signUpModal={signUpModal} />
          {showSignUpModal && (
            <SignUp animation={animation} signUpModal={signUpModal} />
          )}
        </>
      )}
    </>
  );
};

export default Auth;
