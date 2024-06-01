/**
 * CommentInput Testing Scenario
 *
 * - should render the component correctly
 * - should call onCreateComment function when send button is clicked
 * - should clear the editor content after sending the comment
 */

import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentInput from "./CommentInput";

// Mock QuillEditor component
vi.mock("./QuillEditor", () => {
  return {
    __esModule: true,
    default: React.forwardRef((props, ref) => (
      <div ref={ref} data-testid="quill-editor">
        Quill Editor Mock
      </div>
    )),
  };
});

describe("CommentInput component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the component correctly", () => {
    render(<CommentInput onCreateComment={vi.fn()} />);

    expect(screen.getByTestId("quill-editor")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("should call onCreateComment function when send button is clicked", async () => {
    const mockOnCreateComment = vi.fn().mockResolvedValueOnce();

    render(<CommentInput onCreateComment={mockOnCreateComment} />);

    // Mock the quill editor content
    const quillEditor = screen.getByTestId("quill-editor");
    quillEditor.getLength = vi.fn().mockReturnValue(2); // To simulate content length > 1
    quillEditor.getSemanticHTML = vi
      .fn()
      .mockReturnValue("<p>Test Comment</p>");
    quillEditor.setContents = vi.fn();

    // Click the send button
    const sendButton = screen.getByRole("button", { name: /send/i });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockOnCreateComment).toHaveBeenCalledWith("<p>Test Comment</p>");
      expect(mockOnCreateComment).toHaveBeenCalledTimes(1);
      expect(quillEditor.setContents).toHaveBeenCalledWith([]);
    });
  });

  it("should clear the editor content after sending the comment", async () => {
    const mockOnCreateComment = vi.fn().mockResolvedValueOnce();

    render(<CommentInput onCreateComment={mockOnCreateComment} />);

    // Mock the quill editor content
    const quillEditor = screen.getByTestId("quill-editor");
    quillEditor.getLength = vi.fn().mockReturnValue(2); // To simulate content length > 1
    quillEditor.getSemanticHTML = vi
      .fn()
      .mockReturnValue("<p>Test Comment</p>");
    quillEditor.setContents = vi.fn();

    // Click the send button
    const sendButton = screen.getByRole("button", { name: /send/i });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(quillEditor.setContents).toHaveBeenCalledWith([]);
    });
  });
});
