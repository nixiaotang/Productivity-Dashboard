import React, { useState } from 'react'
import TodoEditForm from './TodoEditForm';
import { BiTrash } from 'react-icons/bi';
import { TiEdit } from 'react-icons/ti';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';


function Todo({todos, completeTodo, toggleEditTodo, editTodo, deleteTodo}) {

    const[edit, setEdit] = useState({
        id: null,
        text: ""
    });

    const submitEdit = value => {

        editTodo(edit.id, value.text);
        toggleEditTodo(edit.id, false);

        setEdit({
            id: null,
            value: ""
        })
    }

    const startEdit = (todo) => {
        
        //close other edit todo popup if opened
        for(let i = 0; i < todos.length; i++) {
            toggleEditTodo(todos[i].id, false);
        }

        //set current editing todo id and text
        setEdit({id: todo.id, text: todo.text});
        toggleEditTodo(todo.id, true);
    }


    return todos.map((todo, index) => (

        <div>
            {todo.isEditing ? (
                <TodoEditForm onSubmit={submitEdit} todo={todo}/>
            ) : (
                <div 
                    className={todo.isComplete ? 'todo-row medium complete' : 'todo-row medium'}
                    key={index}
                >
                    {todo.isComplete ? 
                        <RiCheckboxLine className="completed-icon" onClick={() => completeTodo(index)} /> : 
                        <RiCheckboxBlankLine className="completed-icon" onClick={() => completeTodo(index)} /> 
                    }

                    <div className="todo-text" onClick={() => completeTodo(index)}>
                        {todo.text}
                    </div>

                    <div className="icons" >
                        <TiEdit className="edit-icon" onClick={() => startEdit(todo, index)} />
                        <BiTrash className="delete-icon" onClick={() => deleteTodo(index)}/>
                    </div>
                </div>
            )}
        </div>

    ));
}

export default Todo
