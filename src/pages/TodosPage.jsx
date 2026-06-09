import { useEffect, useState, useCallback, useReducer } from 'react'
import TodoForm from '../features/Todos/TodoForm'
import TodoList from '../features/Todos/TodoList/TodoList'
import SortBy from '../shared/SortBy';
import FilterInput from '../shared/FilterInput';
import useDebounce from '../utils/useDebounce';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams } from 'react-router';
import StatusFilter from '../shared/StatusFilter';
import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS
} from '../reducers/todoReducer'

function TodosPage() {
    
    const {token} = useAuth()
    const [searchParams] = useSearchParams();
    const [state, dispatch] = useReducer(todoReducer, initialTodoState);
    const statusFilter = searchParams.get('status') || 'all';
    const {
           todoList,
           error,
           filterError,
           isTodoListLoading,
           sortBy,
           sortDirection,
           filterTerm,
           dataVersion,
          } = state;
    const debouncedFilterTerm = useDebounce(filterTerm, 300);

    useEffect(() => {
       if (!token) return;
          async function fetchTodos(){

            dispatch({type: TODO_ACTIONS.FETCH_START})

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
          dispatch({
            type: TODO_ACTIONS.FETCH_SUCCESS,
            payload: {
              tasks: data.tasks
            }
          });


            }catch (error) {
               dispatch({
                  type: TODO_ACTIONS.FETCH_ERROR,
                  payload: {
                       message: error.message,
                      isFilterError: false
                     }
               });
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

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: newTodo,
    });

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
          dispatch({
             type: TODO_ACTIONS.ADD_TODO_SUCCESS,
             payload: {
                tempId: newTodo.id,
                todo: data
             }
          })

    } catch (error) {
        dispatch({
           type: TODO_ACTIONS.ADD_TODO_ERROR,
           payload: {
             message: error.message,
             tempId: newTodo.id
           }
        });
    } 
    
  }

  async function completeTodo(id) {

    const originalTodo = todoList.find(todo => todo.id === id);

    dispatch({
       type: TODO_ACTIONS.COMPLETE_TODO_START,
       payload: { id }
    });

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
      dispatch({
          type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
          payload: { id }
      })

    } catch (error) {
       dispatch({
           type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
           payload: {
              message: error.message,
              originalTodo
           }
       });
    }
  }

  async function updateTodo(editedTodo) {
    
      const originalTodo = todoList.find(todo => todo.id === editedTodo.id);
      dispatch({
         type: TODO_ACTIONS.UPDATE_TODO_START,
         payload: editedTodo
      });

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

          dispatch({
             type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
             payload: editedTodo
          });

    }catch (error) {
      dispatch({
         type: TODO_ACTIONS.UPDATE_TODO_ERROR,
         payload: {
           message: error.message,
           originalTodo
         }
      });
    }
  }

  return (
    <div>
        {filterError && (
          <div>
            <p>{filterError}</p>
            <button onClick={() => 
                 dispatch({
                    type: TODO_ACTIONS.CLEAR_ERROR,
                    payload: {
                       error: '',
                       filterError: '',
                    },
                 })
                } type="button">
                    Clear Filter Error
            </button>
            <button onClick={() => {
                dispatch({
                   type: TODO_ACTIONS.RESET_FILTERS,
                       })
                   }} type="button">
                Reset Filters
            </button>
          </div>
        )}
        {isTodoListLoading && <p>Loading todos...</p>}

        <SortBy 
           sortBy={sortBy}
           sortDirection={sortDirection}
           onSortByChange={(newSortBy) => 
                  dispatch({
                     type: TODO_ACTIONS.SET_SORT,
                     payload: {
                       sortBy: newSortBy,
                       sortDirection,
                     }
                  })
           }
           onSortDirectionChange={(newSortDirection) => 
                  dispatch({
                     type: TODO_ACTIONS.SET_SORT,
                     payload: {
                        sortBy,
                        sortDirection: newSortDirection,
                     }
                  })
           }
        />
        <StatusFilter />
        <FilterInput 
             filterTerm={filterTerm} 
             onFilterChange={(newTerm) => 
                 dispatch({
                    type: TODO_ACTIONS.SET_FILTER,
                    payload: {
                       filterTerm: newTerm,
                    },
                 })
             } 
        />
        <TodoForm onAddTodo={addTodo} />
        <TodoList 
            todoList={todoList} 
            onCompleteTodo={completeTodo} 
            onUpdateTodo={updateTodo} 
            dataVersion={dataVersion}
            statusFilter={statusFilter}/>
    </div>
  )
}

export default TodosPage;
