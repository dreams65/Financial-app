import React from "react";
import { useState } from "react";
import Panel from "../Components/Panel/Panel";
import axios from "axios";
import Swal from "sweetalert2";

function AddCash() {

  const baseUrl = "";

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
        cash: "add",
        title: formValues.title,
        value: "+" + formValues.amount,
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
            <span>I want to add funds</span>
            <input
              className="form__input"
              id="title"
              name="title"
              type="text"
              placeholder="Enter the title"
              onChange={handleChange}
              value={formValues.title}
              required
            />

            <input
              className="form__input"
              id="amount"
              name="amount"
              type="number"
              placeholder="Enter the amount"
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

export default AddCash;
