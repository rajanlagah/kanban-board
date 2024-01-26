import React, { useContext, useEffect, useState } from "react";
import List from "./List";

import "./../css/board.css";
import BoardHeader from "./BoardHeader";
import { BoardDataContext } from "../contexts/BoardData";
import useGetBoardCategories from "../hooks/useGetBoardCategories";
import { getQueryParams } from "../utility";
import Loading from "./Loading";

/*
 * Board renders multiple List ( landing page )
 *
 * fn:
 * - fetch ticket Data
 * - set rowMaps
 *
 * comp:
 * - loading state
 * - error state
 * - header
 * - List
 */

const Board = () => {
  const [rowsMap, setRowsMap] = useState([]);
  const [matchKey, setmatchKey] = useState();
  const {
    userData,
    isLoadingBoardData,
    getUserNameById,
    isBoardAPIError,
    getUserStatusById
  } = useContext(BoardDataContext);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedOrdering, setSelectedOrdering] = useState("");

  const { getPriorityListData, getStatusCategories, getUserCategories } =
    useGetBoardCategories();

  useEffect(() => {
    const { orderBy, group } = getQueryParams() || {};
    setSelectedGroup(group || "priority");
    setSelectedOrdering(orderBy || "priority");
  }, []);

  useEffect(() => {
    if (!isLoadingBoardData) {
      let config = {
        rows: []
      };
      if (selectedGroup === "status") {
        config = getStatusCategories(userData);
      } else if (selectedGroup === "user") {
        config = getUserCategories(userData);
      } else {
        config = getPriorityListData(userData);
      }

      setRowsMap([...config.rows]);
      setmatchKey(config.keyId);
    }
  }, [userData, isLoadingBoardData, selectedGroup, selectedOrdering]);

  return (
    <div className="board">
      <BoardHeader
        onGroupSelect={setSelectedGroup}
        setSelectedOrdering={setSelectedOrdering}
        selectedGroup={selectedGroup}
        selectedOrdering={selectedOrdering}
      />
      <div className="board__lists">
        {isLoadingBoardData && (
          <div className="center w-screen">
            <Loading />
          </div>
        )}
        {!isLoadingBoardData && isBoardAPIError && (
          <div className="text-center w-screen">
            <h3>Error!!</h3>
            <a onClick={() => window.location.reload()} href="">
              {" "}
              Reload?{" "}
            </a>
          </div>
        )}
        {!isLoadingBoardData &&
          !isBoardAPIError &&
          rowsMap.map(({ label, icon, matchValue }) => (
            <List
              getUserNameById={getUserNameById}
              selectedOrdering={selectedOrdering}
              getUserStatusById={getUserStatusById}
              label={label}
              key={`${label}-${matchValue}`}
              icon={icon}
              matchValue={matchValue}
              matchKey={matchKey}
            />
          ))}
      </div>
    </div>
  );
};

export default Board;
