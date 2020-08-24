import React from "react";
import ReactDOM from "react-dom";

export const Modal = ({ isShowing, hide }) =>
  isShowing
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
            onClick={(e) => e.preventDefault()}
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
              <p>Hello, I'm a modal.</p>
            </div>
            <div className="modal-footer">
              <button>Cancel</button>
              <button className="save-btn">Save</button>
            </div>
          </div>
          {/* </div> */}
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
