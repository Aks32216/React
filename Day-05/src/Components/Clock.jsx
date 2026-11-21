import React, { useEffect } from "react";

const Clock = () => {
  const [time, setTime] = React.useState(() => new Date());

  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <aside className="clock" aria-label="Current time">
      <span className="clock__label">Local time</span>
      <p className="clock__time">{time.toLocaleTimeString()}</p>
      <p className="clock__date">
        {time.toLocaleDateString(undefined, {
          weekday: "short",
          day: "numeric",
          month: "short",
        })}
      </p>
    </aside>
  );
};

export default Clock;
