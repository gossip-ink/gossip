import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ModalComponent, register } from "../modals";
import Modal from "../modals/components/Modal";
import ModalFooter from "../modals/components/ModalFooter";
import ModalTitle from "../modals/components/ModalTitle";
import { useAlert } from "../modals/hooks/useAlert";
import Button from "./Button";

const UserSettingsModal: ModalComponent = ({ closeModal }) => {
  const showAlert = useAlert();
  return (
    <Modal className="w-4/5 h-72 flex flex-col md:w-3/4 lg:w-1/2">
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
        <Button
          className="mr-2"
          onClick={() =>
            showAlert("Are you sure to save?", (confirmed) => {
              if (confirmed) {
                closeModal();
              }
            })
          }
        >
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
