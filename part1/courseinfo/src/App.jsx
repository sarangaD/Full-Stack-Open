import { useState } from 'react'
import './App.css'

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return <h1>{props.course.name}</h1>
  }
  const Content = (props)=> {
    const items = props.parts.map((part) =>
      <li key={part.name }> {part.name + "          "+ part.exercises}</li>
    )
    return (
      <div className="listitems">
        <ul>
          {items}
        </ul>
      </div>
    );
  }
  

  const Total = (props) => {
    const total = props.parts.reduce((a, {exercises}) => a + exercises,0)
    return (
      <div className="listitems">
       <ul>
        <li>Number of exercises = {total}</li>
        </ul>
      </div>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
  </div>
  )
}

export default App
