import Button from './Button';
import Input from './Input'

const PersonForm = ({ newName, handleNameInputChange, newNumber, handleNumberInputChange, handleFormSubmit }) => {
  return (
    <form>
      <div>
        name: <Input value={newName} onChange={handleNameInputChange} />
        number: <Input value={newNumber} onChange={handleNumberInputChange} />
      </div>
      <Button onClick={handleFormSubmit} />
    </form>);
}

export default PersonForm