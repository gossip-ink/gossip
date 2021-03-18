import React, { createContext, useContext, useState } from "react";

type ModalState = {
  identifier: number | string | null;
  props?: Record<string, unknown>;
};

type ModalContextValue = {
  state: ModalState;
  mutate: (state: ModalState) => void;
};

const ModalStateContext = createContext<ModalContextValue>({} as ModalContextValue);

const defaultModalState: ModalState = { identifier: null };

export const ModalStateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, mutate] = useState(defaultModalState);
  return (
    <ModalStateContext.Provider value={{ state, mutate }}>{children}</ModalStateContext.Provider>
  );
};

ModalStateProvider.displayName = "ModalStateProvider";

export function useModalState(): [state: ModalState, mutate: (state: ModalState) => void] {
  const { state, mutate } = useContext(ModalStateContext);
  return [state, mutate];
}

export function useToggleModal(
  identifier: string | number
): (props?: Record<string, unknown>) => void {
  const { state, mutate } = useContext(ModalStateContext);
  return (props?: Record<string, unknown>) =>
    // Close the modal if same identifier, otherwise show the different modal.
    mutate(state.identifier === identifier ? { identifier: null } : { identifier, props });
}
