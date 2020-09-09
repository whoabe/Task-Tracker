import api from "../utils/api";
import {
  GET_TODOS,
  GET_TODO,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  TODO_ERROR,
  START_SESSION,
  COMPLETE_SESSION,
  SET_CURRENT_SESSION,
  REMOVE_CURRENT_SESSION,
  SET_CURRENT_TODO,
  REMOVE_CURRENT_TODO,
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
    // const res = await api.delete(`/todos/${id}`);
    await api.delete(`/todos/${id}`);

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

export const setCurrentTodo = (todo) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_TODO,
    payload: todo,
  });
};

export const removeCurrentTodo = () => (dispatch) => {
  dispatch({
    type: REMOVE_CURRENT_TODO,
  });
};

// Start Session
export const startSession = (todoId, data) => async (dispatch) => {
  try {
    const res = await api.post(`/todos/session/${todoId}`, data);
    dispatch({
      type: START_SESSION,
      payload: { todoId, data: res.data },
    });
    // sets the current session
    dispatch({
      type: SET_CURRENT_SESSION,
      payload: res.data,
    });
    // dispatch(setAlert("Session Started", "success"));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      // broken
      // payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Complete Session
export const completeSession = (todoId, sessionId, data) => async (
  dispatch
) => {
  try {
    const res = await api.put(`/todos/session/${todoId}/${sessionId}`, data);
    dispatch({
      type: COMPLETE_SESSION,
      payload: { todoId, data: res.data },
      // don't need sessionId in the reducer because we're updating the entire todo
      // payload: { todoId, sessionId, data: res.data },
    });
    // dispatch(setAlert("Session Completed", "success"));
    dispatch({
      type: REMOVE_CURRENT_SESSION,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// // Set Task
// export const setCurrentSession = (session) => (dispatch) => {
//   dispatch({
//     type: SET_CURRENT_SESSION,
//     payload: session,
//   });
//   // dispatch(setAlert("Task Set", "success"));
// };
// // Remove Task
// export const removeCurrentSession = () => (dispatch) => {
//   dispatch({
//     type: REMOVE_CURRENT_SESSION,
//   });
//   // dispatch(setAlert("Task Removed", "success"));
// };
