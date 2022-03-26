import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPlusLg } from 'react-icons/bs';

function TodoForm(props) {

    const [input, setInput] = useState("");

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
        <Form className="todo-form" onSubmit={handleSubmit} autocomplete="off">
            <Form.Control 
                className="todo-input"
                type="text"
                name="text"
                placeholder="Add a todo"
                value={input}
                onChange={handleChange}
            />
            <button type="submit" className="todo-button"><BsPlusLg /></button>
        </Form>
    )
}

export default TodoForm;