import React from "react";

const classes = require("./PlayerItem.module.css");

const PlayersListHeader = (props) => {
  return (
    <div className={classes.playerItem}>
      <p className={classes.name}>{props.name}</p>
      <p className={classes.totalPoints}>{props.totalPoints}</p>
      <p className={classes.avg}>{props.avg}</p>
    </div>
  );
};

export default PlayersListHeader;
