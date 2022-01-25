import {initializeEditPage,generateLastEdited} from './views'
import {DateTime} from 'luxon'
import {updateNote, removeNote} from './notes'



const titleElem = document.querySelector('#note-title')
const bodyElem = document.querySelector('#note-body')
const removeElem = document.querySelector('#remove-note')
const durElem = document.querySelector('#updated-on')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

titleElem.addEventListener('input', (e) => {
    console.log(`${noteId}`);

    const note = updateNote(noteId, {title: e.target.value})
    durElem.textContent = generateLastEdited(note.updatedAt)
})


bodyElem.addEventListener('input', (e) => {
    const note = updateNote(noteId, {body: e.target.value })
    durElem.textContent = generateLastEdited(note.updatedAt)
})

removeElem.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
    console.log('Some Data CHANGED')
})