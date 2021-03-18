import { ModalComponent, ModalComponentProps } from "./types";

const modalRegistryMap = new Map<number | string, ModalComponent>();

export function register<P extends ModalComponentProps = ModalComponentProps>(
  component: ModalComponent<P>
): void {
  const key = component.options?.identifier ?? component.displayName;
  if (typeof key !== "number" && typeof key !== "string") {
    throw new Error("The modal component must have an identifier");
  }
  modalRegistryMap.set(key, (component as unknown) as ModalComponent);
}

export function query(identifier: number | string): ModalComponent | null {
  return modalRegistryMap.get(identifier) ?? null;
}
