import React from 'react'

// const Persons = ({person}) => {
//     return (<div>{person.name} {person.number}</div>)
// }

const Persons = ({persons,personService,setPersons}) => {
    const handleDelete = (id) => {
        console.log(`delete ${id}`)
        const person = persons.find(n => n.id === id)
        const result = window.confirm(`Delete ${person.name} ?`)
        console.log('result',result)
        
        if (result) {
            personService
            .deletePerson(id)
            .then(deletedPerson => {
                setPersons(persons.filter(person => person.id !== id))
                })
                .catch(err => {
                    // const person = persons.find(n => n.id === id)
                    
                    alert(
                        `Failed to delete '${person.name}' from the server`
                    )
                })
        }
        
    }
    return (
    <div>
        {persons.map(person=>
        <div key={person.name}>{person.name} {person.number}
        <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
        )}
    </div>
    )}

export default Persons

