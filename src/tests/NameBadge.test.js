import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import NameBadge from "../components/NameBadge";

describe("NameBadge Component", () => {
  const renderNameBadge = (name, live) => {
    return render(<NameBadge name={name} live={live} />);
  };

  it("renders the NameBadge component with the correct initials", () => {
    const { getByText } = renderNameBadge("John Doe", true);

    // Check if the first letter of the first name is rendered
    expect(getByText("J")).toBeInTheDocument();

    // Check if the first letter of the last name is rendered
    expect(getByText("D")).toBeInTheDocument();
  });

  it("renders the NameBadge component without live status", () => {
    const { getByTestId } = renderNameBadge("John Doe", false);

    // Check if the badge does not have the "live" class
    expect(getByTestId("name-badge-status")).not.toHaveClass("live");
  });

  it("renders the NameBadge component with live status", () => {
    const { getByTestId } = renderNameBadge("John Doe", true);

    // Check if the badge has the "live" class
    expect(getByTestId("name-badge-status")).toBeInTheDocument();
  });
});
