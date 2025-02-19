import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from '../api';
import { notify } from '../utils';
import styles from './TaskManager.module.css';

function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask = () => {
        if (updateTask && input) {
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            };
            handleUpdateTask(obj);
        } else if (updateTask === null && input) {
            handleAddTask();
        }
        setInput('');
    };

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask]);

    const handleAddTask = async () => {
        const obj = {
            taskName: input,
            isDone: false
        };
        try {
            const { success, message } = await CreateTask(obj);
            if (success) {
                notify(message, 'success');
                fetchAllTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error');
        }
    };

    const fetchAllTasks = async () => {
        try {
            const { data } = await GetAllTasks();
            setTasks(data);
            setCopyTasks(data);
        } catch (err) {
            console.error(err);
            notify('Failed to fetch tasks', 'error');
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTaskById(id);
            if (success) {
                notify(message, 'success');
                fetchAllTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to delete task', 'error');
        }
    };

    const handleUpdateTask = async (item, isDone = item.isDone) => {
        const { _id, taskName } = item;
        const obj = {
            taskName,
            isDone: isDone
        };
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                notify(message, 'success');
                setUpdateTask(null); // Reset updateTask state
            } else {
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error');
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        if (term === '') {
            setTasks(copyTasks);
        } else {
            const results = copyTasks.filter((item) => item.taskName.toLowerCase().includes(term));
            setTasks(results);
        }
    };

    return (
        <div className={styles.taskManager}>
            <h1 className={styles.heading}>Task Manager App</h1>
            <div className={styles.inputContainer}>
                <div className={styles.inputGroup}>
                    <input
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className={styles.input}
                        placeholder='Add a new Task'
                    />
                    <button onClick={handleTask} className={styles.addButton}>
                        <FaPlus />
                    </button>
                </div>

                <div className={styles.inputGroup}>
                    <span className={styles.searchIcon}>
                        <FaSearch />
                    </span>
                    <input
                        onChange={handleSearch}
                        className={styles.input}
                        type='text'
                        placeholder='Search tasks'
                    />
                </div>
            </div>

            <div className={styles.taskList}>
                {tasks.map((item) => (
                    <div key={item._id} className={`${styles.taskItem} ${item.isDone ? styles.done : ''}`}>
                        <span className={styles.taskName}>{item.taskName}</span>
                        <div className={styles.buttonGroup}>
                            <button
                                onClick={() => handleUpdateTask(item, !item.isDone)}
                                className={styles.checkButton}
                                type='button'
                            >
                                <FaCheck />
                            </button>
                            <button
                                onClick={() => setUpdateTask(item)}
                                className={styles.editButton}
                                type='button'
                            >
                                <FaPencilAlt />
                            </button>
                            <button
                                onClick={() => handleDeleteTask(item._id)}
                                className={styles.deleteButton}
                                type='button'
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
}

export default TaskManager;