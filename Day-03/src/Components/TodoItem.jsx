const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={todo.isComplete ? "todo-item is-done" : "todo-item"}>
      <input
        className="todo-check"
        type="checkbox"
        checked={todo.isComplete}
        onChange={() => onToggle(todo.id)}
      />
      <span className="todo-name">{todo.name}</span>
      <button className="todo-delete" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
