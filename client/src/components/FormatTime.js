import React from "react";
import moment from "moment";

const FormatTime = ({ time }) => {
  if (time >= 3600000) {
    return <span>{moment.utc(time).format("hh:mm:ss")}</span>;
  } else if (time >= 0) {
    return <span>{moment(time).format("mm:ss")}</span>;
  } else if (time < 0) {
    time = Math.abs(time);
    return (
      <span style={{ color: "red" }}>- {moment(time).format("mm:ss")}</span>
    );
  }
};

export default FormatTime;
