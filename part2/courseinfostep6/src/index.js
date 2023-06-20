import React from 'react';
import ReactDOM from 'react-dom';
import Course from "./course";

const Header = ({ course }) => {

    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    // Using Array Map and Reduce to Count
    const reducer = (previousValue, currentValue) => previousValue + currentValue
    const array = course.parts.map(a => a.exercises)
    const sum = array.reduce(reducer)

    return(
        <p>Number of exercises {sum}</p>
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

    return (
        <div>
            {course.parts.map((item,i) =>{
                    return (
                        <Part part={course.parts[i]}></Part>
                    )
                }
            )}
        </div>
    )
}

const App = () => {

    console.log(Course()[1])

    return (
        <div>
            <Header course={Course()[0]} />
            <Content course={Course()[0]} />
            <Total course={Course(0)[0]} />

            <Header course={Course()[1]} />
            <Content course={Course()[1]} />
            <Total course={Course(1)[1]} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))