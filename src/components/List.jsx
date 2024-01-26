import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import ListHeading from "./ListHeading";

import "../css/list.css";
import { BoardDataContext } from "../contexts/BoardData";
import useSortTickets from "../hooks/useSortTickets";

/*
 * List render list header and all the cards inside it
 * fn:
 * - group cards based on
 * -- status
 * -- priority
 * -- user
 * - sort cards by
 * -- title
 * -- priority
 */

const List = ({
  label,
  icon,
  matchKey,
  matchValue,
  selectedOrdering,
  getUserStatusById,
  getUserNameById
}) => {
  const { filterTicketData, isLoadingBoardData } = useContext(BoardDataContext);
  const [ticketsData, setTicketsData] = useState([]);
  const { sortTicketByTitle, sortTicketByPriority } = useSortTickets();

  useEffect(() => {
    if (!isLoadingBoardData) {
      let filteredValue = filterTicketData(matchKey, matchValue);
      setTicketOrder(filteredValue, selectedOrdering);
    }
  }, [matchKey, matchValue, isLoadingBoardData, filterTicketData]);

  useEffect(() => {
    if (Array.isArray(ticketsData) && ticketsData.length > 0) {
      setTicketOrder(ticketsData, selectedOrdering);
    }
  }, [selectedOrdering, ticketsData.length]);

  const setTicketOrder = (data, order) => {
    if (order === "title") {
      setTicketsData([...sortTicketByTitle(data)]);
    } else if (order === "priority") {
      setTicketsData([...sortTicketByPriority(data)]);
    }
  };

  return (
    <div className="list">
      <ListHeading label={label} icon={icon} count={ticketsData.length} />
      {ticketsData.map((ticket) => (
        <Card
          status={ticket.status}
          tag={ticket.tag}
          name={getUserNameById(ticket.userId)}
          userStatus={getUserStatusById(ticket.userId)}
          title={ticket.title}
          key={`card_${ticket.id}`}
          id={ticket.id}
          priority={ticket.priority}
        />
      ))}
    </div>
  );
};

export default List;
