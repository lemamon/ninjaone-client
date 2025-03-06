import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Item } from ".";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("../../assets", () => ({
  getIcon: (name: string) => `${name}-icon-url`,
}));

describe("Item component", () => {
  const mockDevice = {
    id: "1",
    system_name: "Test Device",
    type: "WINDOWS",
    hdd_capacity: "500"
  };

  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render device information correctly", () => {
    render(
      <Item
        device={mockDevice}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(mockDevice.system_name)).toBeInTheDocument();
    expect(screen.getByText(`${mockDevice.type} workstation - ${mockDevice.hdd_capacity} GB`)).toBeInTheDocument();
  });

  it("should render device type icon", () => {
    render(
      <Item
        device={mockDevice}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const icon = screen.getByAltText("windows_icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "WINDOWS-icon-url");
  });

  it("should call onEdit when edit button is clicked", async () => {
    render(
      <Item
        device={mockDevice}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    await userEvent.click(screen.getByText("Edit"));
    expect(mockOnEdit).toHaveBeenCalledWith(mockDevice);
  });

  it("should call onDelete when delete button is clicked", async () => {
    render(
      <Item
        device={mockDevice}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    await userEvent.click(screen.getByText("Delete"));
    expect(mockOnDelete).toHaveBeenCalledWith(mockDevice);
  });
});