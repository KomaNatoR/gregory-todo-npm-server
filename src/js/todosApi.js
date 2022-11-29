import axios from 'axios';

axios.defaults.baseURL= 'https://6386216e875ca3273d510f6f.mockapi.io';
// const URL = 'https://6386216e875ca3273d510f6f.mockapi.io';

// export const createTodo = payLoad => {
//     return fetch(`${URL}/todod`, {
//         method: 'POST',
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify(payLoad),
//     }).then(resp => resp.json());
// };
export const createTodo = payLoad => { 
    return axios.post(`/todod`,payLoad).then(({data})=>data);
};

// export const fetchTodos = () => {
//     return fetch(`${URL}/todod`)
//         .then(resp => resp.json())
//         .catch(()=>[]);
// };
export const fetchTodos = () => {
    return axios.get(`/todod`)
        .then(({data})=>data)
        .catch(()=>[]);
};

// export const updateTodo = (id,payLoad) => {
//     return fetch(`${URL}/todod/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify(payLoad),
//     }).then(resp => resp.json());
// };
export const updateTodo = (id,payLoad) => {
    return axios.put(`/todod/${id}`, payLoad).then(({data})=>data);
};

// export const deleteTodo = id => {
//     return fetch(`${URL}/todod/${id}`, {
//         method:'DELETE',
//     })
//         .then(resp => resp.json())
//         .catch(()=>[]);
// };
export const deleteTodo = id => { 
    return axios.delete(`/todod/${id}`,)
        .then(({data})=>data)
        .catch(()=>[]);
};