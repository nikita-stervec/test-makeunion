'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
      setError('');
    } else {
      setError('пустая задача');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className={styles['container']}>
      <h1 className={styles['title']}>To-Do List</h1>
      <p className={styles['desc']}>
        я знаю, что id по Date.now это плохая идея, но в рамках такого проекта
        это нормально
      </p>
      <input
        type='text'
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='Add a new task'
        className={styles['input']}
      />
      <button onClick={addTodo} className={styles['add-button']}>
        Add
      </button>
      {error && <p className={styles['error-message']}>{error}</p>}
      <ul className={styles['todo-list']}>
        {todos.map(todo => (
          <li key={todo.id} onClick={() => toggleTodo(todo.id)}>
            {todo.text}
            <button
              onClick={e => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
              className={styles['delete-button']}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
