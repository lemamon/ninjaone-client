import { describe, it, expect, vi, afterEach } from "vitest";
import { deviceService } from "./deviceService";
import { Device } from "../types";

vi.mock("axios");

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

vi.mock('axios', async () => {
  return {
    default: {
      create: vi.fn(() => ({
        get: mocks.get,
        post: mocks.post,
        put: mocks.put,
        delete: mocks.delete
      })),
      get: mocks.get,
      post: mocks.post,
      put: mocks.put,
      delete: mocks.delete
    },
  };
});

describe("deviceService", () => {
  const API_URL = import.meta.env.VITE_API_URL;

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch all devices", async () => {
    const devices: Device[] = [{ id: "1", system_name: "Device 1", type: "WINDOWS", hdd_capacity: "500" }];
    mocks.get.mockResolvedValue({ data: devices });

    const result = await deviceService.getAllDevices();
    expect(result).toEqual(devices);
    expect(mocks.get).toHaveBeenCalledWith(API_URL);
  });

  it("should fetch a single device by id", async () => {
    const device: Device = { id: "1", system_name: "Device 1", type: "WINDOWS", hdd_capacity: "500" };
    mocks.get.mockResolvedValue({ data: device });

    const result = await deviceService.getDevice("1");
    expect(result).toEqual(device);
    expect(mocks.get).toHaveBeenCalledWith(`${API_URL}/1`);
  });

  it("should create a new device", async () => {
    const newDevice: Device = { id: "1", system_name: "Device 1", type: "WINDOWS", hdd_capacity: "500" };
    mocks.post.mockResolvedValue({ data: newDevice });

    const result = await deviceService.createDevice(newDevice);
    expect(result).toEqual(newDevice);
    expect(mocks.post).toHaveBeenCalledWith(API_URL, newDevice);
  });

  it("should update an existing device", async () => {
    const updatedDevice: Device = { id: "1", system_name: "Updated Device", type: "WINDOWS", hdd_capacity: "1000" };
    mocks.put.mockResolvedValue({ data: 1 });

    const result = await deviceService.updateDevice("1", updatedDevice);
    expect(result).toEqual(1);
    expect(mocks.put).toHaveBeenCalledWith(`${API_URL}/1`, updatedDevice);
  });

  it("should delete a device by id", async () => {
    mocks.delete.mockResolvedValue({ data: 1 });

    const result = await deviceService.deleteDevice("1");
    expect(result).toEqual(1);
    expect(mocks.delete).toHaveBeenCalledWith(`${API_URL}/1`);
  });
});
