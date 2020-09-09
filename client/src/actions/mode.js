import { SET_MODE, TOGGLE_MODE_ACTIVE } from "./types";

// Set Time Mode
export const setMode = (mode) => (dispatch) => {
  dispatch({
    type: SET_MODE,
    payload: mode,
  });
};

export const toggleModeActive = () => (dispatch) => {
  dispatch({
    type: TOGGLE_MODE_ACTIVE,
  });
};
