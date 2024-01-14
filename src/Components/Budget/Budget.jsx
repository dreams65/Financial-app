import React from "react";
import { useState, useEffect } from "react";
import "./../Budget/Budget.css";
import cashImg from "./../../assets/img/cash.png";
import axios from "axios";
import { Link } from "react-router-dom";

function Budget() {
  const valute = "zl";
  const host = ""; // your host address here
  const param = "?budget";

  const [budgetData, setBudgetData] = useState(null);

  useEffect(() => {
    axios.get(`${host}${param}`).then(function (response) {
      setBudgetData(response.data);
    });
  }, []);

  return (
    <Link className="budget" to={"/"}>
        <img className="budget__img" src={cashImg} alt="cash" />
        <p className="budget__value">
          {budgetData ? (
            budgetData.map((item) => <span key={item.id}>{item.budget}</span>)
          ) : (
            <span>0</span>
          )}
          <span>{valute}</span>
        </p>
    </Link>
  );
}

export default Budget;
