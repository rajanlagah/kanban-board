import { useCallback, useEffect, useState } from "react";

/*
 * get set all the tickets and user data
 */

const useGetBoardData = () => {
  const [ticketData, setticketData] = useState();
  const [userData, setuserData] = useState();
  const [isBoardAPIError, setisBoardAPIError] = useState(false);
  const [isLoadingBoardData, setisLoadingBoardData] = useState(false);
  const [userIdToNameMap, setuserIdToNameMap] = useState(new Map());
  const [userIdToStatusMap, setuserIdToStatusMap] = useState(new Map());
  const ENDPOINT = "https://api.quicksell.co/v1/internal/frontend-assignment";

  useEffect(() => {
    getSetBoardData();
  }, []);

  const getUserNameById = (userId) => {
    return userIdToNameMap.has(userId)
      ? userIdToNameMap.get(userId)
      : "unknown";
  };

  const getUserStatusById = (userId) => {
    return userIdToStatusMap.has(userId)
      ? userIdToStatusMap.get(userId)
      : false;
  };

  const createIdToNameMap = (data) => {
    let userMap = new Map();
    let userStatusMap = new Map();
    for (let i = 0; i < data.length; i++) {
      if (!userMap.has(data[i].id)) {
        userMap.set(data[i].id, data[i].name);
      }
      if (!userStatusMap.has(data[i].id)) {
        userStatusMap.set(data[i].id, data[i].available);
      }
    }
    setuserIdToNameMap(userMap);
    setuserIdToStatusMap(userStatusMap);
  };

  const getSetBoardData = useCallback(async () => {
    setisLoadingBoardData(true);
    try {
      let response = await fetch(ENDPOINT);
      setisLoadingBoardData(false);
      if (response.ok) {
        response = await response.json();
        setisBoardAPIError(false);
        setticketData(response.tickets);
        setuserData(response.users);
        createIdToNameMap(response.users);
      } else {
        setisBoardAPIError(true);
      }
    } catch (e) {
      setisLoadingBoardData(false);
      setisBoardAPIError(true);
      console.log("Exception ", e);
    }
  }, [setisLoadingBoardData]);

  return {
    ticketData,
    userData,
    isLoadingBoardData,
    getUserNameById,
    getUserStatusById,
    isBoardAPIError
  };
};
export default useGetBoardData;
