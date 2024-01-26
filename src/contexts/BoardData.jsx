import React, { createContext, useCallback } from "react";
import useGetBoardData from "../hooks/useGetBoardData";

export const BoardDataContext = createContext();

/*
 * context to manage state of data
 */

const BoardData = ({ children }) => {
  const {
    ticketData,
    userData,
    isLoadingBoardData,
    getUserNameById,
    getUserStatusById,
    isBoardAPIError
  } = useGetBoardData();

  const filterTicketData = useCallback(
    (filterKey, filterValue) => {
      if (!ticketData) {
        return [];
      }
      let filteredVal = ticketData.filter(
        (item) => item[filterKey] === filterValue
      );

      return filteredVal;
    },
    [ticketData]
  );

  return (
    <BoardDataContext.Provider
      value={{
        ticketData,
        userData,
        filterTicketData,
        isLoadingBoardData,
        getUserNameById,
        getUserStatusById,
        isBoardAPIError
      }}
    >
      {children}
    </BoardDataContext.Provider>
  );
};

export default BoardData;
