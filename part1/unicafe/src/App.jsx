import { useState } from 'react'
import './App.css'

const AppName = () => (
  <div>
    <h1>Give Your Feedback</h1>
  </div>
)

const StaticsTitle = () => (
  <div>
    <h1>Statics</h1>
  </div>
)

const Statistics = (props) => {
  console.log(props)
  const { good, neutral, bad } = props.props
  console.log((good + neutral + bad) == 0)
  if ((good + neutral + bad) == 0) {
    return (<div>
      <p>No Feedback Given</p>
    </div>)
  } else {
    return (<div>
      <table className="table">
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={good + neutral + bad} />
          <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
          <StatisticLine text="positive" value={(good / (good + neutral + bad))*100 + "%"} />
        </tbody>
      </table>

    </div>)
  }

}
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const props = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
      <AppName />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <StaticsTitle />
      <Statistics props={props} />
    </div>
  )
}
export default App
