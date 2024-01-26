import React from "react";
import DotsIcon from "./DotsIcon";
import { BiSignal1, BiSignal2, BiSignal3 } from "react-icons/bi";
import { TbAlertSquareFilled } from "react-icons/tb";

import "../css/icon.css";

/*
 * Icons for each priority
 * fn:
 * - align icon to center of parent
 * - increase width of icon
 */

const PriorityIcon = ({ priority, centerAlign, isWide }) => {
  const getIcon = () => {
    if (priority === 0) {
      return <DotsIcon />;
    } else if (priority === 1) {
      return <BiSignal1 className="icon" />;
    } else if (priority === 2) {
      return <BiSignal2 className="icon" />;
    } else if (priority === 3) {
      return <BiSignal3 className="icon" />;
    } else if (priority === 4) {
      return <TbAlertSquareFilled className="icon icon-orangered" />;
    }
  };
  let className = "";
  if (centerAlign) {
    className += "center-abs";
  }

  if (isWide) {
    className += " icon-wide";
  }
  if (className !== "") {
    return <div className={className}>{getIcon()}</div>;
  }
  return getIcon();
};

export default PriorityIcon;
