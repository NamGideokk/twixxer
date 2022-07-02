import React, { useState } from "react";
import { useEffect } from "react";

export const useNotification = (message) => {
  const [animation, setAnimation] = useState("");
  const [display, setDisplay] = useState("none");
  const [notification, setNotification] = useState(message);
  const [backgroundColor, setBackgroundColor] = useState("#a984ed");

  const DEFAULT_STATE = "";

  useEffect(() => {
    setTimeout(() => {
      console.log("피드 생성 알림창 start");
      setNotification(message);
      setDisplay("block");
      if (window.screen.width <= 414) {
        setAnimation("mobile-open-alert");
      } else {
        setAnimation("open-alert");
      }
    }, 500);
    setTimeout(() => {
      newFeedAlert();
    }, 1000);
  }, [message]);

  // 피드 생성 알림창
  function newFeedAlert() {
    console.log("피드 생성 알림창 close");
    setTimeout(() => {
      if (window.screen.width <= 414) {
        setAnimation("mobile-close-alert");
      } else {
        setAnimation("close-alert");
      }
    }, 4000);
    setTimeout(() => {
      setAnimation(DEFAULT_STATE);
      setNotification(DEFAULT_STATE);
      setDisplay("none");
    }, 5000);
  }
};
