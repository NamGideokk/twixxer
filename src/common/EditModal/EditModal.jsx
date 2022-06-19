import React from "react";
import "./EditModal.scss";

const EditModal = ({
  animation,
  editContent,
  handleEditContent,
  editConfirm,
  editCancel,
}) => {
  return (
    <div className="wrapper-style">
      <div className={`edit__container ${animation}`}>
        <textarea
          className="prev-content"
          value={editContent}
          onChange={handleEditContent}
        />
        <button onClick={editConfirm}>수정하기</button>
        <button onClick={editCancel}>취소</button>
      </div>
    </div>
  );
};

export default EditModal;
