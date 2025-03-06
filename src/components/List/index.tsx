import { Device } from "../../types";
import { Item } from "../Item";
import { useDevice } from "./../../contexts";
import "./styles.css";

interface ListProps {
  onEdit: (device: Device) => void;
  onDelete: (device: Device) => void;
}

export const List: React.FC<ListProps> = ({ onEdit, onDelete }) => {
    const { filteredDevices } = useDevice();
  
  return (
    <div className="devices-list">
      {filteredDevices.map((device) => (
        <Item
          key={device.id}
          device={device}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
