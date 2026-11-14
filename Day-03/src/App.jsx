import React from "react";

const App = () => {
  // Approach 1: a plain variable.
  // Changing it updates the value, but React is never told about it,
  // so the UI doesn't repaint.
  // let count = 0;
  // function increment() {
  //   count++;
  //   console.log(count);
  // }

  // Approach 2: state with the useState hook.
  // React components are a function of state: when the state changes, the
  // component re-renders. useState gives us two things: the current value,
  // and a setter that tells React the value has changed.
  // (Manipulating the DOM directly would also work, but it's discouraged.
  // We describe *what* the UI should look like, and React works out *how*.)
  const [count, setCount] = React.useState(0);

  function increment() {
    setCount(count + 1);
  }

  return (
    <main className="counter">
      <p className="eyebrow">Day 03 · State</p>
      <h1>Hello World</h1>
      <p className="count">
        Count: <strong>{count}</strong>
      </p>
      <button onClick={increment}>Increment</button>
    </main>
  );
};

export default App;
