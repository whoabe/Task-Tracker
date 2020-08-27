import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Select from "./Select";
// import time from "../reducers/time";
import useInputState from "../hooks/useInputState";
import { connect } from "react-redux";

export const Modal = ({ isShowing, hide, auth }) => {
  useEffect(() => {
    checkSettings();
  }, [auth]);
  const [settings, setSettings] = useState({});
  const checkSettings = () => {
    if (auth && auth.user) {
      setSettings(auth.user.settings);
    } else {
      setSettings({
        // pull from local storage
        timeMode: "Countdown + Timer",
        sessionTime: 25,
        breakTime: 5,
      });
    }
  };
  // const settings = () => {
  //   console.log(auth);
  //   if (auth && auth.user) {
  //     console.log(auth.user.settings);
  //     debugger;
  //     return auth.user.settings;
  //   }
  // };
  const callback = () => {
    console.log("condtionally render the session time and break time input");
  };
  // const handleSave = () => {
  //   console.log("call the save settings action creator");
  // };
  // ~~~~~~~~~~~~~~~~~~~~Need to reset the values if its not saved
  const { value: sessionTime, onChange: onChangeSessionTime } = useInputState(
    25
  );
  const { value: breakTime, onChange: onChangeBreakTime } = useInputState(5);

  const handleSubmit = (event) => {
    // debugger;
    console.log("submit");
    event.preventDefault();
    // debugger;
    console.log(event.target.timeMode.value);
    console.log(event.target.sessionTime.value);
    console.log(event.target.breakTime.value);
    hide();
  };

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" onClick={hide} />
          {/* <div
            onClick={(e) => e.preventDefault()}
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          > */}
          <div
            // onClick={(e) => e.preventDefault()}
            className="modal"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <h2 className="modal-header">Settings</h2>
            {/* <div className="modal-header">
              <button
                type="button"
                className="modal-close-button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={hide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div> */}
            <form onSubmit={handleSubmit} id="timeForm">
              {/* <input
                type="number"
                className="input"
                onChange={onChangeSessionTime}
                value={sessionTime}
                placeholder="Add task"
              />
              <button type="submit" className="save-btn" form="timeForm">
                Save
              </button> */}
              <div className="modal-content">
                <Select
                  value={settings.timeMode}
                  label="Select Time Mode"
                  options={["Countdown", "Countdown + Timer", "Timer"]}
                  parentCallback={callback}
                  name="timeMode"
                />
                {settings.timeMode === "Countdown + Timer" ? (
                  <div>
                    <div className="session-div">
                      <label htmlFor="Session">Session</label>
                      <input
                        type="number"
                        className="input"
                        onChange={onChangeSessionTime}
                        value={sessionTime}
                        name="sessionTime"
                      />
                    </div>
                    <div className="break-div">
                      <label htmlFor="Break">Break</label>
                      <input
                        type="number"
                        className="input"
                        onChange={onChangeBreakTime}
                        value={breakTime}
                        name="breakTime"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="modal-footer">
                <button type="button" onClick={hide}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save-btn"
                  form="timeForm"
                  // onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          {/* </div> */}
        </React.Fragment>,
        document.body
      )
    : null;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Modal);
