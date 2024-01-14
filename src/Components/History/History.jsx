import React from "react";
import { useState, useEffect } from "react";
import "./../History/History.css";
import HistoryItem from "../HistoryItem/HistoryItem";
import axios from "axios";

function History() {
  const [historyData, setHistoryData] = useState(null);
  const host = ""; // your host address here 
  const param = "?history";

  useEffect(() => {
    axios
      .get(`${host}${param}`)
      .then(function (response) {
        setHistoryData(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="history">
      <span>History : </span>
      <ul className="history__items">
        {historyData ? (
          historyData.map((item) => (
            <HistoryItem
              key={item.id}
              title={item.title}
              date={item.date_created}
              value={item.value}
            />
          ))
        ) : (
          <div className="loading">
            <p>Loading...</p>
          </div>
        )}
      </ul>
    </div>
  );
}

export default History;
