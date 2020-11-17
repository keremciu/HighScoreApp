import { combineReducers } from "redux";
import playersReducer from "../containers/Players/store/players.reducer";

const rootReducer = combineReducers({
  players: playersReducer,
});

export default rootReducer;
