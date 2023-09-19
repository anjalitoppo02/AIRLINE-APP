import PageNotFound from "./PageNotFound";
import { render, screen } from "@testing-library/react";
import * as redux from "react-redux";

test("renders learn react link", () => {
  const useDispatchSpy = jest.spyOn(redux, "useDispatch");
  const mockDispatchFn = jest.fn();
  useDispatchSpy.mockReturnValue(mockDispatchFn);

  render(<PageNotFound />);
  const linkElement = screen.getByText("Oops! Page not found.");
  expect(linkElement).toBeDefined();
  expect(linkElement).toBeInTheDocument();
});
