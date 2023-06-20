import React from 'react'
const App = () => {
    console.log('Hello from component 1')

    const now = new Date()
    const a = 10
    const b = 20

    const Hello = (props) => {
        return (
            <div>
                <p>WHat's up world</p>
                <p>{props.name} and {props.age}</p>
            </div>

        )
    }

    return (
    <>
        <p>Hello world, it is {now.toString()}</p>
        <p>
            {a} plus {b} is {a + b}
        </p>
        <Hello name ={a} age = {b}></Hello>
      <p>Hello world</p>

    </>
    )
}

export default App