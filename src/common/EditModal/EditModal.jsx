import { LanguageContext } from "context/LanguageContext";
import React from "react";
import { useContext } from "react";
import "./editModal.scss";

const EditModal = ({
  animation,
  editContent,
  handleEditContent,
  editConfirm,
  editCancel,
}) => {
  const { isKor } = useContext(LanguageContext);

  return (
    <div className="wrapper-style">
      <div className={`edit__container ${animation}`}>
        <textarea
          className="prev-content"
          value={editContent}
          onChange={handleEditContent}
        />
        <button onClick={editConfirm}>{isKor ? "수정하기" : "Edit"}</button>
        <button onClick={editCancel}>{isKor ? "취소" : "Cancel"}</button>
      </div>
    </div>
  );
};

export default EditModal;
