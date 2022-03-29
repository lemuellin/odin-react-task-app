import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./Overview.css";


const Overview = (props) => {
    const {tasks, remove, edit} = props;

    return(
        <ul>
            {tasks.map((task) => {
                return (
                    <div key={task.id} id={task.id}>
                        <li>{task.counter}. {task.text}</li>
                        <button type="button" onClick={remove}><FontAwesomeIcon icon={faDeleteLeft} className="btn" /></button>
                        <button type="button" onClick={edit}><FontAwesomeIcon icon={faPenToSquare} className='btn' /></button>
                    </div>
                )
            })}
        </ul>
    );
}

export default Overview;