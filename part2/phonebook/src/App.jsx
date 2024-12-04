import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import './App.css'
import personsService from './service/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [error, setErrorMessage] = useState(null);


  const fetchData = () => {
    personsService.getAll().then(
      initialPersons => {
        setPersons(initialPersons);
      }
    )
  }

  useEffect(fetchData, []);

  const handleChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    const filteredlist =persons.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
    setPersons(search.length > 0 ?  filteredlist : persons);
  }

  const addPersons = (event) => {
    event.preventDefault();

    const maxId = persons.reduce((max, person) => {
      const id = person.id ? parseInt(person.id, 10) : person.id;
      return id > max ? id : max;
    }, 0);

    const newPerson = {
      name: newName,
      number: newNumber,
      id: (maxId + 1).toString()
    }

    const exsitingPerson = persons.find(x => x.name === newName);
    if (exsitingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new number?`)) {
        newPerson.id = exsitingPerson.id;
        personsService.update(exsitingPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === exsitingPerson.id ? returnedPerson : person))
            setNewName('');
            setNewNumber('');
          })
      }
    }
    else {
      personsService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          const error= {message:`Added ${newPerson.name}`,error:false};
          setErrorMessage(error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
    }
  }

  const deletePerson = (id) => {
    console.log(id);
    const toDelete = persons.find(n => n.id === id)

    if (window.confirm(`Delete ${toDelete.name}?`)) {
      personsService.deletebyId(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(err => {
          const error = {message:`Information of ${toDelete.name} has already been removed from server`,error:true}
          setErrorMessage(error)
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000)
        });
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification error={error} />
      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h2>Add a new</h2>
      <PersonForm addPersons={addPersons} newName={newName} newNumber={newNumber} handleChange={handleChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={(e) => deletePerson(e)} />
    </div>
  )
}

export default App
