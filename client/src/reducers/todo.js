import {
  GET_TODOS,
  CLEAR_TODOS,
  GET_TODO,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  START_SESSION,
  COMPLETE_SESSION,
  // DELETE_SESSION,
  // EDIT_SESSION,
  TODO_ERROR,
  EDIT_TODO,
  START_BREAK,
  COMPLETE_BREAK,
  // EDIT_BREAK,
  // DELETE_BREAK,
  SET_CURRENT_TODO,
  REMOVE_CURRENT_TODO,
  SET_CURRENT_SESSION,
  REMOVE_CURRENT_SESSION,
  SET_CURRENT_BREAK,
  REMOVE_CURRENT_BREAK,
} from "../actions/types";

const initialState = {
  currentTodo: null,
  currentBreak: null,
  currentSession: null,
  todos: [],
  breaks: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
        loading: false,
      };
    case CLEAR_TODOS:
      return {
        ...state,
        todos: [],
        currentTodo: null,
        loading: false,
      };
    case GET_TODO:
      return {
        ...state,
        todo: payload,
        loading: false,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [payload, ...state.todos],
        loading: false,
      };
    case START_SESSION:
      // find the correct todo and add a new session to todo.sessions
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === payload.todoId) {
            const sessions = [...todo.sessions, payload.data];
            return { ...todo, sessions };
          } else {
            return todo;
          }
        }),
      };
    case START_BREAK:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === payload.todoId) {
            const breaks = [...todo.breaks, payload.data];
            return { ...todo, breaks };
          } else {
            return todo;
          }
        }),
      };

    case EDIT_TODO:
    case TOGGLE_TODO:
    case COMPLETE_SESSION:
    case COMPLETE_BREAK:
      // case DELETE_SESSION:
      // case EDIT_SESSION:
      // case EDIT_BREAK:
      // case DELETE_BREAK:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id !== payload.todoId) {
            return todo;
          }
          return {
            ...todo,
            ...payload.data,
          };
        }),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload),
        loading: false,
      };
    case TODO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SET_CURRENT_TODO:
      return {
        ...state,
        currentTodo: payload,
      };
    case REMOVE_CURRENT_TODO:
      return { ...state, currentTodo: null };
    case SET_CURRENT_BREAK:
      return {
        ...state,
        currentBreak: payload,
      };
    case REMOVE_CURRENT_BREAK:
      return { ...state, currentBreak: null };
    case SET_CURRENT_SESSION:
      return {
        ...state,
        currentSession: payload,
      };
    case REMOVE_CURRENT_SESSION:
      return { ...state, currentSession: null };
    default:
      return state;
  }
}
