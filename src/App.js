import React, { useState, useEffect, useMemo, useCallback } from "react";
import ProgressBar from "./Progress.js";
import "./style.scss";

const target = 5000;
let amountMessage = `${Intl.NumberFormat("en-US").format(
  5000
)} still needed to fund this project`;
let heading = "Only four days left to fund this project";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [donors, setDonors] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const DonorMessage = useCallback(() => {
    if (total >= target) return null;
    if (donors === 0) {
      return (
        <p className="donor-message">
          Be the <b>first</b> donor for this project!
        </p>
      );
    }
    if (donors === 1) {
      return (
        <p className="donor-message">
          Join the <b>first</b> donor who has already supported this project!
        </p>
      );
    }
    return (
      <p className="donor-message">
        Join the <b>{donors}</b> other donors who have already supported this
        project
      </p>
    );
  }, [donors, total]);

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
    if (t >= target) {
      heading = `Thanks so much! We have raised $${Intl.NumberFormat(
        "en-US"
      ).format(t)} for this project!!`;
      amountMessage = "";
    } else {
      amountMessage = `${Intl.NumberFormat("en-US").format(
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

  let completed = useMemo(() => (total / target) * 100, [total]);
  if (completed > 100) completed = 100;

  const [amountValue, amountString] = useMemo(
    () => amountMessage.split("still"),
    [amountMessage]
  );

  return (
    <div className="background" role="main">
      <div className="app">
        {amountMessage && (
          <p className="arrowbox">
            <sup>$</sup>
            <b>{amountValue}</b>
            {amountString}
          </p>
        )}
        <ProgressBar completed={completed} />
        <div className="card">
          <div>
            <p className="heading">{heading}</p>
            <DonorMessage />
            {errorMessage && <p>{errorMessage}</p>}
            <span className="textbox">
              <span className="prefix">$</span>
              <input
                type="text"
                value={!amount ? "" : amount}
                aria-label="Enter amount to donate"
                autoFocus={true}
                onBlur={({ target }) => target.focus()}
                disabled={disabled}
                onChange={event => setAmount(event.target.value)}
              />
              <button
                disabled={disabled}
                onClick={addAmountHandler}
                aria-label="Give Now"
              >
                Give Now
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
