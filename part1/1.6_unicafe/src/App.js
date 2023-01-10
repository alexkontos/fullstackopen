import { useState } from 'react'

const Header = ({name}) => <h2>{name}</h2>;

const Button = ({name, onClick}) => <button onClick={onClick}>{name}</button>

const StatisticLine = ({text, amount}) => {
  return(
    <tr><td>{text}</td><td>{amount}</td></tr>
  )
}

const Statistics = ({goodAmount, neutralAmount, badAmount}) => {

  const all = goodAmount + neutralAmount + badAmount
  const average = (goodAmount - badAmount)/(goodAmount + neutralAmount + badAmount)
  const positive = (goodAmount / all) * 100 + '%'

  if (all) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" amount={goodAmount} />
          <StatisticLine text="neutral" amount={neutralAmount} />
          <StatisticLine text="bad" amount={badAmount} />
          <StatisticLine text="all" amount={goodAmount + neutralAmount + badAmount} />
          <StatisticLine text="average" amount={average} />
          <StatisticLine text="positive" amount={positive} />
        </tbody>
      </table>
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