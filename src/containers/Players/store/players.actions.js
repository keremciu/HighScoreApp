import * as api from "../../../api";

export const PLAYERS_SUBMIT_SCORE = "[players] submit score";
export const PLAYERS_SORT_SCORE_TOTAL_POINTS =
  "[players] sort score total points";
export const PLAYERS_SORT_SCORE_AVG_POINTS_CLICK =
  "[players] sort score avg points click";
export const PLAYERS_GET_PLAYERS_START = "[players] get players start";
export const PLAYERS_PLAYERS_LOADED = "[players] players loaded";

export const submitScore = (player) => {
  return {
    type: PLAYERS_SUBMIT_SCORE,
    payload: player,
  };
};

export const sortScoreTotalPonits = () => {
  return {
    type: PLAYERS_SORT_SCORE_TOTAL_POINTS,
  };
};

export const sortScoreAvgPointsClick = () => {
  return {
    type: PLAYERS_SORT_SCORE_AVG_POINTS_CLICK,
  };
};

export const getPlayersStart = () => {
  return {
    type: PLAYERS_GET_PLAYERS_START,
  };
};

const normalizePlayers = (players) => {
  return players.map((player) => {
    return {
      ...player,
      avg: player.totalPoints / player.clicks,
    };
  });
};

export const getPlayers = () => {
  return (dispatch) => {
    dispatch(getPlayersStart());
    return api.mockGetPlayers().then((data) => {
      dispatch(playersLoaded(normalizePlayers(data)));
    });
  };
  // TODO bonus question API parameters
  /*
    we call mockGetPlayers(sortCriteria)
    we provide sortCriteria as a query param
    then we get a sorted list, because
    the sort operation is the most expensive in term
    of performance
  */
};

export const playersLoaded = (players) => {
  return {
    type: PLAYERS_PLAYERS_LOADED,
    payload: players,
  };
};
