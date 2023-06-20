import React, { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {

    if (good == 0 && neutral == 0 && bad ==0){
        return <p>No feedback given</p>
    }

    return (<>

            <table>
                <tr><td>average</td><td>{(good - bad) / (good + neutral + bad)}</td></tr>
                <tr ><td>positive</td>
                    <td>{(good) / (good + neutral + bad) * 100}%</td></tr>
            </table>

        </>
    )
}

const StatisticsLine = ({text, value}) => {

    return (
        <table>
            <tr><td>{text}</td><td>{value}</td></tr>
        </table>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

    const handleGoodClick = (newValue) => () =>{
      setGood(newValue)
    }

    const handleNeutralClick = (newValue) => {
        setNeutral(newValue)
    }

    const handleBadClick = () =>{
      setBad(bad + 1)
    }


  return (
      <div>

          <h1>give feedback</h1>
          <button onClick={handleGoodClick(good + 1)}>good</button>
          <button onClick={() => handleNeutralClick(neutral + 1)}>neutral</button>
          <button onClick={handleBadClick}>bad</button>

          <h1>statistics</h1>
          <StatisticsLine text = 'good' value = {good}/>
          <StatisticsLine text = 'neutral' value = {neutral}/>
          <StatisticsLine text = 'bad' value = {bad}/>
          <Statistics
              good = {good}
              bad={bad}
              neutral={neutral}>
          </Statistics>



      </div>
  )
}

export default App