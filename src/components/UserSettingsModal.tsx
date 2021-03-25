import React from "react";
import { ModalComponent, register } from "../modals";
import Modal from "../modals/components/Modal";
import ModalTitle from "../modals/components/ModalTitle";

const UserSettingsModal: ModalComponent = ({ closeModal }) => {
  return (
    <Modal className="px-4 py-3 w-96 h-72">
      <ModalTitle>User Settings</ModalTitle>
    </Modal>
  );
};

UserSettingsModal.options = {
  identifier: "UserSettingsModal",
  overlayClassName: "opacity-50",
  overlayCancellable: true,
};

register(UserSettingsModal);
