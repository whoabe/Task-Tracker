import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/todo";
import useInputState from "../hooks/useInputState";

const TodoForm = ({ addTodo }) => {
  const { name, reset, onChange } = useInputState();
  return (
    <div className="todo-form">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo({ name });
          reset();
        }}
      >
        <input
          type="text"
          className="input"
          onChange={onChange}
          value={name}
          placeholder="Add task"
        />
      </form>
    </div>
  );
};

export default connect(null, { addTodo })(TodoForm);
