import { useTranslation } from "react-i18next";
import { Device } from "../../types";
import "./styles.css";
import { useDevice } from "../../contexts";
import { Button } from "../Button";

interface DeleteProps {
  onClose: () => void;
  device: Device;
  onSuccess?: (message: string) => void;
}

export const Delete = ({ onClose, device, onSuccess }: DeleteProps) => {
  const { t } = useTranslation();
  const { deleteDevice } = useDevice();

  const handleDelete = async () => {
    await deleteDevice(device.id!);
    onSuccess?.(t("deviceDeleted"));
    onClose();
  };

  return (
    <div className="delete-modal">
      <p>
        {t("deleteConfirmation", {
          deviceName: device.system_name,
        })}
      </p>
      <div className="form-actions">
        <Button className="cancel-button" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button className="delete-button" onClick={handleDelete}>
          {t("delete")}
        </Button>
      </div>
    </div>
  );
};
