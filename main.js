const url = 'http://localhost:3000/notes'

document.addEventListener('submit', function (event) {
    event.preventDefault()
    let todoInput =  document.querySelector('#to-do').value  



fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      todoItem: todoInput
      //created_at: moment().format()
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)  
      const todoList = document.querySelector('#to-do-list')
      const todoItemEl = document.createElement('li')
      todoItemEl.innerText = data.todoItem
      todoList.appendChild(todoItemEl)
      list_title = document.querySelector('#list-title')
      list_title.innerText = data.todoItem
      //list_title.innerText = date.todoItem
    })
})

fetch(url)
  .then(res => res.json())
  .then(todoData => {
    const todoList = document.querySelector('#to-do-list')
    for (const item of todoData) {
      console.log(item)
      const todoItemEl = document.createElement('li')
      todoItemEl.innerText = item.todoItem
      todoList.appendChild(todoItemEl)
    }
  })