import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const TodoApp = () => {
  const [todos, setTodos] = React.useState([
    { id: 1, name: "Learn useState", isComplete: true },
    { id: 2, name: "Build a todo app", isComplete: false },
    { id: 3, name: "Style the todo list", isComplete: false },
    { id: 4, name: "Push code to GitHub", isComplete: false },
  ]);

  function addTodo(item) {
    const newItem = {
      id: crypto.randomUUID(),
      name: item,
      isComplete: false,
    };
    setTodos((prev) => [...prev, newItem]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => {
        return t.id === id ? { ...t, isComplete: !t.isComplete } : t;
      }),
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => {
      return prev.filter((t) => {
        return t.id !== id;
      });
    });
  }

  return (
    <section className="todo-app">
      <p className="label">Todo list</p>
      <TodoForm onAdd={addTodo}></TodoForm>
      <ul className="todo-list">
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            ></TodoItem>
          );
        })}
      </ul>
      <p className="todo-count">
        {todos.filter((t) => t.isComplete).length} of {todos.length} done
      </p>
    </section>
  );
};

export default TodoApp;
