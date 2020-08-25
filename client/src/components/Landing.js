import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CurrentTodo from "./CurrentTodo";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import CompletedTodoList from "./CompletedTodoList";
// import Select from "./Select";
import Modal from "./Modal";
import useModal from "../hooks/useModal";

const Landing = ({ todos, time, auth }) => {
  useEffect(() => {
    checkIfCompletedTask(todos);
  }, [todos]);
  const [showCompletedTodoList, setShowCompletedTodoList] = useState(false);

  const checkIfCompletedTask = (todos) => {
    if (todos && todos.find((todo) => todo.completed === true)) {
      setShowCompletedTodoList(true);
    } else {
      setShowCompletedTodoList(false);
    }
  };

  const timeMode = () => {
    if (auth && auth.user) {
      return auth.user.settings.timeMode;
    } else {
      return "Countdown + Timer";
    }
  };

  const { isShowing, toggle } = useModal();

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          {/* make an api call that changes the timemode and create an action + reducer that goes along w it */}
          {/* pass that action into Landing, and into Select */}
          {/* <Select
            value={timeMode()}
            label="Select Time Mode"
            placeholder="Pick one"
            options={["Countdown", "Countdown + Timer", "Timer"]}
            onChange={() => {
              console.log("change");
            }}
          /> */}
          <CurrentTodo />
          <h1>Timer</h1>
          <h1>Controls</h1>
          <TodoList />
          <TodoForm />
          {showCompletedTodoList
            ? [
                <hr
                  style={{
                    width: "15rem",
                    marginTop: "1rem",
                    marginBottom: "0.5rem",
                  }}
                  key="1"
                />,
                <CompletedTodoList key="2" />,
              ]
            : null}
          <button onClick={toggle}>Show Modal</button>
          <Modal isShowing={isShowing} hide={toggle} timeMode={timeMode()} />
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todo.todos,
  time: state.time,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Landing);
