import {
  SET_MODE,
  SET_MODE_TIME,
  TOGGLE_MODE_ACTIVE,
  SET_MODE_ACTIVE,
} from "../actions/types";

const initialState = {
  currentMode: "session",
  active: false,
  timeMode: "Countdown + Timer",
  sessionTime: 25,
  breakTime: 5,
  // add auto, and longbreakTime in here
};
// either "timer" or "break"

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_MODE:
      return { ...state, currentMode: payload };
    case TOGGLE_MODE_ACTIVE:
      return { ...state, active: !state.active };
    case SET_MODE_TIME:
      return {
        ...state,
        timeMode: payload.timeMode,
        sessionTime: payload.sessionTime,
        breakTime: payload.breakTime,
        auto: payload.auto,
      };
    case SET_MODE_ACTIVE:
      return { ...state, active: payload };
    default:
      return state;
  }
}
