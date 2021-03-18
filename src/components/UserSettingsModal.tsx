import React from "react";
import { ModalComponent, register } from "../modals";

const UserSettingsModal: ModalComponent = ({ closeModal }) => {
  return (
    <div className="absolute top-1/2 left-1/2 px-4 py-3 w-96 h-72 bg-gray-100 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg">
      <h2 className="font-medium text-2xl text-gray-800">User Settings</h2>
    </div>
  );
};

UserSettingsModal.options = {
  identifier: "UserSettingsModal",
  overlayClassName: "opacity-50",
  overlayCancellable: true,
};

register(UserSettingsModal);
