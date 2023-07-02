import React, { useState, useEffect } from 'react';

export const RecordBoard = () => {
  const [record, setRecord] = useState([]);

  const handleGetRecord = () => {
    let localRecord = localStorage.getItem("record");
    localRecord = localRecord ? JSON.parse(localRecord) : [];
    localRecord = localRecord.sort((a, b) => a.score - b.score);
    setRecord(localRecord);
  }

  useEffect(() => {
    handleGetRecord();
  }, []);

  return (
    <ul className="record-board">
      {
        record.map((item, index) => (
          <li
            key={index}
            className="record-board-item"
          >
            <strong className="record-board-item-player">
              {index === 0 && ("⭐ ")}
              {item.player}
            </strong>

            <span className="record-board-item-score">
              {item.score}
            </span>
          </li>
        ))
      }
    </ul>
  )
}
