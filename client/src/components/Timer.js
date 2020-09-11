import React from "react";
import { connect } from "react-redux";
import FormatTime from "./FormatTime";
// import { setTask } from "../../actions/task";

const Timer = ({
  timerTime,
  countdownTime,
  countdownBreakTime,
  mode,
  user,
}) => {
  const showTimer = () => {
    if (mode.timeMode === "Timer") {
      return <FormatTime time={timerTime} />;
    } else if (mode.timeMode === "Countdown") {
      if (mode.currentMode === "session") {
        return <FormatTime time={countdownTime} />;
      } else if (mode.currentMode === "break") {
        return <FormatTime time={countdownBreakTime} />;
      }
    } else if (mode.timeMode === "Countdown + Timer") {
      if (mode.currentMode === "session") {
        return <FormatTime time={countdownTime} />;
      } else if (mode.currentMode === "break") {
        return <FormatTime time={countdownBreakTime} />;
      }
      // if (mode.currentMode === "session" && countdownTime > 0) {
      //   return <FormatTime time={countdownTime} />;
      // } else if (
      //   (mode.currentMode === "session" && countdownTime <= 0) ||
      //   (mode.currentMode === "break" && countdownBreakTime <= 0)
      // ) {
      //   return <FormatTime time={timerTime} />;
      // } else if (mode.currentMode === "break" && countdownBreakTime > 0) {
      //   return <FormatTime time={countdownBreakTime} />;
      // }
    }
  };
  return (
    <div className="timer">
      <div className="lead">{mode.currentMode}</div>
      {/* {user && user.settings ? (
        <div>
          <p>{user.settings.timeMode}</p>
          <p>{user.settings.sessionTime}</p>
          <p>{user.settings.breakTime}</p>
        </div>
      ) : null} */}
      <div className="elapsed-time x-large">
        {/* <FormatTime timerTime={timerTime} /> */}
        {showTimer()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  mode: state.mode,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Timer);
