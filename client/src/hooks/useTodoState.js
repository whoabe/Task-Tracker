import { useState } from "react";
import * as moment from "moment";

export default (initialValue) => {
  const [todos, setTodos] = useState(initialValue);

  return {
    todos,
    addTodo: (text) => {
      setTodos([
        ...todos,
        {
          id: todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1,
          text,
          isCompleted: false,
          sessions: [],
          totalTime: 0,
        },
      ]);
    },
    toggleTodo: (id) => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      setTodos(newTodos);
    },
    deleteTodo: (id) => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    },
    completeSession: (time, currentTask, mode) => {
      // back calculate start time? or
      const endTime = moment().format("MMMM Do YYYY, h:mm:ss a");

      const newTodos = todos.map((todo) =>
        todo.id === currentTask.id
          ? {
              ...todo,
              sessions: [
                ...todo.sessions,
                {
                  // condition ? expression if true : expression if false
                  sessionId: todo.sessions.length + 1,
                  // need to change the way that sessionIds are calculated?
                  length: time,
                  endTime: endTime,
                  mode: mode,
                },
              ],
            }
          : todo
      );
      setTodos(newTodos);
    },
  };
};
