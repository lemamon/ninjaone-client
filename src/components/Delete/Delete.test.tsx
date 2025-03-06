import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Delete } from ".";
import { DeviceProvider } from "../../contexts/DeviceContext";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, params?: { deviceName: string }) => {
      if (key === "deleteConfirmation") {
        return `Are you sure you want to delete ${params?.deviceName}?`;
      }
      return key;
    },
  }),
}));

const mockDevice = {
  id: "1",
  system_name: "Test Device",
  type: "WINDOWS",
  hdd_capacity: "500"
};

const mockDeleteDevice = vi.fn();
vi.mock("../../contexts", () => ({
  useDevice: () => ({
    deleteDevice: mockDeleteDevice
  })
}));

describe("Delete", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render delete confirmation message", () => {
    render(
      <DeviceProvider>
        <Delete onClose={mockOnClose} device={mockDevice} />
      </DeviceProvider>
    );

    expect(screen.getByText("Are you sure you want to delete Test Device?")).toBeInTheDocument();
  });

  it("should call onClose when cancel button is clicked", async () => {
    render(
      <DeviceProvider>
        <Delete onClose={mockOnClose} device={mockDevice} />
      </DeviceProvider>
    );

    await userEvent.click(screen.getByText("cancel"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should call deleteDevice and onClose when delete button is clicked", async () => {
    render(
      <DeviceProvider>
        <Delete onClose={mockOnClose} device={mockDevice} />
      </DeviceProvider>
    );

    await userEvent.click(screen.getByText("delete"));
    expect(mockDeleteDevice).toHaveBeenCalledWith("1");
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});