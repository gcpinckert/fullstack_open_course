import { useState, useEffect } from 'react';
import { Input, PersonForm } from './components/PersonForm'
import Persons from './components/Persons'
import peopleService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople);
      });
  }, []);

  const getPeopleMatchingSearch = () => {
    let regex = new RegExp(`${searchTerm}`, 'i');
    return persons.filter(person => regex.test(person.name));
  }

  const personsToShow = getPeopleMatchingSearch();

  const findPerson = () => {
    return persons.find(person => person.name === newName);
  }

  const addPerson = (event) => {
    event.preventDefault();
    let foundPerson = findPerson();

    if (typeof foundPerson === 'object') {
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
        let updatedPerson = { ...foundPerson, number: newNumber };

        peopleService
          .update(foundPerson.id, updatedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : updatedPerson));
          })
          .catch(error => {
            alert(`Could not find ${newName}`);
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      peopleService
        .create(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson));
          setNewName('');
          setNewNumber('');
        });
    }
  }

  const deletePerson = (event) => {
    let id = event.target.getAttribute('data-id');
    let name = event.target.getAttribute('data-name');

    if (window.confirm(`Delete ${name}?`)) {
      peopleService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== parseInt(id)));
        })
        .catch(error => alert(`${name} was already deleted`));
    }
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
      <Persons people={personsToShow} deleteHandler={deletePerson}/>
    </div>
  )
}

export default App;
