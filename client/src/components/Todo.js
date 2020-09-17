import React, { useState } from "react";
import { connect } from "react-redux";
import {
  deleteTodo,
  removeCurrentTodo,
  toggleTodo,
  completeSession,
  completeBreak,
  setCurrentTodo,
} from "../actions/todo";
import TodoText from "./TodoText";
// import SessionStartTime from "./SessionStartTime";
// import SessionEndTime from "./SessionEndTime";
import FormatTime from "./FormatTime";
import completeBreakData from "../utils/completeBreakData";
import completeSessionData from "../utils/completeSessionData";
import { setModeActive, setMode } from "../actions/mode";

const Todo = ({
  deleteTodo,
  todo,
  //   handleSwitchTask,
  removeCurrentTodo,
  //   deleteSession,
  // task,
  toggleTodo,
  currentTodo,
  currentSession,
  currentBreak,
  completeSession,
  completeBreak,
  setCurrentTodo,
  setTimerTime,
  setModeActive,
  setMode,
}) => {
  const [expanded, setExpanded] = useState(false);
  // if (currentTodo && currentTodo._id) {
  //   console.log("currentTodo id: " + currentTodo._id);
  // }
  const handleSwitchCurrentTodo = (todo) => {
    if (currentSession) {
      completeSession(
        currentTodo._id,
        currentSession._id,
        completeSessionData()
      );
    } else if (currentBreak) {
      completeBreak(currentTodo._id, currentBreak._id, completeBreakData());
    }
    // controlsReset function
    setModeActive(false);
    setMode("sessions");
    setTimerTime(0);
    setCurrentTodo(todo);
  };

  return [
    <tr key={todo._id}>
      <td>
        {currentTodo && currentTodo._id === todo._id ? (
          <i
            className="fas fa-caret-right fa-lg mx todo-selector-active"
            onClick={() => handleSwitchCurrentTodo(todo)}
          ></i>
        ) : (
          <i
            className="fas fa-caret-right fa-lg mx todo-selector-inactive"
            onClick={() => handleSwitchCurrentTodo(todo)}
          ></i>
        )}
      </td>
      <td>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            toggleTodo(todo._id);
          }}
        />
      </td>
      <td>
        <TodoText todo={todo} />
      </td>
      <td>
        <FormatTime time={todo.totalTime} />
      </td>
      <td>
        <div>
          {todo.sessions.length > 0 ? (
            <span className="mx dropdown-span">
              {expanded ? (
                <i
                  className="fas fa-angle-down"
                  onClick={() => setExpanded(!expanded)}
                ></i>
              ) : (
                <i
                  className="fas fa-angle-right"
                  onClick={() => setExpanded(!expanded)}
                ></i>
              )}
            </span>
          ) : null}
          <span className="todo-sessions">{todo.sessions.length}</span>
        </div>
      </td>
      <td></td>
      <td>
        <span className="mx trash-span">
          <i
            className="far fa-trash-alt"
            onClick={() => {
              deleteTodo(todo._id);
              if (todo._id === currentTodo._id) {
                removeCurrentTodo();
              }
            }}
          ></i>
        </span>
      </td>
    </tr>,
    expanded &&
      todo.sessions.map((session, index) => (
        <tr key={session._id}>
          <td></td>
          <td></td>
          <td>{index + 1}</td>
          <td>
            <FormatTime time={session.time} />
          </td>
          {/* <td>
            <SessionStartTime session={session} todoId={todo._id} />
          </td>
          <td>
            <SessionEndTime session={session} todoId={todo._id} />
          </td> */}
          <td>
            <span className="mx trash-span">
              <i
                className="far fa-trash-alt"
                // onClick={() => {
                //   deleteSession(todo._id, session._id);
                // }}
              ></i>
            </span>
          </td>
        </tr>
      )),
  ];
};

const mapStateToProps = (state) => ({
  currentTodo: state.todo.currentTodo,
  currentSession: state.todo.currentSession,
  currentBreak: state.todo.currentBreak,
});

export default connect(mapStateToProps, {
  deleteTodo,
  //   deleteSession,
  removeCurrentTodo,
  toggleTodo,
  completeSession,
  completeBreak,
  setCurrentTodo,
  setModeActive,
  setMode,
})(Todo);
