import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from ".";

describe("Modal", () => {
  const mockOnClose = vi.fn();
  const mockTitle = "Test Modal";
  const mockContent = "Test Content";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title={mockTitle}>
        {mockContent}
      </Modal>
    );

    expect(screen.queryByText(mockTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(mockContent)).not.toBeInTheDocument();
  });

  it("should render when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title={mockTitle}>
        {mockContent}
      </Modal>
    );

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText(mockContent)).toBeInTheDocument();
  });

  it("should call onClose when clicking the close button", async () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title={mockTitle}>
        {mockContent}
      </Modal>
    );

    await userEvent.click(screen.getByText("×"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when clicking the overlay", async () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title={mockTitle}>
        {mockContent}
      </Modal>
    );

    await userEvent.click(screen.getByTestId("modal-overlay"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when clicking the modal content", async () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title={mockTitle}>
        {mockContent}
      </Modal>
    );

    await userEvent.click(screen.getByTestId("modal-content"));
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});