import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import Form from "./Form";
interface FormTypes {
  email?: string;
  password?: string;
  confirmPassword?: string;
}
afterEach(cleanup);
const typeIntoForm = ({ email, password, confirmPassword }: FormTypes) => {
  const emailElement: HTMLElement = screen.getByLabelText(/email:/i);
  const passwordElement: HTMLElement = screen.getByLabelText("Password:");
  const confirmPasswordElement: HTMLElement =
    screen.getByLabelText(/confirm-password/i);

  if (email) {
    user.type(emailElement, email);
  }
  if (password) {
    user.type(passwordElement, password);
  }
  if (confirmPassword) {
    user.type(confirmPasswordElement, confirmPassword);
  }
  return {
    emailElement,
    passwordElement,
    confirmPasswordElement,
  };
};
beforeEach(() => {
  render(<Form />);
});
describe("Initial value for every input is empty string", () => {
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
  //   beforeEach(() => {
  //     render(<Form />);
  //   });
  test("expected value for email", () => {
    const { emailElement } = typeIntoForm({ email: "ok@gmail.com" });
    expect((emailElement as HTMLInputElement).value).toBe("ok@gmail.com");
  });
  test("password value for email", () => {
    const { passwordElement } = typeIntoForm({ password: "plm09@#" });
    expect((passwordElement as HTMLInputElement).value).toBe("plm09@#");
  });
  test("confirm password value for email", () => {
    const { confirmPasswordElement } = typeIntoForm({
      confirmPassword: "123plm",
    });
    expect((confirmPasswordElement as HTMLInputElement).value).toBe("123plm");
  });
});

describe("ger Error if input is empty after submit", () => {
  //   beforeEach(() => {
  //     render(<Form />);
  //   });
  it("get error if email is invalid", () => {
    const buttonElement = screen.getByRole("button");
    const errorText = screen.queryByText(/in valid email/i);
    expect(errorText as HTMLElement).not.toBeInTheDocument();
    const { emailElement } = typeIntoForm({ email: "aohofhscom" });
    user.click(buttonElement);
    const errorTextAgain = screen.queryByText(/in valid email/i);
    expect(errorTextAgain as HTMLElement).toBeInTheDocument();
  });

  it("get error if password is empty", () => {
    const { emailElement } = typeIntoForm({ email: "aohofhscom" });
    const errorElement = screen.queryByText(
      /in valid password. should be at least 5 character/i
    );
    const buttonElement = screen.getByRole("button");
    expect(errorElement).not.toBeInTheDocument();
    const { passwordElement } = typeIntoForm({ password: "1234" });

    user.click(buttonElement);
    const errorElementAgain = screen.queryByText(
      /in valid password. should be at least 5 character/i
    );
    expect(errorElementAgain).toBeInTheDocument();
  });
  it("if confirm password does not match with upper password", () => {
    const { emailElement } = typeIntoForm({ email: "mma@arafat" });

    const buttonElement = screen.getByRole("button");
    const errorElement = screen.queryByText(/in valid Matching/i);
    expect(errorElement).not.toBeInTheDocument();

    const { passwordElement } = typeIntoForm({ password: "hello" });
    const { confirmPasswordElement } = typeIntoForm({
      confirmPassword: "helllo",
    });

    user.click(buttonElement);
    const errorElementAgain = screen.queryByText(/in valid Matching/i);
    expect(errorElementAgain).toBeInTheDocument();
  });
  it("if everything is ok then no error message", () => {
    const { emailElement } = typeIntoForm({ email: "mma@arafat" });
    const { passwordElement } = typeIntoForm({ password: "123456" });
    const { confirmPasswordElement } = typeIntoForm({
      confirmPassword: "123456",
    });

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
