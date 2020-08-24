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
            <div className="modal-header">
              <button
                type="button"
                className="modal-close-button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={hide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <p>Hello, I'm a modal.</p>
          </div>
          {/* </div> */}
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
