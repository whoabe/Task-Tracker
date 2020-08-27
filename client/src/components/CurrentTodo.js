import React from "react";
import { connect } from "react-redux";

const CurrentTodo = ({ currentTodo }) => {
  return (
    <div className="large">
      {currentTodo === null ? "add a task" : currentTodo.value}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentTodo: state.todo.currentTodo,
});

export default connect(mapStateToProps, {})(CurrentTodo);
