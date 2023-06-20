import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { CreateNew } from "./Components/Create"
import {Footer} from "./Components/Footer";
import {About} from "./Components/About";
import {AnecdoteList} from "./Components/AnecdoteList";
import {Anecdote} from "./Components/Anecdote";
import {Notifications} from "./Components/Notifications";
import {useField} from "./hooks/useField";

const Menu = () => {
    const padding = {
        paddingRight: 5
    }

    return (
        <div>
            <Link to="/" style={padding}>anecdotes</Link>
            <Link to="/create" style={padding}>create new</Link>
            <Link to="/about" style={padding}>about</Link>
        </div>
    )
}

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ])

    const [notification, setNotification] = useState();


    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))
    }

    const anecdoteById = (id) => anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    return (
        <Router>
            <div>
                <h1>Software anecdotes</h1>
                <Menu />
                <Notifications setNotification={setNotification} notification={notification}/>
                <Routes>
                    <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
                    <Route path="/create" element={<CreateNew addNew={addNew} setNotification={setNotification}/>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} vote={vote} anecdoteById={anecdoteById} />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default App
