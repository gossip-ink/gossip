import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ModalComponent, register } from "../modals";
import Modal from "../modals/components/Modal";
import ModalFooter from "../modals/components/ModalFooter";
import ModalTitle from "../modals/components/ModalTitle";
import Button from "./Button";

const UserSettingsModal: ModalComponent = ({ closeModal }) => {
  return (
    <Modal className="w-96 h-72 flex flex-col overflow-hidden">
      <ModalTitle className="px-4 pt-4 pb-3">
        <FontAwesomeIcon className="mr-1" icon="user-circle" fixedWidth />
        User Settings
      </ModalTitle>
      <section className="px-5 py-3 text-gray-800">
        Hi! You can update your profile and preferences here.
      </section>
      <ModalFooter className="mt-auto px-4 pt-4 pb-5 flex flex-row-reverse">
        <Button type="approve" onClick={closeModal}>
          Save
        </Button>
        <Button className="mr-2" onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

UserSettingsModal.options = {
  identifier: "UserSettingsModal",
  overlayClassName: "opacity-50",
  overlayCancellable: true,
};

register(UserSettingsModal);
