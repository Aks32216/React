import React from "react";

const TodoForm = ({ onAdd }) => {
  const [text, setText] = React.useState("");

  function submit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    onAdd(trimmed);
    setText("");
  }

  return (
    <form className="todo-form" onSubmit={(e) => submit(e)}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo"
        required
      />
      <button className="btn btn-up" type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
