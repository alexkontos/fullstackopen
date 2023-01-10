import { useState } from 'react'

const Header = ({name}) => <h2>{name}</h2>;

const Button = ({name, onClick}) => <button onClick={onClick}>{name}</button>

const Stat = ({name, amount}) => <div>{name} {amount}</div>

const Statistics = ({goodAmount, neutralAmount, badAmount}) => {

  const all = goodAmount + neutralAmount + badAmount
  const average = (goodAmount - badAmount)/(goodAmount + neutralAmount + badAmount)
  const positive = (goodAmount / all) * 100 + '%'

  if (all) {
    return (
      <div>
        <Stat name="good" amount={goodAmount} />
        <Stat name="neutral" amount={neutralAmount} />
        <Stat name="bad" amount={badAmount} />
        <Stat name="all" amount={goodAmount + neutralAmount + badAmount} />
        <Stat name="average" amount={average} />
        <Stat name="positive" amount={positive} />
      </div>
    )
  } else {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header name="give feedback" />
      <Button name="good" onClick={() => setGood(good+1)} />
      <Button name="neutral" onClick={() => setNeutral(neutral+1)} />
      <Button name="bad" onClick={() => setBad(bad+1)} />
      <Header name="statistics" />
      <Statistics goodAmount={good} neutralAmount={neutral} badAmount={bad}/>
    </>
  )
}

export default App