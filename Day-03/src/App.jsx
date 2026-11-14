import Counter from "./Components/Counter";
import TodoApp from "./Components/TodoApp";
import Toggle from "./Components/Toggle";

const App = () => {
  return (
    <main className="stage">
      <h1 className="heading">Hooks and state in React</h1>
      <Toggle title="What is a hook">
        <p>A hook is a special function (its name starts with "use", like useState) that lets a function component use React features such as state. Hooks must be called at the top level of a component, never inside loops or conditions.</p>
      </Toggle>
      <Toggle title="What is state">
        <p>State is data that a component remembers between renders. React stores it for the component, and when it changes through its setter function, React re-renders the component so the UI shows the new value.</p>
      </Toggle>
      <div className="row">
        <Counter />
      </div>
      <TodoApp />
    </main>
  );
};

export default App;
