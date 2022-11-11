const Persons = ({ people, deleteHandler }) => {
  return (
    <ul>
      {people.map(person => 
        <li key={person.name}>
          {person.name} {person.number}
          <button
            data-id={person.id}
            data-name={person.name}
            onClick={deleteHandler}
          >
            delete
          </button>
        </li>  
      )}
    </ul>
  )
}

export default Persons;