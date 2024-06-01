/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; // Ensure jest-dom is imported for the matchers
import { MemoryRouter } from "react-router-dom";
import RegisterInput from "./RegisterInput";

describe("RegisterInput component", () => {
  it("should handle name typing correctly", async () => {
    render(
      <MemoryRouter>
        <RegisterInput onRegister={() => {}} />
      </MemoryRouter>,
    );
    const nameInput = screen.getByPlaceholderText("Your name...");

    await userEvent.type(nameInput, "nametest");

    expect(nameInput).toHaveValue("nametest");
  });

  it("should handle email typing correctly", async () => {
    render(
      <MemoryRouter>
        <RegisterInput onRegister={() => {}} />
      </MemoryRouter>,
    );
    const emailInput = screen.getByPlaceholderText("Your email...");

    await userEvent.type(emailInput, "emailtest");

    expect(emailInput).toHaveValue("emailtest");
  });

  it("should handle password typing correctly", async () => {
    render(
      <MemoryRouter>
        <RegisterInput onRegister={() => {}} />
      </MemoryRouter>,
    );
    const passwordInput = screen.getByPlaceholderText("Your password...");

    await userEvent.type(passwordInput, "passwordtest");

    expect(passwordInput).toHaveValue("passwordtest");
  });
});
