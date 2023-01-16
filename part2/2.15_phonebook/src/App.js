import PersonsList from './components/PersonsList';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Header from './components/Header';
import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [isFiltered, setIsFiltered] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/Persons')
      .then(response => {
        setPersons(response.data)
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