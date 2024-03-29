import { useState, useSpring } from "react";
// import { animated } from "react-spring";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  // const { opacity, scale } = useSpring({
  //   config: {
  //     duration: 250
  //   },
  //   from: { opacity: 0, scale: 0.8 },
  //   to: { opacity: 1, scale: 1 }
  // });

  function openModal(content) {
    setIsOpen(true);
    setModalContent(content);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openModal,
    closeModal,
    ModalContent: ({ children }) => (
      <div>{children}</div>
      // <animated.div style={{ opacity, scale }}>{children}</animated.div>
    )
  };
}

export default useModal;
