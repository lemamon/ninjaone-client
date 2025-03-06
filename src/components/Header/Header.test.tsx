import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from ".";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("../../assets", () => ({
  getIcon: (name: string) => `${name}-icon-url`,
}));

describe("Header", () => {
  const mockOnAddDevice = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render logo", () => {
    render(<Header onAddDevice={mockOnAddDevice} />);
    const logo = screen.getByRole("img", { name: /logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "logo-icon-url");
  });

  it("should render add device button", () => {
    render(<Header onAddDevice={mockOnAddDevice} />);
    expect(screen.getByText("addDevice")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Add device icon" })).toHaveAttribute("src", "plus-icon-url");
  });

  it("should call onAddDevice when clicking the add button", async () => {
    render(<Header onAddDevice={mockOnAddDevice} />);
    await userEvent.click(screen.getByText("addDevice"));
    expect(mockOnAddDevice).toHaveBeenCalledTimes(1);
  });
});