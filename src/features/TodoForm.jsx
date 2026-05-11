import { useRef, useState } from 'react';

function TodoForm({ onAddTodo }) {

  const [workingTodoTitle ,setWorkingTodoTitle] = useState("");

  const inputRef = useRef();

 const handleAddTodo = (event) => {
  event.preventDefault();

  if (workingTodoTitle) {
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("");
    inputRef.current.focus();
  }
};

  return (
  <form>
    <label htmlFor="todoTitle">Todo</label>
    <input
      ref={inputRef}
      type="text"
      id="todoTitle"
      name="todoTitle"
      value={workingTodoTitle}
      placeholder={'Todo text'}
      required
      onChange={(event) => setWorkingTodoTitle(event.target.value)}
    />
    <button type="submit" onClick={handleAddTodo} disabled={!workingTodoTitle.trim()}>
      Add Todo
    </button>
  </form>
);
}

export default TodoForm;
