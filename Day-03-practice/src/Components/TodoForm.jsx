import React from "react";

const TodoForm = ({ addTodo }) => {
  const [text, setText] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const curText = text.trim();
    if (!curText) {
      return;
    }
    addTodo(curText);
    setText("");
  }

  return (
    <form className="todo-form" onSubmit={(e) => handleSubmit(e)}>
      <input
        className="todo-input"
        placeholder="Add a task..."
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button className="todo-add" type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
