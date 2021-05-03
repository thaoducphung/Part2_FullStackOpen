import axios from 'axios'
import React, {useState, useEffect} from 'react' 
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

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
  const [message, setMessage] = useState(null)
  const [errorStatus, setErrorStatus] = useState(false)
  // const hook = () => {
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(res => {
  //       setPersons(res.data)
  //     })
  // }
  // useEffect(hook,[])

  useEffect(()=>{
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    // Create new person object
    // const found = persons.some(element => element.name.toLowerCase() === newName.toLowerCase())
    const found = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    console.log('found',found)
    if (found) {
      // window.alert(`${newName} is already added to phonebook`)
      const addChange = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (addChange) {
        const personChange = {
          ...found,
          number: newNumber
        }
        personService
          .update(found.id,personChange)
          .then(returnedPerson => {
            setPersons(persons.map(person=> person.id !== found.id ? person : returnedPerson))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      
      personService
        .create(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
          
          setMessage(newName)
          setErrorStatus(false)

          setTimeout(()=>{
            setMessage(null)
          }, 2000)
        })
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
        <Notification message={message} error={errorStatus}/>
        <Filter value={searchName} onChange={handleSearchName}/>

      <h3>Add a new</h3>

      <PersonForm newName={newName}
          newNumber={newNumber}
          addPerson={addPerson} 
          handlePersonChange={handlePersonChange}
          handleNumberChange={handleNumberChange}
        />
      

      <h3>Numbers</h3>

      <Persons 
        persons={peopleFilters}
        personService={personService}
        setPersons={setPersons}
        setMessage={setMessage}
        setErrorStatus={setErrorStatus}
      />
    </div>
  )
}

export default App 