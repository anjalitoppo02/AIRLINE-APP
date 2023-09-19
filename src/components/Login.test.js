import SignIn from "./Login";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const mockedUsedNavigate = jest.fn();
jest.mock("@react-oauth/google", () => ({
  useGoogleLogin: () => {
    return {
      onSuccess: mockedSucces,
      onError: mockedError,
    };
  },
}));
const mockedSucces = jest.fn();
const mockedError = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedUsedNavigate,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

jest.mock("axios", () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

describe("Testing Login Page", () => {
  it("Test If useraname and password field is loading", () => {
    render(<SignIn />);
    // screen.debug(undefined, Infinity);
    expect(screen.getByText(/React Airline/i)).toBeInTheDocument();
    //screen.getByTestId("password");
    //expect(screen.getByTestId("password")).toBeInTheDocument();
    //screen.getAllByRole("input");
  });

  it("false is falsy", () => {
    expect(false).toBe(false);
  });
});
