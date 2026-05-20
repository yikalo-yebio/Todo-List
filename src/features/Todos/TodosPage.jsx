import { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList/TodoList'

function TodosPage({ token }) {
    
    const [todoList, setTodoList] = useState([]);
    const [error , setError] = useState("");
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);

    useEffect(() => {
       if (!token) return;
          async function fetchTodos(){

            setIsTodoListLoading(true);
            setError("");

            try {
              const response = await fetch("/api/tasks" , {
                method: "GET",
                headers: {
                  "X-CSRF-TOKEN": token,
                },
                credentials: "include",
              })

               if (response.status === 401) {
            throw new Error("unauthorized")
          }

          if (!response.ok) {
            throw new Error("failed to fetch todos");
          }

          const data = await response.json();
          setTodoList(data.tasks);
            } catch (error) {
              setError(error.message);
            }finally{
               setIsTodoListLoading(false);
            }
          }

        fetchTodos();
         
    }, [token]);

 async function addTodo(todoTitle) {

    const newTodo = {
      id : Date.now() ,
      title : todoTitle ,
      isCompleted : false ,
    };

    setTodoList(previous => [newTodo, ...previous]);

    try {
      const response = await fetch("/api/tasks" , {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRF-TOKEN": token,
                },
                credentials: "include",
                body: JSON.stringify({
                  title:todoTitle,
                  isCompleted: false,
                }),
              });

        if (!response.ok) {
            throw new Error("failed to create todo");
          }

          const data = await response.json();

          setTodoList(prev =>
             prev.map(todo =>
                 todo.id === newTodo.id ? data : todo
             )
          );
    } catch (error) {
      setError(error.message);

      setTodoList(prev =>
        prev.filter(todo => todo.id !== newTodo.id)
      );
    }
    
  }

  async function completeTodo(id) {

    const originalTodo = todoList.find(todo => todo.id === id);

    setTodoList(prev =>
             prev.map(todo =>
                 todo.id === id ? {...todo, isCompleted : true} : todo
             )
          );

          try {
      const response = await fetch(`/api/tasks/${id}` , {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRF-TOKEN": token,
                },
                credentials: "include",
                body: JSON.stringify({
                  isCompleted: true,
                }),
              });

              if (!response.ok) {
            throw new Error("failed to update todo");
          }

    } catch (error) {
      setError(error.message);

     setTodoList(prev =>
             prev.map(todo =>
                 todo.id === id ? originalTodo : todo
             )
          );
    }
  }

  async function updateTodo(editedTodo) {
    
    const originalTodo = todoList.find(todo => todo.id === editedTodo.id);

    setTodoList(prev =>
             prev.map(todo =>
                 todo.id === editedTodo.id ? editedTodo : todo
             )
          );

          try {
      const response = await fetch(`/api/tasks/${editedTodo.id}` , {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRF-TOKEN": token,
                },
                credentials: "include",
                body: JSON.stringify({
                  title: editedTodo.title,
                  isCompleted: editedTodo.isCompleted,
                }),
              });

              if (!response.ok) {
            throw new Error("failed to update todo");
          }

    }catch (error) {
      setError(error.message);

     setTodoList(prev =>
             prev.map(todo =>
                 todo.id === editedTodo.id ? originalTodo : todo
             )
          );
    }
  }

  return (
    <div>
        {error && (
          <div>
            <p>{error}</p>
            <button onClick={() => setError("")} type="button">Clear Error</button>
          </div>
        )}
        {isTodoListLoading && <p>Loading todos...</p>}
        <TodoForm onAddTodo={addTodo} />
        <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo}/>
    </div>
  )
}

export default TodosPage;
