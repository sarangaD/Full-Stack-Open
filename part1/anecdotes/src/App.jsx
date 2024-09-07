import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Title = () => {
    return (
      <div>
        <h1>Anecdote of the day</h1>
      </div>
    )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Votes = ({ points }) => {
  if (points.length > 0) {
    return (
      <div>
        <p>has {points[randomNo]} votes</p>
      </div>
    )
  }
}

const MostVotes = ({anecdotes, points }) => {
  const isAllZero = points.every(item => item === 0);
  const maxvotes = Math.max(...points);
  const maxvoteIndex = points.indexOf(maxvotes)
  if (!isAllZero) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[maxvoteIndex]}</p>
        <p>has {maxvotes} votes</p>
      </div>
    )
  }
}

let randomNo = 0

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  let pointsArr = new Uint8Array(anecdotes.length);

  const [selected, setSelected] = useState(0)
  const [points, setAllVotes] = useState(pointsArr)

  const handleClick = () => {
    randomNo = getRandomInt(0, 6)
    setSelected(randomNo)
  }


  const handleVoteClick = () => {
    const copy = [...points]
    copy[randomNo] += 1
    setAllVotes(copy)
  }

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  return (
    <div>
      <Title />
      <p>{anecdotes[selected]}</p>
      <Votes points={points} />
      <Button handleClick={handleVoteClick} text={"vote"} />
      <Button handleClick={handleClick} text={"next anecdotes"} />
      <MostVotes anecdotes={anecdotes} points={points} />
    </div>

  )
}

export default App
