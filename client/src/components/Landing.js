import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CurrentTodo from "./CurrentTodo";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import CompletedTodoList from "./CompletedTodoList";
// import Select from "./Select";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import Timer from "./Timer";
import useInterval from "../hooks/useInterval";
import Controls from "./Controls";
// import { setMode } from "../actions/mode";

const Landing = ({ todos, mode, auth }) => {
  useEffect(() => {
    checkIfCompletedTask(todos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);
  useEffect(() => {
    // setCountdownTime(getCountdownTime());
    // setCountdownBreakTime(getCountdownBreakTime());
    setCountdownTime(mode.sessionTime * 1000);
    // convert the sessionTime from minutes to milliseconds
    setCountdownBreakTime(mode.breakTime * 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, mode]);
  const [showCompletedTodoList, setShowCompletedTodoList] = useState(false);
  const [timerTime, setTimerTime] = useState(0);
  // timerTime is both the time for the timer and for the timer break

  // const getCountdownTime = () => {
  //   if (user && user.settings) {
  //     if (
  //       user.settings.timeMode === "Countdown" ||
  //       user.settings.timeMode === "Countdown + Timer"
  //     ) {
  //       return user.settings.sessionTime;
  //     }
  //   }
  //   return 0;
  // };
  // const getCountdownBreakTime = () => {
  //   if (user && user.settings) {
  //     if (
  //       user.settings.timeMode === "Countdown" ||
  //       user.settings.timeMode === "Countdown + Timer"
  //     ) {
  //       return user.settings.breakTime;
  //     }
  //   }
  //   return 0;
  // };
  const [countdownTime, setCountdownTime] = useState(0);
  const [countdownBreakTime, setCountdownBreakTime] = useState(0);
  // need countdownTime and countdownBreakTime because they need to decrement using useInterval, but we dont want the redux state to change

  // if using a timer function, increment the time
  useInterval(
    () => {
      setTimerTime(timerTime + 1000);
    },
    (mode.active && mode.timeMode === "Timer") ||
      (mode.active &&
        mode.timeMode === "Countdown + Timer" &&
        countdownTime <= 0) ||
      (mode.active &&
        mode.timeMode === "Countdown + Timer" &&
        countdownBreakTime <= 0)
      ? 1000
      : null
  );
  // counting down/decrement
  useInterval(
    () => {
      if (
        (mode.timeMode === "Countdown" &&
          mode.auto === true &&
          countdownTime >= 0) ||
        (mode.timeMode === "Countdown" &&
          mode.auto === false &&
          countdownTime > 0) ||
        mode.timeMode === "Countdown + Timer"
      ) {
        setCountdownTime(countdownTime - 1000);
      }
    },
    (mode.active &&
      mode.currentMode === "session" &&
      mode.timeMode === "Countdown") ||
      (mode.active &&
        mode.currentMode === "session" &&
        mode.timeMode === "Countdown + Timer")
      ? 1000
      : null
  );
  useInterval(
    () => {
      if (mode.timeMode === "Countdown" && countdownBreakTime > 0) {
        setCountdownBreakTime(countdownBreakTime - 1000);
        console.log(countdownBreakTime);
      }
    },
    (mode.active &&
      mode.currentMode === "break" &&
      mode.timeMode === "Countdown") ||
      (mode.active &&
        mode.currentMode === "break" &&
        mode.timeMode === "Countdown + Timer")
      ? 1000
      : null
  );

  const checkIfCompletedTask = (todos) => {
    if (todos && todos.find((todo) => todo.completed === true)) {
      setShowCompletedTodoList(true);
    } else {
      setShowCompletedTodoList(false);
    }
  };

  // const settings = () => {
  //   if (auth && auth.user) {
  //     return auth.user.settings;
  //   }
  //   // else {
  //   //   return "Countdown + Timer";
  //   // }
  //   // if there is no auth, then pull this info from the localStorage
  // };

  const { isShowing, toggle } = useModal();

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h3>Mode: {mode.timeMode}</h3>
          <h3>CDtime (ms): {countdownTime}</h3>
          <h3>CDBreakTime (ms): {countdownBreakTime}</h3>
          <h3>Auto: {mode.auto ? "True" : "False"}</h3>

          <CurrentTodo />
          <Timer
            timerTime={timerTime}
            countdownTime={countdownTime}
            countdownBreakTime={countdownBreakTime}
          />
          <Controls
            timerTime={timerTime}
            setTimerTime={setTimerTime}
            countdownTime={countdownTime}
            setCountdownTime={setCountdownTime}
            countdownBreakTime={countdownBreakTime}
            setCountdownBreakTime={setCountdownBreakTime}
          />
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
          <button onClick={toggle}>Settings</button>
          <Modal isShowing={isShowing} hide={toggle} />
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todo.todos,
  mode: state.mode,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Landing);
