document.addEventListener('DOMContentLoaded', () => contentLoaded());
let state = {
    todos: [],
};
function contentLoaded() {
    if (!localStorage.getItem('appState')) {
        localStorage.setItem('appState', JSON.stringify(state));
    }
    else {
        state = JSON.parse(localStorage.getItem('appState'));
    }
    renderTodos();
}
const todoInput = () => document.querySelector('.new-todo');
const todoList = () => document.querySelector('.todo-list');
const destroyBtns = () => document.querySelectorAll('.destroy');
const clearBtn = () => document.querySelector('.clear-completed');
todoInput().addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const target = event.target;
        addTodo(target.value);
        renderTodos();
        todoInput().value = '';
    }
});
clearBtn().addEventListener('click', () => {
    state = {
        todos: [],
    };
    localStorage.setItem('appState', JSON.stringify(state));
    renderTodos();
});
function newId() {
    return state.todos.length ? state.todos.length : 0;
}
function addTodo(todoTitle) {
    let newTodo = {
        id: newId(),
        title: todoTitle,
    };
    if (todoTitle) {
        state.todos.push(newTodo);
        localStorage.setItem('appState', JSON.stringify(state));
    }
}
function deleteTodo(desBtn) {
    const idToDel = parseInt(desBtn.parentElement.parentElement.id);
    const newTodoList = [];
    state.todos.forEach((todo) => {
        if (todo.id !== idToDel) {
            newTodoList.push(todo);
        }
    });
    state.todos = newTodoList;
    localStorage.setItem('appState', JSON.stringify(state));
}
function renderTodos() {
    const todoElements = state.todos
        .map((todo) => `<li id="${todo.id}">
   <div class="view">
     <input class="toggle" type="checkbox"/>
     <label>${todo.title}</label>
     <button class="destroy"/>
   </div>
   <input class="edit" />
 </li>`)
        .join('');
    todoList().innerHTML = todoElements;
    btnsListener();
}
function btnsListener() {
    destroyBtns().forEach((btn) => btn.addEventListener('click', (event) => {
        const target = event.target;
        deleteTodo(target);
        renderTodos();
    }));
}
