import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./index";

describe("Button component", () => {
  it("renders correctly with children", () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the className prop", () => {
    render(<Button onClick={() => {}} className="test-class">Click me</Button>);
    expect(screen.getByRole("button")).toHaveClass("button test-class");
  });

  it("is disabled when the disabled prop is true", () => {
    render(<Button onClick={() => {}} disabled>Click me</Button>);
    expect(screen.getByText("Click me")).toBeDisabled();
  });

  it("sets the button type correctly", () => {
    render(<Button onClick={() => {}} type="submit">Submit</Button>);
    expect(screen.getByText("Submit")).toHaveAttribute("type", "submit");
  });
});
