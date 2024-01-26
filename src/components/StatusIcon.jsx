import React from "react";
import "../css/icon.css";
import { GiNotebook } from "react-icons/gi";
import { TiAdjustContrast } from "react-icons/ti";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

/*
 * Icons for each status
 */

const StatusIcon = ({ status, className }) => {
  const getIcon = () => {
    if (status === "Backlog") {
      return <GiNotebook className={`icon-gray ${className}`} />;
    } else if (status === "Todo") {
      return <FaRegCircle className={`icon-gray ${className}`} />;
    } else if (status === "In progress") {
      return (
        <TiAdjustContrast
          className={`icon-progress icon-yellow ${className}`}
        />
      );
    } else if (status === "Done") {
      return <FaCheckCircle className={`icon-blue ${className}`} />;
    } else if (status === "Canceled") {
      return <MdCancel className={`icon-gray ${className}`} />;
    }
  };

  return getIcon();
};

export default StatusIcon;
