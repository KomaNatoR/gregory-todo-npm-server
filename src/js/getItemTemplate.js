// const getItemTemplate = (text) - так було!
// const getItemTemplate = ({text, isDone}) - потім так.
export const getItemTemplate = ({text, isDone, id}) =>
    `<li class="item" data-id="${id}">
        <div>
            <input
                data-action="toggle"
                type="checkbox"
                ${isDone ? 'checked' : ''}/>
            <span>${text}</span>
        </div>
        <div class="buttons">
            <button data-action="view" class="btn view" type="button">view</button>
            <button data-action="delete" class="btn delete" type="button">x</button>
        </div>
    </li>`;