import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { List } from ".";
import { useDevice } from "../../contexts";

vi.mock("../../contexts");

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  // Mock I18nextProvider component
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const mockDevices = [
  {
    id: "1",
    system_name: "Device 1",
    type: "WINDOWS",
    hdd_capacity: "500"
  },
  {
    id: "2",
    system_name: "Device 2",
    type: "MAC",
    hdd_capacity: "1000"
  }
];

describe("List", () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  const mockSetSearch = vi.fn();
  const mockSetDeviceType = vi.fn();
  const mockSetSortBy = vi.fn();
  const mockSetError = vi.fn();

  const defaultProps = {
    error: null,
    search: "",
    deviceType: "",
    sortBy: "",
    devices: [],
    filteredDevices: mockDevices,
    addDevice: vi.fn(),
    editDevice: mockOnEdit,
    deleteDevice: mockOnDelete,
    setSearch: mockSetSearch,
    setDeviceType: mockSetDeviceType,
    setSortBy: mockSetSortBy,
    setError: mockSetError,
  };
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useDevice).mockImplementation(() => defaultProps);
  });

  it("should render all devices", () => {
    render(<List onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    expect(screen.getByText("Device 1")).toBeInTheDocument();
    expect(screen.getByText("Device 2")).toBeInTheDocument();
  });

  it("should render empty list when there are no devices", () => {
    vi.mocked(useDevice).mockImplementation(() => ({
      ...defaultProps,
      filteredDevices: []
    }));

    render(<List onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    expect(screen.queryByText("Device 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Device 2")).not.toBeInTheDocument();
  });
});