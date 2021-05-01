import axios from 'axios'
import React, {useState, useEffect} from 'react' 
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }
  useEffect(hook,[])

  const addPerson = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    // Create new person object
    const found = persons.some(element => element.name === newName)
    if (found === true) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const peopleFilters = searchName.lenght ? persons : persons.filter(
    person => person.name.toLowerCase().includes(searchName.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>

        <Filter value={searchName} onChange={handleSearchName}/>

      <h3>Add a new</h3>

      <PersonForm newName={newName}
          newNumber={newNumber}
          addPerson={addPerson} 
          handlePersonChange={handlePersonChange}
          handleNumberChange={handleNumberChange}
        />
      

      <h3>Numbers</h3>

      <Persons persons={peopleFilters}/>
    </div>
  )
}

export default App 