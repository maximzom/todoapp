const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');
 
let toDos = JSON.parse(localStorage.getItem('toDos')) || [];
 
function newTodo() 
{
  const task = prompt('Введіть назву завдання:');
  if (task) {
    const newTodo = {
      id: Date.now(),
      text: task,
      checked: false
    };
    toDos.push(newTodo);
    saveTodos();
    render();
    updateCounter();
  }
}
 
function renderTodo(todo) 
{
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? 'checked' : ''} onChange="checkTodo(${todo.id})" />
      <label for="${todo.id}"><span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}
 
function render() 
{
  list.innerHTML = '';
  toDos.forEach(todo => {
    list.insertAdjacentHTML('beforeend', renderTodo(todo));
  });
}
 
function updateCounter() 
{
  const totalCount = toDos.length;
  const uncheckedCount = toDos.filter(todo => !todo.checked).length;
 
  itemCountSpan.textContent = totalCount;
  uncheckedCountSpan.textContent = uncheckedCount;
}
 
function deleteTodo(id) 
{
  toDos = toDos.filter(todo => todo.id !== id);
  saveTodos();
  render();
  updateCounter();
}
 
function checkTodo(id) 
{
  const toDo = toDos.find(todo => todo.id === id);
  if (toDo) 
    {
    toDo.checked = !toDo.checked;
    saveTodos();
    render();
    updateCounter();
  }
}
 
function saveTodos() 
{
  localStorage.setItem('todos', JSON.stringify(toDos));
}

render();
updateCounter();