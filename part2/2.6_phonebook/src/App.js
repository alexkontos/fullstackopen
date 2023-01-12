import PersonsList from './components/PersonsList';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Header from './components/Header';
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [isFiltered, setIsFiltered] = useState(false)

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

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!persons.some(person => person.name === newName)) {
      setPersons([...persons, { name: newName, number: newNumber, id: persons.length + 1 }])
    } else {
      alert(`${newName} is already in the phonebook`)
    }
  }


  return (
    <div>
      <Header text="Phonebook" />
      <Filter value={filterValue} onChange={handleFilterInputChange} />
      <PersonForm newName={newName} handleNameInputChange={handleNameInputChange} newNumber={newNumber} handleNumberInputChange={handleNumberInputChange} handleFormSubmit={handleFormSubmit} />
      <PersonsList personsToShow={personsToShow} />
    </div>
  )
}

export default App