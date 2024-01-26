import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BoardHeader from "../components/BoardHeader";
// import BoardHeader from './BoardHeader';

// Mocking setQueryParams function from utility
jest.mock("../utility", () => ({
  setQueryParams: jest.fn()
}));

describe("BoardHeader Component", () => {
  const onGroupSelectMock = jest.fn();
  const setSelectedOrderingMock = jest.fn();

  const renderBoardHeader = () => {
    return render(
      <BoardHeader
        onGroupSelect={onGroupSelectMock}
        setSelectedOrdering={setSelectedOrderingMock}
        selectedOrdering="priority"
        selectedGroup="status"
      />
    );
  };

  it("renders the BoardHeader component", () => {
    const { getByText } = renderBoardHeader();
    expect(getByText("Display")).toBeInTheDocument();
  });

  it("displays filter options when the button is clicked", () => {
    const { getByText } = renderBoardHeader();
    fireEvent.click(getByText("Display"));

    expect(getByText("Grouping")).toBeInTheDocument();
    expect(getByText("Ordering")).toBeInTheDocument();
  });

  it("calls onGroupSelect when selecting a group option", () => {
    const { getByText, getByDisplayValue } = renderBoardHeader();

    fireEvent.click(getByText("Display"));
    fireEvent.change(getByDisplayValue("Status"), {
      target: { value: "status" }
    });

    expect(onGroupSelectMock).toHaveBeenCalledWith("status");
  });

  it("calls setSelectedOrdering when selecting an ordering option", () => {
    const { getByText, getByDisplayValue } = renderBoardHeader();

    fireEvent.click(getByText("Display"));
    fireEvent.change(getByDisplayValue("Priority"), {
      target: { value: "priority" }
    });

    expect(setSelectedOrderingMock).toHaveBeenCalledWith("priority");
  });

  it("closes the filter options when clicking outside", () => {
    const { getByText, getByDisplayValue, queryByText } = renderBoardHeader();

    fireEvent.click(getByText("Display"));
    fireEvent.click(document);

    expect(queryByText("Grouping")).toBeNull();
    expect(queryByText("Ordering")).toBeNull();
  });
});
