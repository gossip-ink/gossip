import type React from "react";

export type ModalOptions = {
  identifier?: string | number;
  overlayClassName?: string;
  overlayCancellable?: boolean;
};

export const defaultModalOptions: ModalOptions = {
  overlayClassName: "",
  overlayCancellable: true,
};

export interface ModalComponent<P extends ModalComponentProps = ModalComponentProps>
  extends React.FC<P> {
  options?: ModalOptions;
}

export interface ModalComponentProps {
  closeModal: () => void;
}
