import { Modal } from "../Modal";
import { useDevice } from "../../contexts/DeviceContext";

export const ErrorModal = () => {
  const { error, setError } = useDevice();

  if (!error) return null;

  return (
    <Modal title="Error" isOpen={Boolean(error)} onClose={() => setError(null)}>
      <p>{error}</p>
    </Modal>
  );
};
