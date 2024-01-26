import React from "react";
import { render } from "@testing-library/react";
// import Card from "./Card";

import useGetCardConfig from "../hooks/useGetCardConfig";
import Card from "../components/Card";
// import * as useGetCardConfigModule from "../hooks/useGetCardConfig";

jest.mock("../hooks/useGetCardConfig");

describe("Card Component", () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    useGetCardConfig.mockReset();
  });
  it("renders the card with all elements", () => {
    useGetCardConfig.mockReturnValue({
      showNameBadge: true,
      showPriority: false,
      showStatus: true
    });
    const testData = {
      title: "Test Title",
      id: "1",
      priority: 2,
      status: "In Progress",
      tag: ["Tag1", "Tag2"],
      name: "John Doe",
      userStatus: true
    };

    const { getByText, getByTestId } = render(<Card {...testData} />);

    // Check if the rendered elements exist
    expect(getByText(testData.title)).toBeInTheDocument();
    expect(getByText(testData.id)).toBeInTheDocument();
  });

  it("renders the card without priority icon when showPriority is false", () => {
    // Set up the specific implementation for this test case
    useGetCardConfig.mockReturnValue({
      showNameBadge: true,
      showPriority: false,
      showStatus: true
    });

    const testData = {
      title: "Test Title",
      id: "1",
      priority: 2,
      status: "In Progress",
      tag: ["Tag1", "Tag2"],
      name: "John Doe",
      userStatus: true
    };

    const { queryByTestId } = render(<Card {...testData} />);

    expect(queryByTestId("card-priority-icon")).toBeNull();
  });

  it("renders the card without status icon when showStatus is false", () => {
    // Set up the specific implementation for this test case
    useGetCardConfig.mockReturnValue({
      showNameBadge: true,
      showPriority: true,
      showStatus: false
    });

    const testData = {
      title: "Test Title",
      id: "1",
      priority: 2,
      status: "In Progress",
      tag: ["Tag1", "Tag2"],
      name: "John Doe",
      userStatus: true
    };

    const { queryByTestId } = render(<Card {...testData} />);

    expect(queryByTestId("card-status-icon")).toBeNull();
  });

  it("renders the card without name badge when showNameBadge is false", () => {
    useGetCardConfig.mockReturnValue({
      showNameBadge: false,
      showPriority: false,
      showStatus: false
    });

    const testData = {
      title: "Test Title",
      id: "1",
      priority: 2,
      status: "In Progress",
      tag: ["Tag1", "Tag2"],
      name: "John Doe",
      userStatus: true
    };

    const { queryByTestId } = render(<Card {...testData} />);

    // Check if the name badge is not rendered
    expect(queryByTestId("card-name-badge")).toBeNull();
  });
});
