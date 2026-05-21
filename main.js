
class MainApp extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'container');

    const title = document.createElement('h1');
    title.textContent = 'Todo List';

    const form = document.createElement('form');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Add a new todo...');
    const button = document.createElement('button');
    button.textContent = 'Add';
    form.appendChild(input);
    form.appendChild(button);

    const list = document.createElement('ul');

    const style = document.createElement('style');
    style.textContent = `
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        font-family: sans-serif;
        background-color: #f4f4f4;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h1 {
        text-align: center;
        color: #333;
      }

      form {
        display: flex;
        margin-bottom: 20px;
      }

      input[type="text"] {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      button {
        padding: 10px 15px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 10px;
      }

      button:hover {
        background-color: #0056b3;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
      }

      li:last-child {
        border-bottom: none;
      }

      li.completed {
        text-decoration: line-through;
        color: #999;
      }

      .delete-btn {
        background-color: #dc3545;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        padding: 5px 10px;
      }

      .delete-btn:hover {
        background-color: #c82333;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(title);
    wrapper.appendChild(form);
    wrapper.appendChild(list);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value) {
        this.addTodoItem(input.value);
        input.value = '';
      }
    });
  }

  addTodoItem(text) {
    const list = this.shadowRoot.querySelector('ul');

    const listItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('change', () => {
      listItem.classList.toggle('completed');
    });

    const span = document.createElement('span');
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('class', 'delete-btn');
    deleteBtn.addEventListener('click', () => {
      list.removeChild(listItem);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(span);
    listItem.appendChild(deleteBtn);

    list.appendChild(listItem);
  }
}

customElements.define('main-app', MainApp);
