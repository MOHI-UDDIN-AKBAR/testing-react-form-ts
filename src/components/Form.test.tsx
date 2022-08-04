import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import Form from "./Form";

describe("Initial value for every input is empty string", () => {
  beforeEach(() => {
    render((<Form />) as JSX.Element);
  });

  test("email value should be empty string", () => {
    const emailElement = screen.getByLabelText(/email:/i);
    expect((emailElement as HTMLInputElement).value).toBe("");
  });
  test("password value should be empty string", () => {
    const passwordElement = screen.getByLabelText("Password:");
    expect((passwordElement as HTMLInputElement).value).toBe("");
  });
  test("confirm-password value should be empty string", () => {
    const passwordElement = screen.getByLabelText(/confirm-password:/i);
    expect((passwordElement as HTMLInputElement).value).toBe("");
  });
});

describe("after typing expected value", () => {
  beforeEach(() => {
    render((<Form />) as JSX.Element);
  });
  test("expected value for email", () => {
    const emailElement = screen.getByLabelText(/email:/i);
    user.type(emailElement, "ok@gmail.com");
    expect((emailElement as HTMLInputElement).value).toBe("ok@gmail.com");
  });
  test("password value for email", () => {
    const passwordElement = screen.getByLabelText("Password:");
    user.type(passwordElement, "plm09@#");
    expect((passwordElement as HTMLInputElement).value).toBe("plm09@#");
  });
  test("confirm password value for email", () => {
    const confirmPasswordElement = screen.getByLabelText(/confirm-Password/i);
    user.type(confirmPasswordElement, "123plm");
    expect((confirmPasswordElement as HTMLInputElement).value).toBe("123plm");
  });
});

describe("ger Error if input is empty after submit", () => {
  beforeEach(() => {
    render((<Form />) as JSX.Element);
  });
  it("get error if email is invalid", () => {
    const emailElement = screen.getByLabelText(/email:/i);
    const buttonElement = screen.getByRole("button");
    const errorText = screen.queryByText(/in valid email/i);
    expect(errorText as HTMLElement).not.toBeInTheDocument();
    user.type(emailElement, "aohofhscom");
    user.click(buttonElement);
    const errorTextAgain = screen.queryByText(/in valid email/i);
    expect(errorTextAgain as HTMLElement).toBeInTheDocument();
  });
  it("get error if email is empty", () => {
    const emailElement = screen.getByLabelText(/email:/i);
    const buttonElement = screen.getByRole("button");
    const errorText = screen.queryByText(/email is empty/i);
    expect(errorText as HTMLElement).not.toBeInTheDocument();
    user.type(emailElement, "");
    user.click(buttonElement);
    const errorTextAgain = screen.queryByText(/email is empty/i);
    expect(errorTextAgain as HTMLElement).toBeInTheDocument();
  });
  it("get error if password is empty", () => {
    const emailElement = screen.getByLabelText(/email:/i);
    user.type(emailElement, "");
    const passwordElement = screen.getByLabelText("Password:");
    const errorElement = screen.queryByText(
      /in valid password. should be at least 5 character/i
    );
    const buttonElement = screen.getByRole("button");
    expect(errorElement).not.toBeInTheDocument();
    user.type(passwordElement, "");
    user.click(buttonElement);
    const errorElementAgain = screen.queryByText(
      /in valid password. should be at least 5 character/i
    );
    expect(errorElementAgain).toBeInTheDocument();
  });
  it("if confirm password does not match with upper password", () => {
    const emailElement = screen.getByLabelText(/email:/i);
    const passwordElement = screen.getByLabelText("Password:");
    const confirmPasswordElement = screen.getByLabelText(/confirm-password/i);
    user.type(emailElement, "");
    const buttonElement = screen.getByRole("button");
    const errorElement = screen.queryByText(/in valid Matching/i);
    expect(errorElement).not.toBeInTheDocument();
    user.type(passwordElement, "hello");
    user.type(confirmPasswordElement, "helllo");
    user.click(buttonElement);
    const errorElementAgain = screen.queryByText(/in valid Matching/i);
    expect(errorElementAgain).toBeInTheDocument();
  });
  it("if everything is ok then no error message", () => {
    const emailElement = screen.getByLabelText(/email:/i);
    const passwordElement = screen.getByLabelText("Password:");
    const confirmPasswordElement = screen.getByLabelText(/confirm-password/i);
    const errorElementOne = screen.queryByText(/in valid email/i);
    const errorElementTwo = screen.queryByText(
      /in valid password. should be at least 5 character/i
    );
    const errorElementThree = screen.queryByText(/in valid Matching/i);
    expect(errorElementOne).not.toBeInTheDocument();
    expect(errorElementTwo).not.toBeInTheDocument();
    expect(errorElementThree).not.toBeInTheDocument();
  });
});
