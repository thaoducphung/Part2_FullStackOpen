import React, {useState} from 'react'
import Note from './components/Note'

const App = (props) => {
  // const {notes} = props
  const [notes, setNotes] = useState(props.notes)
  // const [newNote, setNewNote] = useState('a new note...')
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // const notesToShow = showAll ? notes : notes.filter(note => note.important === true)
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={()=> setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {/* <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li> */}

        {/* {notes.map(note => <li>{note.content}</li>)} */}

        {/* {notes.map(note =>
          <li key={note.id}>
            {note.content}
          </li>  
        )} */}

        {/* {notes.map((note,i)=>
          <li key={i}>
            {note.content}
          </li>
        )} */}

        {/* {notes.map(note =>
          <Note key={note.id} note={note}/>
        )} */}

        {notesToShow.map(note =>
            <Note key={note.id} note={note}/>
        )}

      </ul>
      <ul></ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App 
