import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdDone } from 'react-icons/md';

function TodoEditForm(props) {

    const [input, setInput] = useState(props.todo.text);

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random()*10000),
            text: input,
            isComplete: false,
            isEditing: false
        });

        setInput("");
    };

    return (
        <Form className="todo-form todo-edit" onSubmit={handleSubmit} autocomplete="off">
            <Form.Control 
                className="todo-input"
                type="text"
                name="text"
                value={input}
                onChange={handleChange}
            />
            <button type="submit" className="todo-button"><MdDone /></button>
        </Form>
    )
}

export default TodoEditForm;