export interface Device {
  id?: string;
  system_name: string;
  type: string;
  hdd_capacity: string;
}

export interface DeviceContextType {
  devices: Device[];
  search: string;
  deviceType: string;
  sortBy: string;
  setSearch: (search: string) => void;
  setDeviceType: (type: string) => void;
  setSortBy: (sortBy: string) => void;
  filteredDevices: Device[];
  addDevice: (newDevice: Device) => Promise<void>;
  editDevice: (device: Device) => Promise<void>;
  deleteDevice: (id: string) => Promise<void>;
  error?: string | null;
  setError: (error: string | null) => void;
}

export const SORT_OPTIONS = [
  "HDD Capacity (Descending)",
  "HDD Capacity (Ascending)",
];

enum DeviceType {
  WINDOWS = "Windows",
  MAC = "Mac",
  LINUX = "Linux",
}

export const DeviceTypeForm = [
  {
    key: "select",
    value: "",
    text: "Select Type",
  },
  ...Object.values(DeviceType).map((type) => ({
    key: type,
    value: type.toUpperCase(),
    text: `${type} workstation`,
  })),
];

export const DeviceTypeFilter = ["All", ...Object.values(DeviceType)];
