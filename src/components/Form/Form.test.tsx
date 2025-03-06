import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Form } from ".";
import { useDevice } from "../../contexts/DeviceContext";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("../../contexts/DeviceContext");

describe("Form component", () => {
  const mockOnClose = vi.fn();
  const mockAddDevice = vi.fn();
  const mockEditDevice = vi.fn();

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
    filteredDevices: [],
    addDevice: vi.fn(),
    editDevice: vi.fn(),
    deleteDevice: vi.fn(),
    setSearch: mockSetSearch,
    setDeviceType: mockSetDeviceType,
    setSortBy: mockSetSortBy,
    setError: mockSetError,
  };
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useDevice).mockImplementation(() => defaultProps);
  });

  it("should render empty form when no device is provided", () => {
    render(<Form onClose={mockOnClose} />);
    
    expect(screen.getByLabelText(/systemName/)).toHaveValue("");
    expect(screen.getByLabelText(/deviceType/)).toHaveValue("");
    expect(screen.getByLabelText(/hddCapacity/)).toHaveValue("");
  });

  it("should render form with device data when device is provided", () => {
    const mockDevice = {
      id: "1",
      system_name: "Test Device",
      type: "WINDOWS",
      hdd_capacity: "500"
    };

    render(<Form onClose={mockOnClose} device={mockDevice} />);
    
    expect(screen.getByLabelText(/systemName/)).toHaveValue(mockDevice.system_name);
    expect(screen.getByLabelText(/deviceType/)).toHaveValue(mockDevice.type);
    expect(screen.getByLabelText(/hddCapacity/)).toHaveValue(mockDevice.hdd_capacity);
  });

  it("should call addDevice when submitting new device", async () => {
    render(<Form onClose={mockOnClose} />);
    
    await userEvent.type(screen.getByLabelText(/systemName/), "New Device");
    await userEvent.selectOptions(screen.getByLabelText(/deviceType/), "WINDOWS");
    await userEvent.type(screen.getByLabelText(/hddCapacity/), "1000");
    
    await userEvent.click(screen.getByText("submit"));
    
    expect(mockAddDevice).toHaveBeenCalledWith({
      system_name: "New Device",
      type: "WINDOWS",
      hdd_capacity: "1000"
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should call editDevice when submitting existing device", async () => {
    const mockDevice = {
      id: "1",
      system_name: "Test Device",
      type: "WINDOWS",
      hdd_capacity: "500"
    };

    render(<Form onClose={mockOnClose} device={mockDevice} />);
    
    await userEvent.clear(screen.getByLabelText(/systemName/));
    await userEvent.type(screen.getByLabelText(/systemName/), "Updated Device");
    
    await userEvent.click(screen.getByText("submit"));
    
    expect(mockEditDevice).toHaveBeenCalledWith({
      id: "1",
      system_name: "Updated Device",
      type: "WINDOWS",
      hdd_capacity: "500"
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should disable submit button when form is invalid", () => {
    render(<Form onClose={mockOnClose} />);
    expect(screen.getByText("submit")).toBeDisabled();
  });

  it("should call onClose when cancel button is clicked", async () => {
    render(<Form onClose={mockOnClose} />);
    await userEvent.click(screen.getByText("cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});