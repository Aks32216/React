import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const TodoApp = () => {
  const [todos, setTodos] = React.useState([]);

  function handleTodoAddition(item) {
    const curItem = {
      id: crypto.randomUUID(),
      name: item,
      isCompleted: false,
    };
    setTodos((prev) => [...prev, curItem]);
  }

  function handleItemdone(id) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
      ),
    );
  }

  function handleDeletion(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function handleClearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.isCompleted));
  }

  const completedTasks = todos.filter((t) => t.isCompleted).length;

  return (
    <section className="todo">
      <p className="todo-title">To do</p>
      <TodoForm addTodo={handleTodoAddition} />
      {todos.length === 0 ? (
        <p className="todo-empty">List Empty</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeletion}
              onToggle={handleItemdone}
            />
          ))}
        </ul>
      )}
      <div className="todo-footer">
        <p className="todo-count">
          {completedTasks} out of {todos.length} done
        </p>
        {completedTasks > 0 && (
          <button className="todo-clear" onClick={handleClearCompleted}>
            Clear Completed
          </button>
        )}
      </div>
    </section>
  );
};

export default TodoApp;
