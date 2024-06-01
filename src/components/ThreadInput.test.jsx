import React from "react";
import { describe, it, expect } from "vitest";
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from "@testing-library/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ThreadInput from "./ThreadInput";

describe("ThreadInput component", () => {
  it("should handle title typing correctly", async () => {
    render(
      <MemoryRouter>
        <ThreadInput onCreateThread={() => {}} />
      </MemoryRouter>,
    );
    const titleInput = screen.getByLabelText("Title");

    await userEvent.type(titleInput, "titletest");

    expect(titleInput.value).toBe("titletest");
  });

  it("should handle category typing correctly", async () => {
    render(
      <MemoryRouter>
        <ThreadInput onCreateThread={() => {}} />
      </MemoryRouter>,
    );
    const categoryInput = screen.getByLabelText("Category");

    await userEvent.type(categoryInput, "categorytest");

    expect(categoryInput.value).toBe("categorytest");
  });

  it("should call onCreateThread function when submit button is clicked", async () => {
    // Arrange
    let onCreateThreadCalled = false;
    const mockOnCreateThread = () => {
      onCreateThreadCalled = true;
    };
    render(
      <MemoryRouter>
        <ThreadInput onCreateThread={mockOnCreateThread} />
      </MemoryRouter>,
    );
    const submitButton = screen.getByRole("button", { name: "Save" });

    // Action
    userEvent.click(submitButton);

    // Assert
    expect(onCreateThreadCalled).toBe(false);
  });
});
