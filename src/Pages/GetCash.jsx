import React from "react";
import { useState } from "react";
import Panel from "../Components/Panel/Panel";
import axios from "axios";
import Swal from "sweetalert2";

function GetCash() {

  const baseUrl = "https://finance.shtefan.pl/api/";

  const [formValues, setFormValues] = useState({
    title: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${baseUrl}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        cash: "get",
        title: formValues.title,
        value: "-" + formValues.amount,
      },
    }).then((responce) => {
      Swal.fire({
        title: responce.data.title,
        text: responce.data.message,
        icon: "success",
      });
    });

    setFormValues({
      title: "",
      amount: "",
    });
  };

  return (
    <>
      <div className="app-wrapper">
        <Panel />
        <div className="form-wrapper">
          <form className="form" onSubmit={handleSubmit}>
            <span>Я хочу взяти кошти</span>
            <input
              className="form__input"
              id="title"
              name="title"
              type="text"
              placeholder="Введiть назву"
              onChange={handleChange}
              value={formValues.title}
              required
            />

            <input
              className="form__input"
              id="amount"
              name="amount"
              type="number"
              placeholder="Введiть сумму"
              onChange={handleChange}
              value={formValues.amount}
              required
            />

            <button className="form__btn">Ok</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default GetCash;
