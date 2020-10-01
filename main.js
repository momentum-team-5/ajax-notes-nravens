const url = 'http://localhost:3000/notes'
const notesDiv = document.querySelector('#notes-div')

notesDiv.addEventListener('click', function (event) {
    if (event.target.matches('.delete')) {
      deleteNote(event.target.parentElement.dataset.id)
    }
    else if (event.target.matches('.edit')) {
        editNote(event.target.parentElement.dataset.id)
    } 
  })

document.addEventListener('submit', function (event) {
    event.preventDefault()
    submitNote()
})



function editNote(id) {
const itemToEdit = document.querySelector(`div[data-id='${id}']`)
note_text = itemToEdit.children[1].value

    fetch(url + "/" + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          //note_title: note_title,
          note_text: note_text
      })
    })
        .then(res => res.json())
        .then(data => {
        })
}



function deleteNote(id) {
    fetch(url + "/" + id, {
            method: 'DELETE'
          })
            .then(res => res.json())
            .then(data => {
              const itemToRemove = document.querySelector(`div[data-id='${id}']`)
              itemToRemove.remove()
            })
}

function submitNote() {
    note_title_element = document.querySelector('#note-title-input')
    note_text_element = document.querySelector('#note-text-input')
    note_title = note_title_element.value
    note_text = note_text_element.value

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          note_title: note_title,
          note_text: note_text
        })
      })
        .then(res => res.json())
        .then(data => {
            createNote(data.id, note_title, note_text)
        })
        note_title_element.value = ""
        note_text_element.value = ""
}


function fetchAll() {
fetch(url)
  .then(res => res.json())
  .then(data => {
    for (const item of data) {
        createNote(item.id, item.note_title, item.note_text)
    }
  })

}


function createNote(id, title, text) {
    new_div = document.createElement('div')
    new_div.setAttribute('data-id', id)
    notesDiv.appendChild(new_div)

    new_header = document.createElement('h2')
    new_div.appendChild(new_header)
    new_header.innerText = title

    new_paragraph = document.createElement('textarea')
    new_div.appendChild(new_paragraph)
    new_paragraph.innerText = text

    const deleteIcon = document.createElement('span')
        deleteIcon.classList.add('fas', 'fa-times', 'mar-l-xs', 'delete')
        new_div.appendChild(deleteIcon)
        deleteIcon.innerText = 'DELETE  '

    const editIcon = document.createElement('span')
        editIcon.classList.add('fas', 'fa-times', 'mar-l-xs', 'edit')
        new_div.appendChild(editIcon)
        editIcon.innerText = '  EDIT'
}

fetchAll()