import React, { useState, useEffect } from "react";
import "../../App.css";

const Pagination = ({ showPerPage, onPagination }) => {
  const [counter, setCounter] = useState(1);
  const [previousMute, setPreviousMute] = useState();
  const [nextMute, setNextMute] = useState();
  useEffect(() => {
    const value = showPerPage * counter;
    let start = value - showPerPage;
    let end = value;
    onPagination(start, end);
    setPreviousMute(start);
    setNextMute(end);
    // eslint-disable-next-line
  }, [counter]);
  return (
    <div className="d-flex justify-content-between mt-4">
      <button
        className={`btn btn-info text-white btn-sm ${
          previousMute === 0 ? "disabled" : ""
        }`}
        onClick={() => setCounter(counter - 1)}
      >
        {previousMute === 0 ? "Disabled" : "Previous"}
      </button>
      <button
        className={`btn btn-info btn-sm text-white ${
          nextMute > 11 ? "disabled" : ""
        }`}
        onClick={() => setCounter(counter + 1)}
      >
        {nextMute > 11 ? "Disabled" : "Next"}
      </button>
    </div>
  );
};

export default Pagination;
