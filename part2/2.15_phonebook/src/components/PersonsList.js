import Header from './Header'
import Button from './Button'

const PersonsList = ({ personsToShow, handleDelete }) => {

  return (
    <div>
      <Header text="Numbers" />
      {personsToShow.map(person => {
        return (
          <div key={person.id}>
            <p>{person.name}: {person.number} <Button onClick={() => handleDelete(person.name, person.id)} text="remove" />
            </p>
          </div>
        )
      }
      )}
    </div>);
}

export default PersonsList