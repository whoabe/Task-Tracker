import React, { useState } from "react";
import { connect } from "react-redux";
// import CompletedTodoRow from "./CompletedTodoRow";
import Todo from "./Todo";

const CompletedTodoList = ({ todos }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan="6">
              <span>
                {expanded ? (
                  <i
                    className="fas fa-angle-down"
                    onClick={() => setExpanded(false)}
                  ></i>
                ) : (
                  <i
                    className="fas fa-angle-right"
                    onClick={() => setExpanded(true)}
                  ></i>
                )}
              </span>{" "}
              <span>Completed Items</span>{" "}
            </th>
          </tr>
        </thead>
        {expanded ? (
          <tbody>
            {todos.map((todo) => {
              if (todo.completed) {
                return <Todo todo={todo} key={todo._id} />;
              }
              return null;
            })}
          </tbody>
        ) : null}
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todo.todos,
});

export default connect(mapStateToProps)(CompletedTodoList);
