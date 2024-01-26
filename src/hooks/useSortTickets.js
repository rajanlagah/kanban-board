import { useCallback } from "react";

/*
 * sort ticket based on title, priority
 */

const useSortTickets = () => {
  const sortTicketByTitle = useCallback((tickets = []) => {
    return tickets.sort((a, b) => a.title.localeCompare(b.title));
  }, []);

  const sortTicketByPriority = useCallback((tickets = []) => {
    return tickets.sort((a, b) => b.priority - a.priority);
  }, []);

  return { sortTicketByTitle, sortTicketByPriority };
};

export default useSortTickets;
