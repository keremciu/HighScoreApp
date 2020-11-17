import {
  PLAYERS_SUBMIT_SCORE,
  PLAYERS_SORT_SCORE_TOTAL_POINTS,
  PLAYERS_SORT_SCORE_AVG_POINTS_CLICK,
  PLAYERS_GET_PLAYERS_START,
  PLAYERS_PLAYERS_LOADED,
} from "./players.actions";

const INITIAL_STATE = {
  playersList: [],
  loading: false,
  sortCriteria: "totalPoints",
};

const playersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYERS_GET_PLAYERS_START:
      return {
        ...state,
        loading: true,
      };
    case PLAYERS_PLAYERS_LOADED:
      return {
        ...state,
        loading: false,
        playersList: [...action.payload],
      };
    case PLAYERS_SUBMIT_SCORE:
      return {
        ...state,
        playersList: [...state.playersList, action.payload],
      };
    case PLAYERS_SORT_SCORE_TOTAL_POINTS:
      return {
        ...state,
        sortCriteria: "totalPoints",
      };
    case PLAYERS_SORT_SCORE_AVG_POINTS_CLICK:
      return {
        ...state,
        sortCriteria: "avg",
      };
    default:
      return state;
  }
};

export default playersReducer;
