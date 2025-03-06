import { useTranslation } from "react-i18next";
import { Device } from "../../types";
import "./styles.css";
import { useDevice } from "../../contexts";

interface DeleteProps {
  onClose: () => void;
  device: Device;
}

export const Delete = ({
  onClose,
  device,
}: DeleteProps) => {
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
          <button className="cancel-button" onClick={onClose}>
            {t("cancel")}
          </button>
          <button
            className="delete-button"
            onClick={() => {
              deleteDevice(device.id!);
              onClose();
            }}
          >
            {t("delete")}
          </button>
        </div>
      </div>
  );
};
