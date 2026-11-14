const App = () => {
  return (
    <div className="terminal">
      <div className="bar">
        <i></i>
        <i></i>
        <i></i>
        <span>~/react/day-01</span>
      </div>
      <div className="screen">
        <p>
          <span className="prompt">$</span> echo "Hello World"
        </p>
        <p className="out">
          Hello World<span className="cursor"></span>
        </p>
      </div>
    </div>
  )
}

export default App
