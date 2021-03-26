import "../AlertModal";
import { useToggleModal } from "../context";

export function useAlert(): (message: string, onClose?: (response: boolean) => void) => void {
  const toggleAlertModal = useToggleModal("AlertModal");
  return (message, onClose) => toggleAlertModal({ message, onClose });
}
