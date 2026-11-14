import Counter from "./Components/Counter";

const App = () => {
  return (
    <main className="stage">
      <h1 className="heading">Two counters, two separate states</h1>
      <div className="row">
        <Counter></Counter>
        <Counter></Counter>
      </div>
    </main>
  );
};

export default App;
