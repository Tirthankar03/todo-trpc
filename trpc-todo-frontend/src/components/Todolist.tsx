import React, { useState } from 'react';
import { trpc } from '../utils/trpc';
import { CreateTodoInput, UpdateTodoInput, DeleteTodoInput } from '../../../shared/types';

const TodoList: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const [editTodoText, setEditTodoText] = useState('');
  const utils = trpc.useContext();

  const todosQuery = trpc.todo.getAllTodos.useQuery();
  const addTodoMutation = trpc.todo.addTodo.useMutation({
    onSuccess: () => utils.todo.getAllTodos.invalidate(),
  });
  const updateTodoMutation = trpc.todo.updateTodo.useMutation({
    onSuccess: () => utils.todo.getAllTodos.invalidate(),
  });
  const deleteTodoMutation = trpc.todo.deleteTodo.useMutation({
    onSuccess: () => utils.todo.getAllTodos.invalidate(),
  });

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      const newTodo: CreateTodoInput = { text: newTodoText };
      addTodoMutation.mutate(newTodo);
      setNewTodoText('');
    }
  };

  const handleToggleTodo = (id: string, completed: boolean) => {
    const updateData: UpdateTodoInput = { id, completed: !completed };
    updateTodoMutation.mutate(updateData);
  };

  const handleDeleteTodo = (id: string) => {
    const deleteData: DeleteTodoInput = { id };
    deleteTodoMutation.mutate(deleteData);
  };

  const handleEditTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTodoText.trim() && editTodoId) {
      const updateData: UpdateTodoInput = { id: editTodoId, text: editTodoText };
      updateTodoMutation.mutate(updateData);
      setEditTodoId(null);
      setEditTodoText('');
    }
  };

  const startEditing = (id: string, currentText: string) => {
    setEditTodoId(id);
    setEditTodoText(currentText);
  };

  if (todosQuery.isLoading) return <div>Loading...</div>;
  if (todosQuery.isError) return <div>Error: {todosQuery.error.message}</div>;

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todosQuery.data?.map((todo) => (
          <li key={todo.id}>
            {editTodoId === todo.id ? (
              <form onSubmit={handleEditTodo}>
                <input
                  type="text"
                  value={editTodoText}
                  onChange={(e) => setEditTodoText(e.target.value)}
                />
                <button type="submit">Save</button>
                <button onClick={() => setEditTodoId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id, todo.completed)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
                <button onClick={() => startEditing(todo.id, todo.text)}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
