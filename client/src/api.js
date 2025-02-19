import { API_URL } from './utils';

// Helper function to get the authentication token
const getAuthToken = () => {
    const token = localStorage.getItem('token'); // or sessionStorage.getItem('token')
    if (!token) {
        throw new Error('No authentication token found. Please log in.');
    }
    return token;
};

// Create a new task
export const CreateTask = async (taskObj) => {
    const url = `${API_URL}/tasks`;
    const token = getAuthToken();

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token
        },
        body: JSON.stringify(taskObj)
    };

    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const data = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error('Error creating task:', err);
        throw err; // Re-throw the error for handling in the calling function
    }
};

// Get all tasks for the authenticated user
export const GetAllTasks = async () => {
    const url = `${API_URL}/tasks`;
    const token = getAuthToken();

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token
        }
    };

    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error fetching tasks:', err);
        throw err; // Re-throw the error for handling in the calling function
    }
};

// Delete a task by ID
export const DeleteTaskById = async (id) => {
    const url = `${API_URL}/tasks/${id}`;
    const token = getAuthToken();

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token
        }
    };

    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error deleting task:', err);
        throw err; // Re-throw the error for handling in the calling function
    }
};

// Update a task by ID
export const UpdateTaskById = async (id, reqBody) => {
    const url = `${API_URL}/tasks/${id}`;
    const token = getAuthToken();

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token
        },
        body: JSON.stringify(reqBody)
    };

    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error updating task:', err);
        throw err; // Re-throw the error for handling in the calling function
    }
};