import React from "react";
import DotsIcon from "./DotsIcon";

/*
 * Heading for each list
 */

const ListHeading = ({ label, icon, count }) => {
  return (
    <div className="list__header">
      {icon}
      <div className="flex gap-1">
        <span>{label}</span>
        <span className="text-gray">{count}</span>
      </div>
      <button className="list__add__button">+</button>
      <DotsIcon />
    </div>
  );
};

export default ListHeading;
