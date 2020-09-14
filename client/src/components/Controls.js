import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setMode, toggleModeActive } from "../actions/mode";
// import { setAlert } from "../actions/alert";
import { startSession, completeSession } from "../actions/todo";

const Controls = ({
  timerTime,
  setTimerTime,
  countdownTime,
  countdownBreakTime,
  mode,
  startSession,
  currentSession,
  currentTodo,
  currentBreak,
  setMode,
  toggleModeActive,
}) => {
  useEffect(() => {
    if (
      (mode.timeMode === "Countdown" &&
        mode.auto === true &&
        countdownTime <= 0) ||
      (mode.timeMode === "Countdown" &&
        mode.auto === true &&
        countdownBreakTime <= 0 &&
        mode.currentMode === "break")
    ) {
      handleSwitchModeAuto();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerTime, countdownTime, countdownBreakTime]);
  const checkCurrentTask = () => {
    if (currentTodo === null) {
      // setAlert("No task selected", "danger");
      return false;
    } else {
      return true;
    }
  };

  const completeSessionData = () => {
    const endTime = JSON.stringify(Date.now());
    const data = { endTime };
    return data;
  };

  const completeBreakData = () => {
    const breakEndData = { endTime: JSON.stringify(Date.now()) };
    return breakEndData;
  };

  const handleStart = () => {
    if ((checkCurrentTask() === true) & (currentTodo != null)) {
      toggleModeActive();
      const startTime = JSON.stringify(Date.now());
      const data = { startTime: startTime };
      startSession(currentTodo._id, data);
      console.log("startSession action with data.startTime: " + data.startTime);

      // need to call setSession with the startSession response
      // setSession()
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
      console.log("completeSessiondata: " + completeSessionData());
    }
    if (currentBreak) {
      console.log("completeBreakData: " + completeBreakData());
      //   completeBreak(currentTodo._id, currentBreak._id, completeBreakData());
    }
    setMode("session");
    setTimerTime(0);
  };

  const handleSwitchMode = () => {
    // setIsTimerActive(false);
    toggleModeActive();
    completeSession(timerTime, currentTodo, mode);
    if (currentSession != null) {
      completeSession(
        currentTodo._id,
        currentSession._id,
        completeSessionData()
      );
      console.log("completeSessiondata: " + completeSessionData());
      // console.log("complete session action");
    } else {
      const startTime = JSON.stringify(Date.now());
      const data = { startTime: startTime };
      startSession(currentTodo._id, data);
      console.log("start session action w data.startTime: " + data.startTime);
    }
    if (mode.currentMode === "session") {
      // timer to break
      setMode("break");
      setTimerTime(0);
      // setIsTimerActive(true);
      toggleModeActive();
      const breakData = { startTime: JSON.stringify(Date.now()) };
      // startBreak(task._id, breakData);
      console.log(
        "start break action w breakData.startTime: " + breakData.startTime
      );
    } else if (mode.currentMode === "break") {
      // need the current breakId in here
      // completeBreak(task._id, currentBreak._id, completeBreakData());
      console.log("completeBreakData: " + completeBreakData());
      // console.log("complete break action");
      setMode("session");
      setTimerTime(0);
      // setIsTimerActive(true);
      toggleModeActive();
    }
  };
  const handleSwitchModeAuto = () => {
    toggleModeActive();
    completeSession(timerTime, currentTodo, mode);
    if (currentSession != null) {
      completeSession(
        currentTodo._id,
        currentSession._id,
        completeSessionData()
      );
      console.log("completeSessiondata: " + completeSessionData());
      // console.log("complete session action");
    } else {
      const startTime = JSON.stringify(Date.now());
      const data = { startTime: startTime };
      startSession(currentTodo._id, data);
      console.log("start session action w data.startTime: " + data.startTime);
    }
    if (mode.currentMode === "session") {
      // timer to break
      setMode("break");
      setTimerTime(0);
      // setIsTimerActive(true);
      toggleModeActive();
      const breakData = { startTime: JSON.stringify(Date.now()) };
      // startBreak(task._id, breakData);
      console.log(
        "start break action w breakData.startTime: " + breakData.startTime
      );
    } else if (mode.currentMode === "break") {
      // need the current breakId in here
      // completeBreak(task._id, currentBreak._id, completeBreakData());
      console.log("completeBreakData: " + completeBreakData());
      // console.log("complete break action");
      setMode("session");
      setTimerTime(0);
      // setIsTimerActive(true);
      toggleModeActive();
    }
  };

  // const showControls = () => {
  //   if (mode.currentMode === "session" && mode.active === false) {
  //     return (
  //       <button onClick={() => handleStart()}>
  //         {/* check if there is a task, if there is then toggle the activestatus */}
  //         <i className="fas fa-play btn"></i>
  //       </button>
  //     );
  //   } else if (
  //     (mode.timeMode === "Countdown" &&
  //       mode.auto === true &&
  //       countdownTime <= 0) ||
  //     (mode.timeMode === "Countdown" &&
  //       mode.auto === true &&
  //       countdownBreakTime <= 0 &&
  //       mode.currentMode === "break")
  //   ) {
  //     handleSwitchModeAuto();
  //     // instead of calling handleswitchmode, call a function that completes the session
  //     // set the mode to the other one
  //   } else {
  //     return (
  //       <div>
  //         <button onClick={() => handleSwitchMode()}>
  //           {mode.currentMode === "session" ? (
  //             <div>
  //               {/* break */}
  //               <i className="fas fa-mug-hot btn">Break</i>
  //             </div>
  //           ) : (
  //             <div>
  //               {/* Timer */}
  //               <i className="fas fa-play btn">Session</i>
  //             </div>
  //           )}
  //         </button>
  //         <button onClick={() => handleStop()}>
  //           {/* need to have the timer reset */}
  //           {/* stop */}
  //           <i className="far fa-pause-circle btn">Stop</i>
  //         </button>
  //       </div>
  //     );
  //   }
  // };

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
})(Controls);
// export default Controls;
