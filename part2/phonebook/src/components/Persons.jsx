import React from 'react'

function Persons({persons,deletePerson}) {
  return (
    <ul>
    {
      persons.map(person => 
        <li className='person' key={person.id}> {person.name}    {person.number}
        &nbsp;<button key={person.id} onClick={()=>deletePerson(person.id)}>delete</button>
        </li>
      )
    }

  </ul>
  )
}

export default Persons