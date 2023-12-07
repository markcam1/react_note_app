import React, {useState, useEffect} from 'react'
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { useParams, Link, useNavigate } from 'react-router-dom'
 

const NotePage = ({match}) => {

    // react dom 6 uses this coding
    const { id } = useParams();
    const navigate = useNavigate()

    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [id])

    let getNote = async ()=> {
        if (id === 'new') return

        //backticks allow us to pass dynamic variables
        let response = await fetch(`/api/notes/${id}/`)
        let data = await response.json()
        setNote(data)

    }

    let createNote = async () => {

        fetch(`/api/notes/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })

    }

    let updateNote = async () => {
        fetch(`/api/notes/${id}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
    }

    let deleleteNote = async () => {
        fetch(`/api/notes/${id}/delete/`, {
            method: 'DELETE',
            'headers': {
                'Content-Type' : 'application/json'
            }
        })
        navigate('/')
    }

    let handleSubmit = () => {
        
        if(id !== 'new' && note.body === "") {
            deleleteNote()
        }else if (id !== 'new') {
            updateNote()
        }else if (id === 'new' && note.body !== null) {
            createNote()
        }
        navigate('/')
    }

    // * Dennis Ivy added this because the component wasn't updating correcty
    // * When deleting all text with keyboard and submitting the change the code was supposed to delete the note on the db 
    // * This replaces "handleSubmit"
    // * but the issue ended up being the default value in 'arrow' button click

    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value}))
        console.log('Handle Change: ', note)
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea onChange={(e) => { handleChange(e.target.value)}} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage