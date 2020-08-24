import { SET_CURRENT_TODO, REMOVE_CURRENT_TODO } from "./types";

// Set Current Todo
export const setCurrentTodo = (todo) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_TODO,
    payload: todo,
  });
};

// Remove Current Todo
export const removeCurrentTodo = () => (dispatch) => {
  dispatch({
    type: REMOVE_CURRENT_TODO,
  });
};
