import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CHAT_MODAL } from "../reducers/action";
import axios from "axios";

const ChatModal = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isChatModal = useSelector((state) => state.isChatModal);
  const modalBackground = useRef("");
  // 모달 켜질때
  useEffect(() => {
    scrollToBottom();
  }, [isChatModal, message]);

  // 모달 종료
  const closeModal = () => {
    dispatch({ type: CHAT_MODAL });
  };
  // input 엔터시
  const handleInput = (e) => {
    if (e.key === "Enter") {
      e.persist();
      const message = e.target.value;

      setMessage((prev) => {
        return [...prev, { text: message, recipient_id: "user" }];
      });
      getChat(message);

      e.target.value = "";
    }
  };
  const scrollToBottom = () => {
    const chatWrap = document.querySelector("#chatWrap");
    // 스크롤 맨밑으로 내리기
    chatWrap.scroll("0", chatWrap.scrollHeight);
  };

  const getChat = async (message) => {
    const param = {
      sender: "Sender",
      message: message
    };
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5005/webhooks/rest/webhook",
        param
      );
      setMessage((prev) => {
        return [...prev, ...response.data];
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatModalWrap
      ref={modalBackground}
      onClick={(e) => {
        if (!modalBackground) return;
        if (e.target === modalBackground.current) {
          closeModal();
        }
      }}
    >
      <ModalWrap>
        <ChatWrap>
          <ChatHeader> CHAT TEST </ChatHeader>
          <ChatBody id="chatWrap">
            <ChatMessage>
              {message.length > 0 &&
                message.map((msg, idx) => {
                  return (
                    <Message key={idx} className={msg.recipient_id}>
                      {msg.text}
                    </Message>
                  );
                })}
              {isLoading && (
                <Message className="loaderWrap">
                  <div className="loader"></div>
                </Message>
              )}
            </ChatMessage>
          </ChatBody>
          <ChatFooter>
            <ChatFootWrap>
              <ChtaInput
                type="text"
                placeholder="입력해주세요"
                onKeyDown={handleInput}
              />
              <ChatButton>전송</ChatButton>
            </ChatFootWrap>
          </ChatFooter>
        </ChatWrap>
      </ModalWrap>
    </ChatModalWrap>
  );
};

export default ChatModal;

const ChatModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrap = styled.div`
  position: fixed;
  top: 60px;
  right: 20px;
  width: 450px;
  height: calc(100% - 100px);
  background-color: white;
  z-index: 999;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
`;

const ChatWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  height: 60px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1rem 1rem 0 0;
`;

const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.2rem;
`;

const ChatFooter = styled.div`
  height: 60px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 0 0 1rem 1rem;
`;

const ChatMessage = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 기본 정렬을 왼쪽으로 설정 */
`;

const Message = styled.li`
  padding: 1rem 1.2rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  background-color: #f7f7f7;
  max-width: 80%;
  white-space: pre-line;
  &:last-child {
    margin-bottom: 0;
  }
  &.user {
    background-color: ${(props) => props.theme.hoverColor};
    color: #fff;
    align-self: flex-end;
    text-align: right;
  }
`;
const ChatFootWrap = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
const ChtaInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 1rem;
  margin-right: 0.5rem;
  &::placeholder {
    font-size: 1rem;
  }
`;

const ChatButton = styled.button`
  width: 60px;
  height: 100%;
  border: none;
  background-color: ${(props) => props.theme.hoverColor};
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
`;
