import PersonsList from './components/PersonsList';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Header from './components/Header';
import { useEffect, useState } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [isFiltered, setIsFiltered] = useState(false)

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response)
      })
  }, []);

  const personsToShow = isFiltered
    ? persons.filter(person => person.name.toUpperCase().includes(filterValue.toUpperCase()))
    : persons

  const handleNameInputChange = e => {
    setNewName(e.target.value);
  }

  const handleNumberInputChange = e => {
    setNewNumber(e.target.value);
  }

  const handleFilterInputChange = e => {
    let value = e.target.value;
    setFilterValue(value)
    if (value) {
      setIsFiltered(true)
    }
    else {
      setIsFiltered(false)
    }
  }

  const handleDelete = (name, id) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService.remove(id)
    }
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!persons.some(person => person.name === newName)) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService.create(newPerson)
        .then((response) => {
          setPersons([...persons, response])
        })
    } else {
      if (window.confirm(`${newName} is already in the phonebook, replace number?`)) {
        const personToReplace = persons.find(person => person.name === newName);
        const updatedPerson = {
          ...personToReplace,
          number: newNumber
        }
        personService.update(personToReplace.id, updatedPerson)
      }
    }
  }


  return (
    <div>
      <Header text="Phonebook" />
      <Filter value={filterValue} onChange={handleFilterInputChange} />
      <PersonForm newName={newName} handleNameInputChange={handleNameInputChange} newNumber={newNumber} handleNumberInputChange={handleNumberInputChange} handleFormSubmit={handleFormSubmit} />
      <PersonsList personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App