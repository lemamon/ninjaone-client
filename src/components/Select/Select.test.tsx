import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Select } from "./index";

describe("Select component", () => {
  const mockOptions = [
    { key: "1", value: "option1", text: "Option 1" },
    { key: "2", value: "option2", text: "Option 2" }
  ];

  it("renders correctly with label", () => {
    render(
      <Select
        label="Test Label"
        id="test"
        value=""
        onChange={() => {}}
        options={mockOptions}
      />
    );
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(
      <Select
        value=""
        onChange={() => {}}
        options={mockOptions}
      />
    );
    
    mockOptions.forEach(option => {
      expect(screen.getByText(option.text)).toBeInTheDocument();
    });
  });

  it("handles selection changes", () => {
    const handleChange = vi.fn();
    render(
      <Select
        value="option1"
        onChange={handleChange}
        options={mockOptions}
      />
    );
    
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "option2" } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(
      <Select
        value=""
        onChange={() => {}}
        options={mockOptions}
        className="custom-class"
      />
    );
    
    expect(screen.getByRole("combobox").parentElement).toHaveClass("custom-class");
  });
});