import React from "react";
import moment from "moment";

const FormatTime = ({ time }) => {
  if (time >= 3600000) {
    return <span>{moment.utc(time).format("hh:mm:ss")}</span>;
  } else {
    return <span>{moment(time).format("mm:ss")}</span>;
  }
};

export default FormatTime;
