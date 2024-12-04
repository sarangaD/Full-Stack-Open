import React from 'react'

const PersonForm = ({addPersons,newName,newNumber,handleChange,handleNumberChange})=> {
  return (
    <form onSubmit={addPersons}>
    <div>
      name: <input value={newName} onChange={handleChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm