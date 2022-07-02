import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./notificationContainer.scss";
import { useNotification } from "customHook/useNotification";

const NotificationContainer = ({
  animation, // 애니메이션 속성이 담긴 className
  display = "none",
  alertContent, // 알림창 내용
  backgroundColor = "#a984ed",
}) => {
  useNotification(alertContent);
  return (
    <div className="new-feed-alert__wrapper">
      <div
        style={{ backgroundColor: backgroundColor, display: display }}
        className={`alert__container ${animation}`}
      >
        <FontAwesomeIcon icon={faCircleExclamation} className="alert__icon" />
        <p>{alertContent}</p>
      </div>
    </div>
  );
};

export default NotificationContainer;
