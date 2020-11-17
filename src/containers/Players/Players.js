import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlayers,
  sortScoreTotalPonits,
  sortScoreAvgPointsClick,
} from "./store/players.actions";
import Button from "../../components/Buttons/Button/Button";
import PlayerItem from "../../components/PlayerItem/PlayerItem";
import PlayersListHeader from "../../components/PlayerItem/PlayersListHeader";

const classes = require("./Players.module.css");

const sortBy = (state) => {
  const sortKey = state.players.sortCriteria;
  return state.players.playersList
    .sort((a, b) => {
      return b[sortKey] - a[sortKey];
    })
    .slice(0, 10);
};

const Players = () => {
  const dispatch = useDispatch();
  const sortTotalPoints = () => dispatch(sortScoreTotalPonits());
  const sortAvgPoints = () => dispatch(sortScoreAvgPointsClick());
  const playersList = useSelector(sortBy);
  const sortCriteria = useSelector((state) => state.players.sortCriteria);

  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.sortButtons}>
        <div className={classes.buttonsWrapper}>
          <Button
            text="sort total points"
            clickHandler={sortTotalPoints}
            buttonType={
              sortCriteria === "totalPoints"
                ? "secondaryButton"
                : "primaryButton"
            }
          />
        </div>
        <div className={classes.buttonsWrapper}>
          <Button
            text="sort total points avg"
            clickHandler={sortAvgPoints}
            buttonType={
              sortCriteria === "avg" ? "secondaryButton" : "primaryButton"
            }
          />
        </div>
      </div>
      <div>
        <PlayersListHeader name="Name" totalPoints="Total Points" avg="AVG" />
        {playersList.map((player, index) => {
          return (
            <PlayerItem
              key={index}
              name={player.name}
              totalPoints={player.totalPoints}
              avg={player.avg}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Players;
