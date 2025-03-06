import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Device, DeviceContextType, SORT_OPTIONS } from "../types";
import { deviceService } from "../services";

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [search, setSearch] = useState("");
  const [deviceType, setDeviceType] = useState("All");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  const onError = (error: unknown) => {
    if (error instanceof Error) {
      console.error("Error:", error);
      setError(error.message);
    } else {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred");
    }
  };

  const fetchDevices = async () => {
    try {
      const data = await deviceService.getAllDevices();
      setDevices(data);
    } catch (error) {
      onError(error);
    }
  };

  const addDevice = async (newDevice: Device) => {
    try {
      await deviceService.createDevice(newDevice);
      fetchDevices();
    } catch (error) {
      onError(error);
    }
  };

  const editDevice = async (device: Device) => {
    try {
      if (!device.id) {
        throw new Error("Device ID is missing");
      }

      await deviceService.updateDevice(device.id, device);
      fetchDevices();
    } catch (error) {
      onError(error);
    }
  };

  const deleteDevice = async (id: string) => {
    try {
      await deviceService.deleteDevice(id);
      fetchDevices();
    } catch (error) {
      onError(error);
    }
  };

  const filteredDevices = devices
    .filter(
      (device) =>
        device.system_name.toLowerCase().includes(search.toLowerCase()) &&
        (deviceType === "All" ||
          device.type.toLowerCase() === deviceType.toLowerCase())
    )
    .sort((a, b) =>
      sortBy.includes("Descending")
        ? parseInt(b.hdd_capacity) - parseInt(a.hdd_capacity)
        : parseInt(a.hdd_capacity) - parseInt(b.hdd_capacity)
    );

  const value = {
    devices,
    search,
    deviceType,
    sortBy,
    setSearch,
    setDeviceType,
    setSortBy,
    filteredDevices,
    addDevice,
    editDevice,
    deleteDevice,
    error,
    setError,
  };

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
}

export function useDevice() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
}
