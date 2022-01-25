import {v4 as uuidv4} from 'uuid'
import {DateTime} from 'luxon'

let notes = []

const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}

//save notes in localstorage
const saveNotes = () => {
    console.log(JSON.stringify(notes));
    localStorage.setItem("notes", JSON.stringify(notes))
}

const getNotes = () => notes

const createNotes =() =>{
    const id = uuidv4()
    const timestamp = DateTime.now().ts
    notes.push({
        id: id,
        title: "",
        body: "",
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes()
    return id
}



//Remove Note   
const removeNote = (noteId) => {
    const noteIndex = notes.findIndex((note, index) => note.id === noteId)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

const sortNotes = (sortBy) => {
    switch (sortBy) {
        case 'byEdited':
            return notes.sort((a, b) => {
                if (a.updatedAt > b.updatedAt) {
                    return -1
                } else if (a.updatedAt < b.updatedAt) {
                    return 1
                } else {
                    return 0
                }
            })
            break
        case 'byCreated':
            return notes.sort((a, b) => {
                if (a.createdAt > b.createdAt) {
                    return -1
                } else if (a.createdAt < b.createdAt) {
                    return 1
                } else {
                    return 0
                }
            })
            break
        case 'alphabeticalFilter':
            return notes.sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1
                } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1
                } else {
                    return 0
                }
            })
            break
        default:
            return notes
    }
}

const updateNote = (id, updates) =>{
    const note = notes.find((note) => note.id === id)
    if(!note){
        return
    }
    if(typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = DateTime.now().ts
    }

    if(typeof updates.body === 'string') {
      note.body = updates.body
      note.updatedAt = DateTime.now().ts
    }
    
    saveNotes()
    
    return note
}


notes = loadNotes()

export {getNotes, createNotes, sortNotes, removeNote,updateNote}