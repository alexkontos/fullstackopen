import PersonsList from './components/PersonsList';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Header from './components/Header';
import Notification from './components/Notification'
import { useEffect, useState } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [isFiltered, setIsFiltered] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState({ text: null, isError: false })

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
          setNotificationMsg({ text: `${response.name} successfully created`, isError: false })
          setTimeout(() => setNotificationMsg({ text: '', isError: false }), 5000)
        })
    } else {
      if (window.confirm(`${newName} is already in the phonebook, replace number?`)) {
        const personToReplace = persons.find(person => person.name === newName);
        const updatedPerson = {
          ...personToReplace,
          number: newNumber
        }
        personService.update(personToReplace.id, updatedPerson)
          .then(response => {
            setNotificationMsg({ text: `${updatedPerson.name} successfully updated`, isError: false })
            setTimeout(() => setNotificationMsg({ text: '', isError: false }), 5000)
          })
          .catch(errorMsg => {
            setNotificationMsg({ text: `${updatedPerson.name} has already been removed from the server`, isError: true })
            setTimeout(() => setNotificationMsg({ text: '', isError: false }), 5000)
          })
      }
    }
  }


  return (
    <div>
      <Notification text={notificationMsg.text} isError={notificationMsg.isError} />
      <Header text="Phonebook" />
      <Filter value={filterValue} onChange={handleFilterInputChange} />
      <PersonForm newName={newName} handleNameInputChange={handleNameInputChange} newNumber={newNumber} handleNumberInputChange={handleNumberInputChange} handleFormSubmit={handleFormSubmit} />
      <PersonsList personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App