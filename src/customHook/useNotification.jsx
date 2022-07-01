import React, { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const useNotification = (message, backgroundColor) => {
  const [animation, setAnimation] = useState("");
  const [display, setDisplay] = useState("none");
  const [notification, setNotification] = useState(message);
  const [backgroundColor, setBackgroundColor] = useState("#a984ed");

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
      setAnimation("");
      setNotification("");
      setDisplay("none");
    }, 5000);
  }

  return (
    <div className="new-feed-alert__wrapper">
      <div
        style={{ backgroundColor: backgroundColor, display: display }}
        className={`alert__container ${animation}`}
      >
        <FontAwesomeIcon icon={faCircleExclamation} className="alert__icon" />
        <p>{notification}</p>
      </div>
    </div>
  );
};

export default useNotification;
