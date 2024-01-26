import React from "react";
import { FaCheckCircle, FaCircle, FaRegCircle } from "react-icons/fa";

import "../css/card.css";
import PriorityIcon from "./PriorityIcon";
import { formatString } from "../utility";
import NameBadge from "./NameBadge";
import useGetCardConfig from "../hooks/useGetCardConfig";
import StatusIcon from "./StatusIcon";

/*
 * Card renders each ticket UI
 * fn:
 * - card UI changes based on filter
 * -- toggle name Badge
 * -- toggle priority
 * -- toggle status
 */

const Card = ({ title, id, priority, status, tag, name, userStatus }) => {
  const { showNameBadge, showPriority, showStatus } = useGetCardConfig();

  const getStatusIcon = () => {
    if (!showStatus) {
      return null;
    }
    return (
      <div data-testid="card-status-icon">
        <StatusIcon status={status} className="card__title__icon" />
      </div>
    );
  };

  return (
    <article className="card">
      <div className="card__header">
        <p className="card__token mb-1">{id}</p>
        {showNameBadge ? (
          <div data-testid="card-name-badge">
            <NameBadge name={name} live={userStatus} />
          </div>
        ) : (
          ""
        )}
      </div>
      <header className="card__title">
        {getStatusIcon()}
        <span>{formatString(title, 65)}</span>
      </header>

      <section className="card__footer">
        {showPriority ? (
          <div
            data-testid="card-priority-icon"
            className="card__priorityicon icon-gray center"
          >
            <PriorityIcon
              priority={priority}
              isWide={priority !== 4}
              centerAlign={priority !== 0 && priority !== 4}
            />
          </div>
        ) : (
          ""
        )}
        <ul className="card__tags">
          {tag.map((label, index) => (
            <li key={`tags-${index}`}>
              <FaCircle className="font-md" />
              <span>{formatString(label, 30)} </span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default Card;
