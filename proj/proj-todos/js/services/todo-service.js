const STORAGE_KEY = 'todoDB';

var gFilterBy = 'ALL';
var gSortBy = 'TEXT'
var gTodos = _createTodos();


function getTodosForDisplay() {
    sortTodosForDisplay();
    if (gFilterBy === 'ALL') return gTodos;
    var res = gTodos.filter(function (todo) {
        return (
            gFilterBy === 'DONE' && todo.isDone ||
            gFilterBy === 'ACTIVE' && !todo.isDone
        )
    })
    return res;
}

function addTodo(txt, importance) {
    gTodos.unshift(_createTodo(txt, importance))
    saveToStorage(STORAGE_KEY, gTodos);
}

function removeTodo(id) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === id
    })
    gTodos.splice(idx, 1);
    saveToStorage(STORAGE_KEY, gTodos);
}

function toggleTodo(id) {
    var todo = gTodos.find(function (todo) {
        return todo.id === id
    })
    todo.isDone = !todo.isDone;
    saveToStorage(STORAGE_KEY, gTodos);
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function sortTodosForDisplay() {
    var sortBy = (gSortBy === 'TEXT') ? 'txt' : (gSortBy === 'CREATED') ? 'createdAt' : 'importance';
    gTodos.sort(function (todo1, todo2) {
        if (todo1[sortBy] > todo2[sortBy]) return 1;
        if (todo1[sortBy] < todo2[sortBy]) return -1;
        return 0;
    })
}

function getTodosCount() {
    return gTodos.length
}
function getActiveTodosCount() {
    var count = gTodos.reduce(function (count, todo) {
        if (!todo.isDone) count += 1
        return count;
    }, 0)
    return count;
}
function getActiveTodosCount1() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}

function setNoTodosDisplay(){
    return `No ${(gFilterBy === 'ALL') ? '' : (gFilterBy === 'ACTIVE') ? 'Active' : 'Done'} Todos`;
}

// Those functions are PRIVATE - not to be used outside this file!
function _createTodo(txt, importance = 3) {
    // var time = getTime();
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        createdAt: getTime(),
        importance
    };
}
function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY);
    if (!todos) {
        todos = []
        todos.push(_createTodo('Learn HTML'))
        todos.push(_createTodo('Master CSS'))
        todos.push(_createTodo('Become JS Ninja'))
    }
    return todos;
}



