import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../../utils/todoValidation";
import { useEditableTitle } from "../../../hooks/useEditableTitle";


function TodoListItem({todo , onCompleteTodo , onUpdateTodo}) {

    const {
           isEditing,
           workingTitle,
           startEditing,
           cancelEdit,
           updateTitle,
           finishEdit
          } = useEditableTitle(todo.title);

   


    function handleUpdate(event) {
        event.preventDefault();
        
        if (!isEditing) return;

        const finalTitle = finishEdit();
        onUpdateTodo({...todo , title: finalTitle});

    }

    return (
        <li className="todo-list-item">
    <form className="todo-item-form" onSubmit={handleUpdate}>
        {isEditing ? (
            <>
              <TextInputWithLabel value={workingTitle} onChange={(event) => updateTitle(event.target.value)}/>
              <button className="cancel-btn" onClick={cancelEdit} type="button">Cancel</button>
              <button className="update-btn" onClick={handleUpdate} type="button" disabled={!isValidTodoTitle(workingTitle)}>Update</button>
            </>
        ) : (
            <>
                <label className="todo-checkbox-label">
                    <input
                        className="todo-checkbox"
                        type="checkbox"
                        id={`checkbox${todo.id}`}
                        checked={todo.isCompleted}
                        onChange={() => onCompleteTodo(todo.id)}
                    />
                </label>
                <span className="todo-title" onClick={startEditing}>{todo.title}</span>
            </>
        )}
    </form>
</li>
    )
}

export default TodoListItem;
