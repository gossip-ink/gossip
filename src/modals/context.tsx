import React, { createContext, useContext, useRef, useState } from "react";

export type ModalState = {
  identifier: number | string;
  props?: Record<string, unknown>;
};

type ModalContextValue = {
  stack: ModalState[];
  mutate: (stack: ModalState[]) => void;
};

const ModalStateContext = createContext<ModalContextValue>({} as ModalContextValue);

export const ModalStateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [stack, mutate] = useState<ModalState[]>([]);
  return (
    <ModalStateContext.Provider value={{ stack, mutate }}>{children}</ModalStateContext.Provider>
  );
};

ModalStateProvider.displayName = "ModalStateProvider";

export function useModalStack(): [stack: ModalState[], mutate: (stack: ModalState[]) => void] {
  const { stack, mutate } = useContext(ModalStateContext);
  return [stack, mutate];
}

export function useToggleModal(
  identifier: string | number
): (props?: Record<string, unknown>) => void {
  const { stack, mutate } = useContext(ModalStateContext);
  const modalStateRef = useRef<ModalState | null>(null);
  return (props?: Record<string, unknown>) => {
    if (modalStateRef.current === null) {
      const modalState: ModalState = { identifier, props };
      modalStateRef.current = modalState;
      mutate(stack.concat([modalState]));
    } else {
      if (stack.includes(modalStateRef.current)) {
        mutate(stack.filter((x) => x !== modalStateRef.current));
      }
      modalStateRef.current = null;
    }
  };
}
