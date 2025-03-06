import { useTranslation } from "react-i18next";
import { Device } from "../../types";
import "./styles.css";
import { useDevice } from "../../contexts";
import { Button } from "../Button";

interface DeleteProps {
  onClose: () => void;
  device: Device;
}

export const Delete = ({ onClose, device }: DeleteProps) => {
  const { t } = useTranslation();
  const { deleteDevice } = useDevice();

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
        <Button
          className="delete-button"
          onClick={() => {
            deleteDevice(device.id!);
            onClose();
          }}
        >
          {t("delete")}
        </Button>
      </div>
    </div>
  );
};
