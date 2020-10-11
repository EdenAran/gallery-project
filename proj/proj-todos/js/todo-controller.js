'use strict'

console.log('Hi');


function onInit() {
    renderTodos();
}


function renderTodos() {
    var strHTML = ''
    var todos = getTodosForDisplay();
    todos.forEach(function(todo){
        strHTML += 
        `<li class="${(todo.isDone)? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button onclick="onRemoveTodo(event,'${todo.id}')">x</button>
        </li>`
    })
    if(!strHTML) strHTML = setNoTodosDisplay();
    document.querySelector('.todo-list').innerHTML = strHTML;
    document.querySelector('.total').innerText = getTodosCount()
    document.querySelector('.active').innerText = getActiveTodosCount()
}

function onAddTodo() {
    var elNewTodoTxt = document.querySelector('.new-todo-txt');
    var txt = elNewTodoTxt.value;
    if (!txt) return;
    var elImportance = document.querySelector('.todo-importance');
    var importance = elImportance.value;
    addTodo(txt, importance);
    renderTodos();
    elNewTodoTxt.value = '';
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    if(!confirm('Are you sure you want to delete this?')) return;
    removeTodo(todoId);
    renderTodos();
}
function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderTodos();
}

function onSetSort(sortBy) {
    setSort(sortBy)
    renderTodos();
}