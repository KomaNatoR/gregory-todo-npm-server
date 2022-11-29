import * as basicLightbox from 'basiclightbox';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import 'basiclightbox/dist/basicLightbox.min.css'

import { getItemTemplate } from './getItemTemplate.js';
// import { items } from './items.js'; -- було так!
// import { items as importedItems } from './items';


let items = [];
const refs = { 
    list: document.querySelector('.list'),
    form: document.querySelector('.form'),
};

const render = () => { 
    // const lis = items.map((item) => getItemTemplate(item)); - так було!
    const lis = items.map(getItemTemplate);
    refs.list.innerHTML = '';
    refs.list.insertAdjacentHTML('beforeend', lis.join(''));
};
// ------------------------------ locaStorage -----------------------------
import {createTodo, fetchTodos, updateTodo, deleteTodo } from './todosApi';
//-------------------------------------------------------------------------
function hendleSubmit(e) {
    // const value = e.target.elements.text.value; -- повний варіант!
    const { value } = e.target.elements.text;
    const payLoad = {
        text: value,
        isDone: false,
        // id: uuidv4(),
        created: moment(new Date()).format('YYYY-MM-DD HH:mm'),
    };

    e.preventDefault();
    createTodo(payLoad).then((newTodo) => {
        addItem(newTodo);
        render();
        refs.form.reset();
    });
}

function addItem (item) {
    items.push(item);
};

const toggleItem = (id) => {
    const item =items.find(item=>item.id===id);

    items = items.map(item =>
        item.id === id
        ? {...item, isDone: !item.isDone,} 
        : item
    );
    updateTodo(id,{...item,isDone: !item.isDone});
    console.log();
    // items = items.map(item =>
    //     item.isDone === true
    //     ? parent.style.backgroundColor = "green"
    //     : parent.style.backgroundColor = "white"
    // );
};
const viewItem = (id) => { 
    const modal = basicLightbox.create(`
        <div class="modal">
            <p></p>
            <button class="btn" type="button">Close</button>
        </div>
    `);
    modal.show();
    const modalText = modal.element().querySelector('p');
    modalText.textContent = items.find(item => item.id === id).created;
    const modalButton = modal.element().querySelector('button');
    window.addEventListener('keydown', onEscCloseModal);
    // function onEscCloseModal(e) {
        // if (e.code === 'Escape') { --- так було до деструкторизації!
    // ------------------------------------
    // if (code !== 'Escape') return;
    // if (modal.visible()) modal.close(); --- можна так!
    // ------------------------------------
    // if (code !== 'Escape' && modal.visible()) {modal.close()}; --- або так!
    // ------------------------------------
    function onEscCloseModal({ code }) {
        if (code === 'Escape') {
            modal.close();
            window.removeEventListener('keydown', onEscCloseModal);
        }
        console.log(code);
    }
    modalButton.addEventListener('click', modal.close);
};
const deleteItem = (id) => { 
    items = items.filter(item => item.id !== id);
    deleteTodo(id).then(() => {
        render();
        console.log(items, id); 
    });
};

function hendleListClick(e) {
    if (e.target === e.currentTarget) return;

    const { action } = e.target.dataset;
    const parent = e.target.closest('li');
    const { id } = parent.dataset;
    // console.log(parent);
    // ifCheckedChangeColor(parent);

    switch (action) {
        case 'toggle':
            toggleItem(id);
            break;
       case 'view':
            viewItem(id);
            break;
       case 'delete':
            deleteItem(id);
            break;
    }
};
// function ifCheckedChangeColor(parent) {
//     console.dir(parent.querySelector('input').attributes.checked);
//     if (parent.querySelector('input').attributes.checked) {
//         parent.style.backgroundColor = "green";
//     } else {
//         parent.style.backgroundColor = "white";
//     }
// }
//-------------- так було замість того шо нижче -------
// const loadData = () => { 
//     items = fetchTodos();
// };

// loadData();
// render();

// -----------------------------------------------


fetchTodos()
    .then(data => {
        items = data;
        render(); 
    });

refs.form.addEventListener('submit', hendleSubmit);
refs.list.addEventListener('click', hendleListClick);


// --- basicLightBox ---
// const instance = basicLightbox.create(`
//     <div class="modal">
//         <p>
//             Your first lightbox with just a few lines of code.
//             Yes, it's really that simple.
//         </p>
//         <button class="btn" type="button">Close</button>
//     </div>
// `);
// instance.show();
// const modalText = instance.element().querySelector('p');
// modalText.textContent = 123;
// const modalButton = instance.element().querySelector('button');
// modalButton.addEventListener('click', instance.close);