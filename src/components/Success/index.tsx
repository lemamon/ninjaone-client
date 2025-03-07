import { Modal } from "../Modal";
import { Button } from "../Button";

import "./styles.css";
interface SuccessProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export const Success = ({ isOpen, onClose, message }: SuccessProps) => {
  return (
    <Modal title="Success" isOpen={isOpen} onClose={onClose}>
      <div className="success-modal">
        <p>{message}</p>
        <div className="form-actions">
          <Button className="submit-button" onClick={onClose}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};