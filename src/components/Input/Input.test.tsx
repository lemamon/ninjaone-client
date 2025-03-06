import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./index";

describe("Input component", () => {
  it("renders correctly with label", () => {
    render(<Input label="Test Label" id="test" />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("renders correctly with icon", () => {
    render(<Input icon="search" />);
    expect(screen.getByRole("textbox").parentElement).toHaveClass("with-icon");
    expect(screen.getByRole("textbox").parentElement?.querySelector(".icon-search")).toBeInTheDocument();
  });

  it("handles input changes", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    
    fireEvent.change(input, { target: { value: "test value" } });
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue("test value");
  });

  it("forwards additional props to input element", () => {
    render(<Input type="number" min="0" max="100" placeholder="Enter a number" />);
    const input = screen.getByRole("spinbutton");
    
    expect(input).toHaveAttribute("type", "number");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "100");
    expect(input).toHaveAttribute("placeholder", "Enter a number");
  });
});