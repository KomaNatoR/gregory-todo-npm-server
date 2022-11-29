export const createTodo = payLoad => { 
    console.log(payLoad);
    localStorage.setItem('todos', JSON.stringify(payLoad));
};
export const fetchTodos = () => { 
    try {
        return Promise.resolve(JSON.parse(localStorage.getItem('todos')) || []);
    } catch (error) {
        console.log('can`t load todos');
        return Promise.resolve([]);
    }
};
export const updateTodo = (payLoad) => { 
    localStorage.setItem('todos', JSON.stringify(payLoad));
};
export const deleteTodo = (payLoad) => { 
    localStorage.setItem('todos', JSON.stringify(payLoad));
};