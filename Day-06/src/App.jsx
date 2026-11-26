import React, { useMemo } from "react";
import Sum from "./Components/Sum";
import StaticSum from "./Components/StaticSum";

const App = () => {
  const [n, setN] = React.useState(0);

  const computedValue = useMemo(() => {
    console.log("rendered");
    return n * n - 1 * n - 2 * n - 3 * n - 4 * n - 5;
  }, [n]);

  return (
    <main className="desk">
      <p className="desk__tag">Day 06 / re-renders</p>
      <section className="pad">
        <p className="pad__label">Current number</p>
        <h1 className="pad__display">{n}</h1>
        <button className="pad__btn" onClick={() => setN((prev) => prev + 1)}>
          Increment
        </button>
        <button className="pad__btn" onClick={() => setN((prev) => prev - 1)}>
          Decrement
        </button>
      </section>
      <figure className="slot slot--live">
        <Sum n={n}></Sum>
        <figcaption className="slot__cap">
          <span className="dot dot--live" />
          Re-renders on every click
        </figcaption>
      </figure>

      <section className="statics">
        <p className="statics__cap">
          <span className="dot dot--idle" />
          Memoized receipts: skipped by React.memo
        </p>
        <div className="statics__grid">
          <StaticSum n={n}></StaticSum>
        </div>
        <div className="statics__grid">Computed Value: {computedValue}</div>
      </section>
    </main>
  );
};

export default App;
