import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitScore } from "../Players/store/players.actions";
import Button from "../../components/Buttons/Button/Button";

const classes = require("./PlayerForm.module.css");

const PlayerForm = () => {
  const [user, setUser] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const submitPlayerScore = (player) => dispatch(submitScore(player));

  const changeHandler = (e) => setUser(e.target.value);
  const sendScore = () => {
    if (user && counter > 0) {
      const payload = {
        name: user,
        totalPoints: userScore,
        clicks: counter,
        avg: (userScore / counter).toFixed(2),
      };
      submitPlayerScore(payload);
      fetch("/cobalt/api/v1/players", {
        method: "POST",
        body: JSON.stringify({ user: payload }),
      });
      setUser("");
      setCounter(0);
      setUserScore(0);
    } else {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
  };

  const generateScore = () => {
    if (counter < 10) {
      setCounter((count) => count + 1);
      setUserScore(
        (userScore) => userScore + Math.floor(Math.random() * 200 - 100)
      );
    }
  };

  return (
    <div className={classes.layoout}>
      <div className={classes.wrapper}>
        <div className={classes.inputWrapper}>
          <label className={classes.labelName} htmlFor="username">
            Name
          </label>
          <input
            data-testid="input-user-name"
            className={classes.inputName}
            name="username"
            value={user}
            onChange={changeHandler}
          />
          {showErrorMessage && (
            <p data-testid="error-message" className={classes.errorMessage}>
              Please enter your name and generate score before submiting
            </p>
          )}
        </div>
        <div className={classes.buttonsWrapper}>
          <div className={classes.buttonWrapper}>
            {!showErrorMessage && (
              <Button
                buttonType="primaryButton"
                clickHandler={sendScore}
                text="send"
              />
            )}
          </div>
          <div className={classes.buttonWrapper}>
            <Button
              buttonType="primaryButton"
              clickHandler={generateScore}
              text="generate score"
            />
          </div>
        </div>
        <div className={classes.scoreAndCounter}>
          <p> Clicks counter {counter}</p>
          <p> Remaining clicks {10 - counter} </p>
          <p data-testid="score"> Score {userScore} </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;
