const getItemtemplate = ({objectId, title,story_title, url}) => `
<li class="items" data-id="${objectId}">
    <a href=${url} target="_blank">${title||story_title}</a>
</li>`;

const URL = 'https://hn.algolia.com/api/v1/search';

const refs = {
    form: document.querySelector('.news-form'),
    list: document.querySelector('.news-list'),
    submitButton: document.querySelector('.news-submit'),
    loader: document.querySelector('.news-loader'),
};

let isLoading = false;
let items = [];
const render = () => { 
    // const list = items.map(item=>getItemtemplate(item)); -так було!
    const list = items.map(getItemtemplate);

    refs.list.innerHTML = "";
    refs.list.insertAdjacentHTML('beforeend',list.join(''));
};

const showLoader = () => { 
    refs.loader.classList.add('show');
};
const hideLoader = () => { 
    refs.loader.classList.remove('show');
};

const lockForm = () => { 
    refs.submitButton.setAttribute('disabled', true);
};
const unlockForm = () => { 
    refs.submitButton.removeAttribute('disabled');
};

const hendleSubmit = (e) => {
    e.preventDefault();

    const { value } = e.target.elements.query;

    showLoader();
    lockForm();
    fetch(`${URL}?query=${value}`)
        .then(resp => resp.json())
        .then(({ hits }) => {
            items = hits;
            render();
        })
        .finally(() => {
            hideLoader();
            unlockForm();
        });
    // console.log(value);
};
 
refs.form.addEventListener('submit', hendleSubmit);