import React from "react";
import "../css/NameBadge.css";

/*
 * Return Badge for each name with active status symbol
 * fn:
 * - genrate unique BG for each name
 */

const NameBadge = ({ name, live }) => {
  // Extract the first letter and last name
  const [firstLetter, lastName] = name.split(" ");

  // Generate a unique background color based on the name
  const generateBackgroundColor = () => {
    const hash = name
      .split("")
      .reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) & 0xcccccc, 0);
    const color = "#" + ("00000" + (hash & 0xffffff).toString(16)).slice(-6);
    return color;
  };

  const badgeStyle = {
    backgroundColor: generateBackgroundColor()
  };

  return (
    <div className="name__badge" data-testid="name-badge" style={badgeStyle}>
      <div className="name__badge__text">
        <span>{typeof firstLetter === "string" ? firstLetter[0] : ""}</span>
        <span className="last-name">
          {typeof lastName === "string" ? lastName[0] : ""}
        </span>
      </div>
      {live ? (
        <div className="badge__status live" data-testid="name-badge-status" />
      ) : (
        <div className="badge__status" data-testid="name-badge-status" />
      )}
    </div>
  );
};

export default NameBadge;
