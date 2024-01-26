import React, { useEffect, useRef, useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { setQueryParams } from "../utility";

/*
 * BoardHeader renders top bar
 * fn:
 * -filters
 * --groupBy
 * --orderBy
 *
 */
const BoardHeader = ({
  onGroupSelect,
  setSelectedOrdering,
  selectedOrdering,
  selectedGroup
}) => {
  const [hideToolTip, setHideToolTip] = useState(true);
  const popupRef = useRef(null);
  const popupButtonRef = useRef(null);
  const popupBGRef = useRef(null);

  const FILTER_OPTIONS = [
    {
      label: "Grouping",
      onSelect: (val) => onGroupSelect(val),
      value: selectedGroup,
      options: [
        { label: "Status", value: "status" },
        { label: "User", value: "user" },
        { label: "Priority", value: "priority" }
      ]
    },
    {
      label: "Ordering",
      value: selectedOrdering,
      onSelect: (val) => setSelectedOrdering(val),
      options: [
        { label: "Priority", value: "priority" },
        { label: "Title", value: "title" }
      ]
    }
  ];

  const handleSelect = (updateFn, value) => {
    updateFn(value);
    setHideToolTip(true);
  };

  const handleOutsideClick = (event) => {
    if (
      !hideToolTip &&
      !popupRef.current.contains(event.target) &&
      !popupButtonRef.current.contains(event.target)
    ) {
      setHideToolTip(true);
    }
  };

  useEffect(() => {
    if (popupRef.current !== null) {
      document.addEventListener("click", handleOutsideClick);
    }
    if (hideToolTip) {
      document.removeEventListener("click", handleOutsideClick);
    }
    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [hideToolTip, popupRef, popupButtonRef]);

  useEffect(() => {
    let params = [];
    if (selectedGroup) {
      params.push({ key: "group", value: selectedGroup });
    }
    if (selectedOrdering) {
      params.push({ key: "orderBy", value: selectedOrdering });
    }
    setQueryParams(params);
  }, [selectedGroup, selectedOrdering]);

  return (
    <header className="board__header">
      <button
        ref={popupButtonRef}
        className="board__filter"
        onClick={() => setHideToolTip(!hideToolTip)}
      >
        <VscSettings className="board__setting__icon" />
        Display
        <MdOutlineKeyboardArrowDown />
      </button>
      <div className="relative">
        {!hideToolTip && (
          <div
            ref={popupBGRef}
            className="board__header__bg "
            // onClick={() => setHideToolTip(true)}
          >
            <div ref={popupRef} className="board__header__tooltip">
              {FILTER_OPTIONS.map((item, index) => (
                <div
                  className="flex gap-3 select-box"
                  key={`${item.label}-${item.index}`}
                >
                  <span className="select-heading">{item.label}</span>
                  <select
                    className="board_header_select"
                    onChange={(e) =>
                      handleSelect(item.onSelect, e.target.value)
                    }
                    value={item.value}
                  >
                    {item.options.map((option, index) => (
                      <option
                        key={`${option.label}=${index}`}
                        value={option.value}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default BoardHeader;
