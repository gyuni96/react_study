import Button from "./Button";
import styled from "styled-components";

const Modal = ({
  isOpen,
  closeModal,
  modalBackground,
  title,
  handleClick,
  buttonText,
  width,
  children
}) => {
  return (
    isOpen && (
      <ModalContainer
        className="modal_container"
        ref={modalBackground}
        onClick={(e) => {
          if (!modalBackground) return;
          if (e.target === modalBackground.current) {
            closeModal();
          }
        }}
      >
        <ModalContent width={width}>
          <ModalTitle>{title}</ModalTitle>
          {children}
          <ModalButtonWrap>
            {buttonText && handleClick && (
              <Button onClick={handleClick}>{buttonText}</Button>
            )}
            <Button variant="normal" onClick={closeModal}>
              닫기
            </Button>
          </ModalButtonWrap>
        </ModalContent>
      </ModalContainer>
    )
  );
};

export default Modal;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const ModalTitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;
const ModalContent = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  padding: 30px;
  position: relative;
  z-index: 3;
  width: ${(props) => props.width || "680px"};
  overflow: hidden;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 100%;
`;

const ModalButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;
