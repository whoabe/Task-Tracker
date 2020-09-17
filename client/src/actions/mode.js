import { SET_MODE, TOGGLE_MODE_ACTIVE, SET_MODE_ACTIVE } from "./types";

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
export const setModeActive = (activeMode) => (dispatch) => {
  dispatch({
    type: SET_MODE_ACTIVE,
    payload: activeMode,
  });
};
