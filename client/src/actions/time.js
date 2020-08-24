import {
  SET_TIME_MODE,
  SET_COUNTDOWN_TIME,
  SET_COUNTDOWN_BREAKTIME,
} from "./types";

// Set Time Mode
export const setTimeMode = (mode) => (dispatch) => {
  dispatch({
    type: SET_TIME_MODE,
    payload: mode,
  });
};
