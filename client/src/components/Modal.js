import React from "react";
import ReactDOM from "react-dom";
import Select from "./Select";

export const Modal = ({ isShowing, hide, timeMode }) => {
  const callback = () => {
    console.log("h");
  };
  const handleSave = () => {
    console.log("save");
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
            onClick={e => e.preventDefault()}
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
            <div className="modal-content">
              <Select
                value={timeMode}
                label="Select Time Mode"
                options={["Countdown", "Countdown + Timer", "Timer"]}
              />
            </div>
            <div className="modal-footer">
              <button>Cancel</button>
              <button className="save-btn" onClick={() => handleSave()}>
                Save
              </button>
            </div>
          </div>
          {/* </div> */}
        </React.Fragment>,
        document.body
      )
    : null;
};

export default Modal;
