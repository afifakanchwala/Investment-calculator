import React, { useState } from "react";
import "./CalcForm.css";

const intialUserInput = {
  "current-savings": 20000,
  "yearly-contribution": 12000,
  "expected-return": 7,
  duration: 10,
};

const CalcForm = (props) => {
  //alternative way of using useState
  const [userInput, setUserInput] = useState(intialUserInput);

  const resetHandler = () => {
    setUserInput(intialUserInput);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onCalculate(userInput);
  };
  const changeHandler = (input, value) => {
    //console.log(input, value);
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [input]: value,
      };
    });
  };
  return (
    <form onSubmit={submitHandler} className="form">
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings (Rs)</label>
          <input
            onChange={(event) =>
              changeHandler("current-savings", event.target.value)
            }
            value={userInput["current-savings"]}
            type="number"
            id="current-savings"
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings (Rs)</label>
          <input
            onChange={(event) =>
              changeHandler("yearly-contribution", event.target.value)
            }
            value={userInput["yearly-contribution"]}
            type="number"
            id="yearly-contribution"
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            onChange={(event) =>
              changeHandler("expected-return", event.target.value)
            }
            value={userInput["expected-return"]}
            type="number"
            id="expected-return"
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            onChange={(event) => changeHandler("duration", event.target.value)}
            value={userInput["duration"]}
            type="number"
            id="duration"
          />
        </p>
      </div>
      <p className="actions">
        <button onClick={resetHandler} type="reset" className="buttonAlt">
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  );
};
export default CalcForm;
