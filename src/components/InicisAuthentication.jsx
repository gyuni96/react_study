import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";

function InicisAuthentication({ isOpen, closeModal, width, callback }) {
  useEffect(() => {
    // 폼 자동 제출
    document.querySelector("#saForm").submit();

    // 메시지 리스너 정의
    const handleMessages = (event) => {
      if (event.origin !== "http://localhost:7077") return;
      callback(event.data);
    };

    // 메시지 리스너 등록
    window.addEventListener("message", handleMessages);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener("message", handleMessages);
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      width={width}
      title={"간편인증"}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form
          id="saForm"
          action="http://localhost:7077/inicis/auth"
          target="saLayer"
          method="POST"
          style={{ display: "none" }}
        >
          <input name="groupCd" value={"INICIS_SIGN"} readOnly></input>
        </form>
        <iframe
          id="saLayer"
          name="saLayer"
          style={{ width: "400px", height: "620px", border: "none" }}
        ></iframe>
      </div>
    </Modal>
  );
}

export default InicisAuthentication;
