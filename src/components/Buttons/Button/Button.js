import React from "react";

const classes = require("./Button.module.css");

const Button = (props) => {
  return (
    <button
      className={classes[props.buttonType]}
      onClick={() => props.clickHandler()}
    >
      {props.text}
    </button>
  );
};

export default Button;
