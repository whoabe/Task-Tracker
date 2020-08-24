import { SET_TIME_MODE } from "../actions/types";

const initialState = {
  mode: "Countdown + Timer",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TIME_MODE:
      return { ...state, mode: payload.mode };
    default:
      return state;
  }
}
