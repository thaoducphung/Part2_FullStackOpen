import React from 'react' 

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const {parts} = course
    // console.log(parts)
    // const total = parts[0].exercises + parts[1].exercises + parts[2].exercises

    // const total = parts.reduce((s,p) => {
    //     // console.log(s)
    //     console.log(p.exercises)
    //     return s + p.exercises
    // },0)

    const total = parts.reduce((s,p) => s + p.exercises, 0)

    return(
      <b>total of {total} exercises</b>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    // console.log(course)
    return (
      <div>
          {course.parts.map(part =>
            <Part key={part.id} part={part}/>
            )}
      </div>
    )
  }

const Course = ({course}) => {
    // console.log(props.course)
    // const {course} = props
    // const course = props.course
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course