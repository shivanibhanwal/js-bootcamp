import {DateTime} from 'luxon'
import humanizeDuration from 'humanize-duration'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'


const generateNoteDOM = (note) => {
    const noteElem = document.createElement('a')
    const textElem = document.createElement('p')
    const bodyElem = document.createElement('p')
    const button = document.createElement('button')
    const labelElem = document.createElement('p')
    if (note.title.length === 0) {
        note.title = "No Text"
    }
    
    noteElem.classList = 'list-item'
    noteElem.setAttribute('href', `/edit.html#${note.id}`)
    textElem.textContent = note.title
    textElem.classList = 'list-item__title'
    bodyElem.textContent = note.body
    bodyElem.classList = 'list-item__body'
    labelElem.textContent = generateLastEdited(note.updatedAt)
    labelElem.classList = 'list-item__subtitle'

    noteElem.appendChild(textElem).appendChild(bodyElem).appendChild(labelElem).appendChild(button)
    return noteElem
}

const initializeEditPage = (noteId) =>{
    const titleElem = document.querySelector('#note-title')
    const bodyElem = document.querySelector('#note-body')
    const durElem = document.querySelector('#updated-on')

    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)
    
    if (!note) {
        location.assign('/index.html')
    }
    
    titleElem.value = note.title
    bodyElem.value = note.body
    durElem.textContent = generateLastEdited(note.updatedAt)
}

const renderNotes = () => {
    const containerEl = document.querySelector('#container')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)

    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    containerEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const elem = generateNoteDOM(note)
            containerEl.appendChild(elem)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = "No Notes Added!"
        emptyMessage.classList = "empty-message"
        containerEl.appendChild(emptyMessage)
    }
    
}

const generateLastEdited = (noteTimeStamp) => {
    const currentTime = DateTime.now().ts
    return `Last edited ${humanizeDuration(currentTime - noteTimeStamp)}`
}
export { renderNotes, generateNoteDOM, generateLastEdited, initializeEditPage }