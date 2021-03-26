import React, { useCallback, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import Overlay from "./Overlay";
import { useModalStack, ModalState } from "../context";
import { query } from "../registry";

const modalRoot = document.getElementById("modal-root");

const ModalPresenter: React.FC<ModalPresenterProps> = () => {
  const [modalStack, setModalStack] = useModalStack();

  const removeModalState = useCallback(
    (modalState: ModalState): void => {
      if (modalStack.includes(modalState)) {
        setModalStack(modalStack.filter((x) => x !== modalState));
      }
    },
    [modalStack]
  );

  const containerElement = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    modalRoot?.appendChild(containerElement);
    return () => {
      modalRoot?.removeChild(containerElement);
    };
  });

  return modalStack.length > 0
    ? ReactDOM.createPortal(
        <>
          {modalStack.map((state, index, stack) => {
            const ModalComponent = query(state.identifier);
            if (ModalComponent === null) {
              return null;
            }
            const closeModal = removeModalState.bind(null, state);
            const modalNode = <ModalComponent closeModal={closeModal} {...state.props} />;
            if (index + 1 === stack.length) {
              return (
                <>
                  <Overlay
                    className={ModalComponent.options?.overlayClassName}
                    onClick={ModalComponent.options?.overlayCancellable ? closeModal : undefined}
                  />
                  {modalNode}
                </>
              );
            }
            return modalNode;
          })}
        </>,
        containerElement
      )
    : null;
};

ModalPresenter.displayName = "ModalPresenter";

export default ModalPresenter;

export type ModalPresenterProps = {};
