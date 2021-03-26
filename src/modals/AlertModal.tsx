import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../components/Button";
import { ModalComponent, register } from "../modals";
import Modal from "./components/Modal";
import ModalFooter from "./components/ModalFooter";
import ModalTitle from "./components/ModalTitle";
import { ModalComponentProps } from "./types";

const AlertModal: ModalComponent<AlertModalProps> = ({ closeModal, message, onClose }) => {
  const respond = (response: boolean): void => {
    closeModal();
    onClose?.(response);
  };
  return (
    <Modal className="w-96 flex flex-col">
      <ModalTitle className="px-4 pt-4 pb-3">
        <FontAwesomeIcon className="mr-1" icon="exclamation-circle" fixedWidth />
        Notification
      </ModalTitle>
      <section className="px-5 py-3 text-gray-800">{message}</section>
      <ModalFooter className="mt-auto px-4 pt-4 pb-5 flex flex-row-reverse">
        <Button type="primary" onClick={respond.bind(null, true)}>
          Sure
        </Button>
        {typeof onClose === "function" ? (
          <Button className="mr-2" type="normal" onClick={respond.bind(null, false)}>
            No
          </Button>
        ) : null}
      </ModalFooter>
    </Modal>
  );
};

AlertModal.options = {
  identifier: "AlertModal",
  overlayClassName: "opacity-50",
  overlayCancellable: false,
};

export type AlertModalProps = ModalComponentProps & {
  message: string;
  onClose?: (response: boolean) => void;
};

register(AlertModal);
