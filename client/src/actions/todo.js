import api from "../utils/api";
import {
  GET_TODOS,
  GET_TODO,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  TODO_ERROR,
} from "./types";

// Get Todos
// ~~~~~GET THE TODOS BY THE USER_ID
export const getTodos = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/todos/user/${userId}`);

    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
    // if (res.data && res.data.length > 0) {
    //   dispatch({
    //     type: SET_TASK,
    //     payload: res.data[0],
    //   });
    // }
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete todo
export const deleteTodo = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/todos/${id}`);

    dispatch({
      type: DELETE_TODO,
      payload: id,
    });
    // dispatch({
    //   type: REMOVE_TASK,
    // });
    // if (res.data && res.data.length > 0) {
    //   dispatch({
    //     type: SET_TASK,
    //     payload: res.data[res.data.length - 1],
    //   });
    // }

    // dispatch(setAlert("Todo Removed", "success"));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add todo
export const addTodo = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/todos", formData);

    dispatch({
      type: ADD_TODO,
      payload: res.data,
    });
    // dispatch({
    //   type: SET_TASK,
    //   payload: res.data,
    // });

    // dispatch(setAlert("Todo Created", "success"));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get todo by Todo ID
export const getTodo = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/todos/${id}`);

    dispatch({
      type: GET_TODO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit todo
export const editTodo = (todoId, data) => async (dispatch) => {
  try {
    const res = await api.put(`/todos/${todoId}`, data);

    dispatch({
      type: EDIT_TODO,
      payload: {
        todoId,
        data: res.data,
      },
    });
    // dispatch({
    //   type: EDIT_TASK,
    //   payload: {
    //     todoId,
    //     data: res.data,
    //   },
    // });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// toggle complete todo
export const toggleTodo = (todoId) => async (dispatch) => {
  try {
    const res = await api.put(`/todos/toggle/${todoId}`);

    dispatch({
      type: TOGGLE_TODO,
      payload: {
        todoId,
        data: res.data,
      },
    });
    // dispatch({
    //   type: REMOVE_TASK,
    // });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
