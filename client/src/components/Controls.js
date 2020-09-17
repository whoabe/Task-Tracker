import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setMode, toggleModeActive, setModeActive } from "../actions/mode";
// import { setAlert } from "../actions/alert";
import {
  startSession,
  completeSession,
  startBreak,
  completeBreak,
} from "../actions/todo";
import completeBreakData from "../utils/completeBreakData";
import completeSessionData from "../utils/completeSessionData";

const Controls = ({
  timerTime,
  setTimerTime,
  countdownTime,
  countdownBreakTime,
  mode,
  startSession,
  completeSession,
  startBreak,
  completeBreak,
  currentSession,
  currentTodo,
  currentBreak,
  setMode,
  toggleModeActive,
  setModeActive,
}) => {
  useEffect(() => {
    handleSwitchModeAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerTime, countdownTime, countdownBreakTime]);
  useEffect(() => {
    controlsReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTodo && currentTodo._id]);
  const checkCurrentTask = () => {
    if (currentTodo === null) {
      // setAlert("No task selected", "danger");
      return false;
    } else {
      return true;
    }
  };

  // if the currentTodo changes, then run this function
  const controlsReset = () => {
    // setActive(False)
    setModeActive(false);
    setMode("session");
    setTimerTime(0);
  };

  // const completeSessionData = () => {
  //   const endTime = JSON.stringify(Date.now());
  //   const data = { endTime };
  //   return data;
  // };

  // const completeBreakData = () => {
  //   const breakEndData = { endTime: JSON.stringify(Date.now()) };
  //   return breakEndData;
  // };

  const handleStart = () => {
    if ((checkCurrentTask() === true) & (currentTodo != null)) {
      toggleModeActive();
      const startTime = JSON.stringify(Date.now());
      const data = { startTime: startTime };
      startSession(currentTodo._id, data);
    }
  };

  const handleStop = () => {
    toggleModeActive();
    // need to have if currentSession === null, completeBreak()
    if (currentSession) {
      completeSession(
        currentTodo._id,
        currentSession._id,
        completeSessionData()
      );
    } else if (currentBreak) {
      completeBreak(currentTodo._id, currentBreak._id, completeBreakData());
    }
    setMode("session");
    setTimerTime(0);
  };

  const handleSwitchMode = async () => {
    toggleModeActive();
    if (currentSession) {
      await completeSession(
        currentTodo._id,
        currentSession._id,
        completeSessionData()
      );
      setMode("break");
      setTimerTime(0);
      toggleModeActive();
      const breakData = { startTime: JSON.stringify(Date.now()) };
      startBreak(currentTodo._id, breakData);
    } else if (currentBreak) {
      await completeBreak(
        currentTodo._id,
        currentBreak._id,
        completeBreakData()
      );
      setMode("session");
      setTimerTime(0);
      toggleModeActive();
      // const startTime = JSON.stringify(Date.now());
      const data = { startTime: JSON.stringify(Date.now()) };
      startSession(currentTodo._id, data);
    }
  };
  const handleSwitchModeAuto = () => {
    if (
      (mode.active &&
        mode.timeMode === "Countdown" &&
        mode.auto === true &&
        countdownTime <= 0) ||
      (mode.active &&
        mode.timeMode === "Countdown" &&
        mode.auto === true &&
        countdownBreakTime <= 0 &&
        mode.currentMode === "break")
    ) {
      handleSwitchMode();
    }
  };

  return (
    <div className="controls">
      {/* if the mode = timer and timer is not active, then show start button */}
      {mode.currentMode === "session" && mode.active === false ? (
        <button onClick={() => handleStart()}>
          {/* check if there is a task, if there is then toggle the activestatus */}
          <i className="fas fa-play btn"></i>
        </button>
      ) : (
        // else show the break/timer button and the stop button
        <div>
          <button onClick={() => handleSwitchMode()}>
            {mode.currentMode === "session" ? (
              <div>
                {/* break */}
                <i className="fas fa-mug-hot btn">Break</i>
              </div>
            ) : (
              <div>
                {/* Timer */}
                <i className="fas fa-play btn">Session</i>
              </div>
            )}
          </button>
          <button onClick={() => handleStop()}>
            {/* need to have the timer reset */}
            {/* stop */}
            <i className="far fa-pause-circle btn">Stop</i>
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  // not sure if currentSession is actually used (maybe in handlestart functions?)
  currentSession: state.todo.currentSession,
  currentTodo: state.todo.currentTodo,
  currentBreak: state.todo.currentBreak,
  mode: state.mode,
});

export default connect(mapStateToProps, {
  setMode,
  toggleModeActive,
  startSession,
  completeSession,
  startBreak,
  completeBreak,
  setModeActive,
})(Controls);
// export default Controls;
