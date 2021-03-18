import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import Overlay from "./Overlay";
import { useModalState } from "../context";
import { query } from "../registry";

const modalRoot = document.getElementById("modal-root");

const ModalContainer: React.FC<ModalContainerProps> = () => {
  const [modalState, setModalState] = useModalState();
  const closeModal = () => setModalState({ identifier: null });
  const containerElement = useMemo(() => document.createElement("div"), []);
  useEffect(() => {
    modalRoot?.appendChild(containerElement);
    return () => {
      modalRoot?.removeChild(containerElement);
    };
  });
  const Modal = modalState.identifier === null ? null : query(modalState.identifier);
  return Modal
    ? ReactDOM.createPortal(
        <>
          <Overlay
            className={Modal.options?.overlayClassName}
            onClick={Modal.options?.overlayCancellable ? closeModal : undefined}
          />
          <Modal closeModal={closeModal} />
        </>,
        containerElement
      )
    : null;
};

ModalContainer.displayName = "ModalContainer";

export default ModalContainer;

export type ModalContainerProps = {};
