import Button from "./Button";

const Modal = ({
  isOpen,
  closeModal,
  modalBackground,
  title,
  handleClick,
  children
}) => {
  return (
    isOpen && (
      <div
        className="modal_container"
        ref={modalBackground}
        onClick={(e) => {
          if (e.target === modalBackground.current) {
            closeModal();
          }
        }}
      >
        <div className="modal_content">
          <p className="modal_title">{title}</p>
          {children}
          <div className="modal_btn_wrap">
            <Button onClick={handleClick}>저장</Button>
            <Button variant="normal" onClick={closeModal}>
              닫기
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
