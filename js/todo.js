const elForm = document.querySelector(".todo-form");
const inputValue = document.querySelector(".todo-input");
const elTodoList = document.querySelector(".todo-list");
const updateModal = document.getElementById('updateModal');
const updateInput = document.getElementById('updateInput');
const saveUpdateBtn = document.getElementById('saveUpdateBtn');
const closeButton = document.querySelector('.close-button');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const clearInputBtn = document.getElementById('clearInputBtn');

let todos = [];

elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        id: todos.length + 1,
        todoValue: inputValue.value,
        isCompleted: false
    };
    e.target.reset();
    todos.push(data);

    renderTodos(todos);
});

function renderTodos(arr) {
    elTodoList.innerHTML = ""; 

    arr.forEach((item, index) => {
        let elTodoItem = document.createElement("li");
        elTodoItem.className = "flex bg-white p-2 rounded-lg items-center justify-between";
        elTodoItem.innerHTML = `
            <div>
                <span>${index + 1}.</span>
                <strong class="${item.isCompleted ? 'line-through' : ''}">${item.todoValue}</strong>
            </div>
            <div class="flex items-center space-x-1">
                <div class="w-[20px] h-[20px] cursor-pointer rounded-full border-[2px] border-black relative" data-id="${item.id}">
                    ${item.isCompleted ? '<div class="absolute inset-[2px] bg-blue-500 rounded-full"></div>' : ''}
                </div>
                <button type="button" class="delete-btn p-[6px] rounded-lg bg-red-500 text-white border-[2px] border-transparent font-semibold hover:bg-transparent hover:text-red-500 hover:border-red-500 duration-300"><i class="fa-solid fa-trash"></i></button>
                <button type="button" class="update-btn p-[6px] rounded-lg bg-blue-500 text-white border-[2px] border-transparent font-semibold hover:bg-transparent hover:text-blue-500 hover:border-blue-500 duration-300"><i class="fa-solid fa-pen"></i></button>
            </div>
        `;

    elTodoItem.querySelector(`[data-id="${item.id}"]`).addEventListener('click', function() {
            handleToggleComplete(item.id);
    });

    elTodoItem.querySelector('.delete-btn').addEventListener('click', function() {
            handleDeleteTodo(item.id);
    });

    elTodoItem.querySelector('.update-btn').addEventListener('click', function() {
            handleUpdateTodo(item.id);
    });
    elTodoList.append(elTodoItem);
    });
}

function handleDeleteTodo(id) {
    todos = todos.filter(item => item.id !== id);

    renderTodos(todos);
}

function handleToggleComplete(id) {
    todos = todos.map(item => {
        if (item.id === id) {
            item.isCompleted = !item.isCompleted;
        }
        return item;
    });

    renderTodos(todos);
}

let currentEditId = null;

function handleUpdateTodo(id) {
    const todo = todos.find(item => item.id === id);
    if (!todo) return;
    currentEditId = id;
    updateInput.value = todo.todoValue;

    updateModal.classList.remove('hidden');
}

saveUpdateBtn.addEventListener('click', function() {
    if (currentEditId !== null) {
        todos = todos.map(item => {
            if (item.id === currentEditId) {
                item.todoValue = updateInput.value;
            }
            return item;
        });
        currentEditId = null;
        updateInput.value = '';
        updateModal.classList.add('hidden');

        renderTodos(todos);
    }
});

closeButton.addEventListener('click', function() {
    updateModal.classList.add('hidden');
    updateInput.value = '';
    currentEditId = null;
});

clearInputBtn.addEventListener('click', function() {
    inputValue.value = '';
});

themeToggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
