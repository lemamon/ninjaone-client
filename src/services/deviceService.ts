import axios from "axios";
import { Device } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const deviceService = {
  async getAllDevices(): Promise<Device[]> {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to fetch devices");
      }
      throw error;
    }
  },

  async getDevice(id: string): Promise<Device> {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to fetch device");
      }
      throw error;
    }
  },

  async createDevice(device: Device): Promise<Device> {
    try {
      const response = await axios.post(API_URL, device);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to create device");
      }
      throw error;
    }
  },

  async updateDevice(id: string, device: Device): Promise<number> {
    try {
      const response = await axios.put(`${API_URL}/${id}`, device);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to update device");
      }
      throw error;
    }
  },

  async deleteDevice(id: string): Promise<number> {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to delete device");
      }
      throw error;
    }
  },
};
