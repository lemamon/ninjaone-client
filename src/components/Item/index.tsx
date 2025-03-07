import { Device } from "../../types";
import { getIcon } from "../../assets";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";

import "./styles.css";

interface ItemProps {
  device: Device;
  onEdit: (device: Device) => void;
  onDelete: (device: Device) => void;
}

export const Item: React.FC<ItemProps> = ({ device, onEdit, onDelete }) => {
  const { t } = useTranslation();

  return (
    <div className="device-item">
      <div className="device-info">
        <div className="device-name">
          <img
            src={getIcon(device.type)}
            alt={t(`${device.type.toLowerCase()}_icon`)}
            className="os-icon"
          />
          <h3>{device.system_name}</h3>
        </div>
        <p>
          {t(device.type)} {t("workstation")} - {device.hdd_capacity} {t("GB")}
        </p>
      </div>
      <div className="device-actions">
        <Button className="action-btn" onClick={() => {}}>
          <img src={getIcon("menu")} alt={t("menu_icon")} />
        </Button>
        <div className="menu">
          <Button className="edit-btn" onClick={() => onEdit(device)}>
            {t("Edit")}
          </Button>
          <Button className="delete-btn" onClick={() => onDelete(device)}>
            {t("Delete")}
          </Button>
        </div>
      </div>
    </div>
  );
};
