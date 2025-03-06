import { getIcon } from "../../assets";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";

import "./styles.css";

interface HeaderProps {
  onAddDevice: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddDevice }) => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="header-content">
        <img className="logo" src={getIcon("logo")} />
        <Button className="add-device-btn" onClick={onAddDevice}>
          <img src={getIcon("plus")} alt="Add device icon" />
          {t("addDevice")}
        </Button>
      </div>
    </header>
  );
};
