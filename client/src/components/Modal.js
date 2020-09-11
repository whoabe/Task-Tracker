import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Select from "./Select";
import Input from "./Input";
import Checkbox from "./Checkbox";
import { connect } from "react-redux";
import { editSettings } from "../actions/auth";

export const Modal = ({ isShowing, hide, auth, editSettings }) => {
  useEffect(
    () => {
      checkSettings();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth, hide]
  );

  const [settings, setSettings] = useState({});
  const [showSetTime, setShowSetTime] = useState(false);
  const [showAuto, setShowAuto] = useState(false);
  const checkSettings = () => {
    if (auth && auth.user) {
      setSettings(auth.user.settings);
      if (
        auth.user.settings.timeMode === "Countdown" ||
        auth.user.settings.timeMode === "Countdown + Timer"
      ) {
        setShowSetTime(true);
      } else if (settings.timeMode === "Timer") {
        setShowSetTime(false);
      }
      if (auth.user.settings.timeMode === "Countdown") {
        setShowAuto(true);
      }
      if (
        auth.user.settings.timeMode === "Countdown + Timer" ||
        auth.user.settings.timeMode === "Timer"
      ) {
        setShowAuto(false);
      }
    } else {
      setSettings({
        // pull from local storage
        timeMode: "Countdown + Timer",
        sessionTime: 25,
        breakTime: 5,
      });
    }
  };
  const callback = (value) => {
    if (value === "Countdown + Timer" || value === "Countdown") {
      setShowSetTime(true);
    } else {
      setShowSetTime(false);
    }
    if (value === "Countdown + Timer" || "Timer") {
      setShowAuto(false);
    }
    if (value === "Countdown") {
      setShowAuto(true);
    }
  };
  // ~~~~~~~~~~~~~~~~~~~~Need to reset the values if its not saved

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      timeMode: event.target.timeMode.value,
      auto: event.target.auto.checked,
    };
    if (event.target.sessionTime) {
      data.sessionTime = parseInt(event.target.sessionTime.value);
    }
    if (event.target.breakTime) {
      data.breakTime = parseInt(event.target.breakTime.value);
    }
    editSettings(auth.user._id, data);

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
              <div className="modal-content">
                <Select
                  value={settings.timeMode}
                  label="Select Time Mode"
                  options={["Countdown", "Countdown + Timer", "Timer"]}
                  parentCallback={callback}
                  name="timeMode"
                />
                {showSetTime ? (
                  <div>
                    <div className="session-div">
                      <Input
                        value={settings.sessionTime}
                        label="Session Time"
                        name="sessionTime"
                        type="number"
                      />
                    </div>
                    <div className="break-div">
                      <Input
                        value={settings.breakTime}
                        label="Break Time"
                        name="breakTime"
                        type="number"
                      />
                    </div>
                  </div>
                ) : null}
                {showAuto ? (
                  <div>
                    <Checkbox
                      checked={settings.auto}
                      label="Auto"
                      name="auto"
                      type="checkbox"
                    />
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

export default connect(mapStateToProps, { editSettings })(Modal);
