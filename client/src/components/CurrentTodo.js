import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentTodo } from "../actions/todo";

const CurrentTodo = ({ currentTodo, todos, setCurrentTodo }) => {
  useEffect(() => {
    if (todos && todos.length > 0) {
      const firstTodo = todos.find((todo) => todo.completed === false);
      setCurrentTodo(firstTodo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);
  return (
    <div className="large">
      {currentTodo === null ? "add a task" : currentTodo.value}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentTodo: state.todo.currentTodo,
  todos: state.todo.todos,
});

export default connect(mapStateToProps, { setCurrentTodo })(CurrentTodo);
