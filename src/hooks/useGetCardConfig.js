import { useEffect, useState } from "react";
import { getQueryParams } from "../utility";

/*
 * set card config based on the filters applied
 */

const useGetCardConfig = () => {
  const [showNameBadge, setShowNameBadge] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const { orderBy, group } = getQueryParams() || {};

  useEffect(() => {
    if (group === "status") {
      setShowStatus(false);
      setShowPriority(true);
      setShowNameBadge(true);
    } else if (group === "user") {
      setShowStatus(true);
      setShowPriority(true);
      setShowNameBadge(false);
    } else if (group === "priority") {
      setShowStatus(true);
      setShowPriority(false);
      setShowNameBadge(true);
    }
  }, [orderBy, group]);

  return { showNameBadge, showPriority, showStatus };
};
export default useGetCardConfig;
