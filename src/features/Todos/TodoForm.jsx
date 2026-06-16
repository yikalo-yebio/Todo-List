import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../utils/todoValidation';
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
  <form className='form-container' onSubmit={handleAddTodo}>
     <div className='addForm-container'>
         <TextInputWithLabel 
           elementId="todoTitle"
           labelText="Todo"
           ref={inputRef}
           value={workingTodoTitle}
           onChange={(event) => setWorkingTodoTitle(event.target.value)}
          />
        <button className='add-button' disabled={!isValidTodoTitle(workingTodoTitle)}>Add Todo</button>
     </div>
  </form>
);
}

export default TodoForm;
