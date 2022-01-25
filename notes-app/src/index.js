
import { createNotes} from './notes'
import { setFilters } from './filters';
import {renderNotes} from './views'

renderNotes()

document.querySelector('#create-note').addEventListener('click', (e) => {
   const id = createNotes()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({searchText: e.target.value})
    renderNotes()
})

document.querySelector("#for-fun").addEventListener('change', (e) => {
    console.log(e.target.checked)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    setFilters({sortBy: e.target.value})
    renderNotes()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        renderNotes()
    }
})

