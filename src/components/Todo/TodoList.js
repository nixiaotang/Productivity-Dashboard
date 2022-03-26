import React, { useState } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import "./Todo.css";

function TodoList() {

    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [...todos, todo];
        setTodos(newTodos);
    }

    const completeTodo = index => {
        let updatedTodos = [...todos];
        updatedTodos[index].isComplete = !updatedTodos[index].isComplete;
        setTodos(updatedTodos);
    }

    const editTodo = (id, newText) => {

        if(!newText || /^\s*$/.test(newText)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === id ? {id: item.id, text: newText, isComplete: item.isComplete, isEditing: item.isEditing} : item)));
    }

    const toggleEditTodo = (id, flag) => {
        setTodos(prev => prev.map(item => (item.id === id ? {id: item.id, text: item.text, isComplete: item.isComplete, isEditing: flag} : item)));
    }

    const deleteTodo = index => {
        let updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    }

    return (
        <div className="todo-panel">
            <h4 className="bold">What's the Plan for Today?</h4>
            <TodoForm onSubmit={addTodo}/>

            <div className="todo-list">
                <Todo todos={todos} completeTodo={completeTodo} toggleEditTodo={toggleEditTodo} editTodo={editTodo} deleteTodo={deleteTodo}/>
            </div>
        </div>
    )
}

export default TodoList;

