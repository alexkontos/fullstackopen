import Header from './Header'

const PersonsList = ({ personsToShow }) => {
  return (
    <div>
      <Header text="Numbers" />
      {personsToShow.map(person => <p key={person.id}>{person.name}: {person.number}</p>)}
    </div>);
}

export default PersonsList