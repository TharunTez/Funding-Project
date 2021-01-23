import React, { useState, useEffect, useMemo } from "react";
import ProgressBar from "./Progress.js";
import "./style.scss";

const target = 5000;
let donorMessage = "Be the first donor for this project!";
let heading = `${Intl.NumberFormat("en-IN").format(
  5000
)} still needed to fund this project`;
let daysLeft = "Only four days left to fund this project";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [donors, setDonors] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const addAmountHandler = () => {
    const amt = parseInt(amount, 10);
    if (isNaN(amt)) {
      setErrorMessage("Please enter a valid amount");
      return;
    }
    if (amt < 5) {
      setErrorMessage("Please donate a minimum of $5");
      return;
    }
    let d = donors + 1;
    let t = total + amt;

    donorMessage =
      d === 1
        ? "Join the first donor who has already supported this project!"
        : `Join the ${d} other donors who have already supported this project`;

    if (t >= target) {
      daysLeft = "Thanks so much! We have raised $5,000 for this project!!";
      heading = "";
      donorMessage = "";
    } else {
      heading = `${Intl.NumberFormat("en-IN").format(
        target - t
      )} still needed to fund this project`;
    }
    setErrorMessage("");
    setTotal(t);
    setDonors(d);
    setAmount(0);
  };

  useEffect(() => {
    if (total >= target) {
      setDisabled(true);
    }
  }, [total]);

  const completed = useMemo(() => (total / target) * 100, [total]);

  const [firstHeader, lastHeader] = useMemo(() => heading.split("still"), [
    heading
  ]);

  return (
    <div className="background" role="main">
      <div className="app">
        {heading && (
          <p className="arrowbox">
            <sup>$</sup>
            <b>{firstHeader}</b>
            {lastHeader}
          </p>
        )}
        <ProgressBar completed={completed} />
        <div className="card">
          <div>
            <p className="heading">{daysLeft}</p>
            {donorMessage && <p>{donorMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
            <input
              type="text"
              value={`$ ${amount}`}
              disabled={disabled}
              aria-label="Enter amount to donate"
              onChange={event => setAmount(event.target.value.slice(2))}
            />
            <button
              disabled={disabled}
              onClick={addAmountHandler}
              aria-label="Give Now"
            >
              Give Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
