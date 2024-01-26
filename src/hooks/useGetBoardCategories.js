import NameBadge from "../components/NameBadge";
import PriorityIcon from "../components/PriorityIcon";

import "../css/icon.css";
import StatusIcon from "../components/StatusIcon";

/*
 * return header titles based of the applied filters
 */

const useGetBoardCategories = () => {
  const getUserCategories = (userData = []) => {
    let boardConfig = {
      keyId: "userId"
    };
    let rowsData = userData.map((user) => {
      return {
        icon: <NameBadge name={user.name} live={user.available} />,
        label: user.name,
        matchValue: user.id
      };
    });
    boardConfig["rows"] = rowsData;
    return boardConfig;
  };

  const getStatusCategories = () => {
    return {
      keyId: "status",
      rows: [
        {
          icon: <StatusIcon status={"Backlog"} className="font-1" />,
          label: "Backlog",
          matchValue: "Backlog"
        },
        {
          icon: <StatusIcon status={"Todo"} className="font-1" />,
          label: "Todo",
          matchValue: "Todo"
        },
        {
          icon: <StatusIcon status={"In progress"} />,
          label: "In progress",
          matchValue: "In progress"
        },
        {
          icon: <StatusIcon status={"Done"} className="font-1" />,
          label: "Done",
          matchValue: "Done"
        },
        {
          icon: <StatusIcon status={"Canceled"} className="font-1" />,
          label: "Canceled",
          matchValue: "Canceled"
        }
      ]
    };
  };

  const getPriorityListData = () => {
    return {
      keyId: "priority",
      rows: [
        {
          icon: <PriorityIcon priority={0} />,
          label: "No priority",
          matchValue: 0
        },
        {
          icon: <PriorityIcon priority={4} />,
          label: "Urgent",
          matchValue: 4
        },
        {
          icon: <PriorityIcon priority={3} />,
          label: "High",
          matchValue: 3
        },
        {
          icon: <PriorityIcon priority={2} />,
          label: "Medium",
          matchValue: 2
        },
        {
          icon: <PriorityIcon priority={1} />,
          label: "Low",
          matchValue: 1
        }
      ]
    };
  };

  return { getPriorityListData, getStatusCategories, getUserCategories };
};
export default useGetBoardCategories;
