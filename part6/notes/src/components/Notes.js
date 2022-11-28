import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  const highlight = { background: note.important ? 'yellow' : ''}

  return (
    <li onClick={handleClick} style={highlight}>
      {note.content}
      <strong>{note.important ? ' important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }

    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  return (
    <ul>
      {notes.map(note => {
        return (<Note 
          key={note.id} 
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />)
      })}
    </ul>
  )
}

export default Notes