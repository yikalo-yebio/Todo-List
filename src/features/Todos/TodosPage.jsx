import { useEffect, useState, useCallback } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList/TodoList'
import SortBy from '../../shared/SortBy';
import FilterInput from '../../shared/FilterInput';
import useDebounce from '../../utils/useDebounce';

function TodosPage({ token }) {
    
    const [todoList, setTodoList] = useState([]);
    const [error , setError] = useState("");
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);
    const [sortBy, setSortBy] = useState('creationDate');
    const [sortDirection, setSortDirection] = useState('desc');
    const [filterTerm, setFilterTerm] = useState('');
    const debouncedFilterTerm = useDebounce(filterTerm, 300);
    const [dataVersion , setDataVersion] = useState(0);
    const [filterError , setFilterError] = useState('');

    const handleFilterChange = (newTerm) => { setFilterTerm(newTerm); };
    const invalidateCache = useCallback(() => {
      setDataVersion(prev => prev + 1)
      console.log("Invalidating memo cache after todo mutation");
      
    }, []);

   
    useEffect(() => {
       if (!token) return;
          async function fetchTodos(){

            setIsTodoListLoading(true);
            setFilterError("");

            try {
              const paramsObject = {
                       sortBy,
                       sortDirection,
                    };
               if (debouncedFilterTerm) {
                    paramsObject.find = debouncedFilterTerm;
                  }
              const params = new URLSearchParams(paramsObject);

              const response = await fetch(`/api/tasks?${params}` , {
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
          setFilterError('');
          setError('');
            } catch (error) {
               if (
        debouncedFilterTerm ||
        sortBy !== 'creationDate' ||
        sortDirection !== 'desc'
      ) {
        setFilterError(`Error filtering/sorting todos: ${error.message}`);
      } else {
        setError(`Error fetching todos: ${error.message}`);
      } 

            }finally{
               setIsTodoListLoading(false);
            }
          }

        fetchTodos();
         
    }, [sortBy, sortDirection, debouncedFilterTerm, token]);

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
        
      invalidateCache();

    } catch (error) {
     setError(`Error adding todo: ${error.message}`);

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

          invalidateCache();

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

          invalidateCache();

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
        {filterError && (
          <div>
            <p>{filterError}</p>
            <button onClick={() => setFilterError("")} type="button">Clear Filter Error</button>
            <button onClick={() => {
              setFilterTerm(''); 
              setSortBy('creationDate');
              setSortDirection('desc');
              setFilterError('')
              setError('')
              }} type="button">Reset Filters</button>

          </div>
        )}
        {isTodoListLoading && <p>Loading todos...</p>}

        <SortBy 
           sortBy={sortBy}
           sortDirection={sortDirection}
           onSortByChange={setSortBy}
           onSortDirectionChange={setSortDirection}
        />
        <FilterInput filterTerm={filterTerm} onFilterChange={handleFilterChange} />
        <TodoForm onAddTodo={addTodo} />
        <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} dataVersion={dataVersion}/>
    </div>
  )
}

export default TodosPage;
