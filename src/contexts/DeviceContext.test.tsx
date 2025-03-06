import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { DeviceProvider, useDevice } from "./DeviceContext";
import { deviceService } from "../services";
import { Device } from "../types";

vi.mock("../services");

const mockDevices: Device[] = [
  { id: "1", system_name: "Device 1", type: "Windows", hdd_capacity: "500" },
  { id: "2", system_name: "Device 2", type: "Mac", hdd_capacity: "250" },
];

const TestComponent = () => {
  const { devices, addDevice, editDevice, deleteDevice, error } = useDevice();

  return (
    <div>
      {error && <div data-testid="error">{error}</div>}
      <ul>
        {devices.map((device) => (
          <li key={device.id}>{device.system_name}</li>
        ))}
      </ul>
      <button onClick={() => addDevice(mockDevices[0])}>Add Device</button>
      <button onClick={() => editDevice({ ...mockDevices[0], system_name: "Updated Device" })}>Edit Device</button>
      <button onClick={() => deleteDevice(mockDevices[0].id as string)}>Delete Device</button>
    </div>
  );
};

describe("DeviceContext", () => {
  beforeEach(() => {
    (deviceService.getAllDevices as Mock).mockResolvedValue(mockDevices);
    (deviceService.createDevice as Mock).mockResolvedValue({});
    (deviceService.updateDevice as Mock).mockResolvedValue({});
    (deviceService.deleteDevice as Mock).mockResolvedValue({});
  });

  it("fetches and displays devices", async () => {
    render(
      <DeviceProvider>
        <TestComponent />
      </DeviceProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Device 1")).toBeInTheDocument();
      expect(screen.getByText("Device 2")).toBeInTheDocument();
    });
  });

  it("adds a device", async () => {
    render(
      <DeviceProvider>
        <TestComponent />
      </DeviceProvider>
    );

    screen.getByText("Add Device").click();

    await waitFor(() => {
      expect(deviceService.createDevice).toHaveBeenCalledWith(mockDevices[0]);
      expect(screen.getByText("Device 1")).toBeInTheDocument();
    });
  });

  it("edits a device", async () => {
    render(
      <DeviceProvider>
        <TestComponent />
      </DeviceProvider>
    );

    screen.getByText("Edit Device").click();

    const updatedDevice = { ...mockDevices[0], system_name: "Updated Device" };
    (deviceService.getAllDevices as Mock).mockResolvedValueOnce([updatedDevice, mockDevices[1]]);

    await waitFor(() => {
      expect(deviceService.updateDevice).toHaveBeenCalledWith("1", {
        ...mockDevices[0],
        system_name: "Updated Device",
      });
    });

    await waitFor(() => {
      expect(screen.getByText("Updated Device")).toBeInTheDocument();
    });
  });

  it("deletes a device", async () => {
    render(
      <DeviceProvider>
        <TestComponent />
      </DeviceProvider>
    );

    screen.getByText("Delete Device").click();

    await waitFor(() => {
      expect(deviceService.deleteDevice).toHaveBeenCalledWith("1");
      expect(screen.queryByText("Device 1")).not.toBeInTheDocument();
    });
  });

  it("handles errors", async () => {
    (deviceService.getAllDevices as Mock).mockRejectedValue(new Error("Failed to fetch devices"));

    render(
      <DeviceProvider>
        <TestComponent />
      </DeviceProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent("Failed to fetch devices");
    });
  });
});
