import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Filters } from ".";
import { useDevice } from "../../contexts";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("../../contexts");

describe("Filters", () => {
  const mockSetSearch = vi.fn();
  const mockSetDeviceType = vi.fn();
  const mockSetSortBy = vi.fn();
  const mockSetError = vi.fn();

  beforeEach(() => {
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

    vi.clearAllMocks();
    vi.mocked(useDevice).mockImplementation(() => defaultProps);
  });

  it("should render search input", () => {
    render(<Filters />);
    expect(screen.getByPlaceholderText("search")).toBeInTheDocument();
  });

  it("should call setSearch when search input changes", async () => {
    render(<Filters />);
    const searchInput = screen.getByPlaceholderText("search");
    await userEvent.type(searchInput, "t");
    expect(mockSetSearch).toHaveBeenCalledWith("t");
  });

  it("should call setDeviceType when device type select changes", async () => {
    render(<Filters />);
    const select = screen.getAllByRole("combobox")[0];
    await userEvent.selectOptions(select, "Windows");
    expect(mockSetDeviceType).toHaveBeenCalledWith("Windows");
  });

  it("should call setSortBy when sort select changes", async () => {
    render(<Filters />);
    const sortSelect = screen.getAllByRole("combobox")[1];
    await userEvent.selectOptions(sortSelect, "HDD Capacity (Ascending)");
    expect(mockSetSortBy).toHaveBeenCalledWith("HDD Capacity (Ascending)");
  });
});
