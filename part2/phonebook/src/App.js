import { useState, useEffect } from 'react';
import axios from 'axios';

const Input = ({ label, value, changeHandler }) => {
  return (
    <div>
      {label}: <input value={value} onChange={changeHandler} />
    </div>
  )
}

const PersonForm = ({submitHandler, inputs}) => {
  return (
    <form onSubmit={submitHandler}>
      {inputs.map(input => {
        return <Input key={input.label} label={input.label} value={input.value} changeHandler={input.changeHandler} />
      })}
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ people }) => {
  return (
    <ul>
      {people.map(person => 
        <li key={person.name}>{person.name} {person.number}</li>  
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const getPeopleMatchingSearch = () => {
    let regex = new RegExp(`${searchTerm}`, 'i');
    return persons.filter(person => regex.test(person.name));
  }

  const personsToShow = getPeopleMatchingSearch();

  const nameExists = () => {
    let person = persons.find(person => person.name === newName);
    return typeof person === 'object';
  }

  const addPerson = (event) => {
    event.preventDefault();

    if (nameExists()) {
      alert(`${newName} is already in the phonebook`);
      return;
    }

    const name = { name: newName, number: newNumber };

    setPersons(persons.concat(name));
    setNewName('');
    setNewNumber('');
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Input label="search by name" value={searchTerm} changeHandler={handleSearchChange} />
      <h3>Add New Person</h3>
      <PersonForm submitHandler={addPerson} 
        inputs={[
          { label: 'name', value: newName, changeHandler: handleNameChange },
          { label: 'number', value: newNumber, changeHandler: handleNumberChange },
        ]}/>
      <h2>Numbers</h2>
      <Persons people={personsToShow} />
    </div>
  )
}

export default App;
