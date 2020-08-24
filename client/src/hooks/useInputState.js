import { useState } from "react";

export default () => {
  const [name, setName] = useState("");

  return {
    name,
    onChange: (event) => {
      setName(event.target.value);
    },
    reset: () => setName(""),
  };
};
