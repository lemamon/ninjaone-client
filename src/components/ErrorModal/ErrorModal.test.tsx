import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ErrorModal } from ".";
import { useDevice } from "../../contexts/DeviceContext";

vi.mock("../../contexts/DeviceContext");
vi.mock("../Modal", () => ({
  Modal: ({
    children,
    title,
    isOpen,
    onClose,
  }: {
    children: React.ReactNode;
    title: string;
    isOpen: boolean;
    onClose: () => void;
  }) => {
    if (!isOpen) return null;
    return (
      <div data-testid="modal">
        <h2>{title}</h2>
        {children}
        <button onClick={onClose}>×</button>
      </div>
    );
  },
}));

describe("ErrorModal", () => {
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

  it("should not render when there is no error", () => {
    render(<ErrorModal />);
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("should render error message when there is an error", () => {
    vi.mocked(useDevice).mockImplementation(() => ({
      ...defaultProps,
      error: "Test error message",
    }));

    render(<ErrorModal />);
    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("should call setError with null when close button is clicked", async () => {
    vi.mocked(useDevice).mockImplementation(() => ({
      ...defaultProps,
      error: "Test error message",
    }));

    render(<ErrorModal />);
    await userEvent.click(screen.getByText("×"));
    expect(defaultProps.setError).toHaveBeenCalledWith(null);
  });

  it("should not call setError when close button is clicked and there is no error", async () => {
    render(<ErrorModal />);
    const closeButton = screen.queryByText("×");
    if (closeButton) {
      await userEvent.click(closeButton);
    }
    expect(defaultProps.setError).not.toHaveBeenCalled();
  });

  it("should render the modal with correct title", () => {
    vi.mocked(useDevice).mockImplementation(() => ({
      ...defaultProps,
      error: "Test error message",
    }));

    render(<ErrorModal />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
