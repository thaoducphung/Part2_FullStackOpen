import React from 'react'

// const Persons = ({person}) => {
//     return (<div>{person.name} {person.number}</div>)
// }

const Persons = ({persons}) => (
    <div>
        {persons.map(person=>
        <div key={person.name}>{person.name} {person.number}</div>
        )}
    </div>
    )

export default Persons