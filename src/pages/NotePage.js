import React, {useState, useEffect} from 'react'
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { useParams, Link, useNavigate } from 'react-router-dom'
 

const NotePage = ({match}) => {

    // react dom 6 uses this coding
    const { id } = useParams();
    const navigate = useNavigate()

    let [note, setNote] = useState({ body: '', amount: '' })

    useEffect(() => {
        getNote()
    }, [id])

    let getNote = async ()=> {
        if (id === 'new') return
        // //backticks allow us to pass dynamic variables
        // let response = await fetch(`/api/notes/${id}/`)
        // let data = await response.json()
        // console.log("NotePage:", data)
        // setNote(data)

        try {
            const response = await fetch(`/api/notes/${id}/`);
            const data = await response.json();
            setNote(data);
        } catch (error) {
            console.error('Error fetching note:', error);
        }

    }

    let createNote = async () => {

        // fetch(`/api/notes/create/`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body:JSON.stringify(note)
        // })

        try {
            await fetch(`/api/notes/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(note),
            });
        } catch (error) {
            console.error('Error creating note:', error);
        }

    }

    let updateNote = async () => {
        // fetch(`/api/notes/${id}/update/`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body:JSON.stringify(note)
        // })

        try {
            await fetch(`/api/notes/${id}/update/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(note),
            });
        } catch (error) {
            console.error('Error updating note:', error);
        }


    }

    let deleleteNote = async () => {
        // fetch(`/api/notes/${id}/delete/`, {
        //     method: 'DELETE',
        //     'headers': {
        //         'Content-Type' : 'application/json'
        //     }
        // })
        // navigate('/')

        try {
            await fetch(`/api/notes/${id}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            navigate('/');
        } catch (error) {
            console.error('Error deleting note:', error);
        }


    }

    let handleSubmit = () => {

        console.log(note)
        if(note === null) {
            deleleteNote()
        }else if (id !== 'new' && note.body === "") {
            deleleteNote()
        }else if (id !== 'new') {
            updateNote()
        }else if (id === 'new' && note.body !== "") {
            createNote()
        }
        navigate('/')
    }

    // * Dennis Ivy added this because the component wasn't updating correcty
    // * When deleting all text with keyboard and submitting the change the code was supposed to delete the note on the db 
    // * This replaces "handleSubmit"
    // * but the issue ended up being the default value in 'arrow' button click

    // let handleChange = (value) => {

    //     // console.log("E: ", e)
    //     // console.log("e target: ", e.target)
    //     setNote(note => ({ ...note, 'body': value}))
    //     console.log('Handle Change: ', note)
    // }

    const handleChange = (e) => {
        setNote((prevNote) => ({ ...prevNote, [e.target.name]: e.target.value }));
    };

    return (
        <div className='note'>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className='note-header'>
                    <h3>
                        <ArrowLeft onClick={handleSubmit} />
                    </h3>
                    {id !== 'new' ? (
                        <button type='button' onClick={deleleteNote}>Delete</button>
                    ) : (
                        <button type='button' onClick={handleSubmit}>Done</button>
                    )}
                </div>
                {/* <textarea onChange={(e) => { handleChange(e.target.value)}} value={note?.body}></textarea> */}
                <textarea name='body' onChange={handleChange} value={note?.body}></textarea>
                <div>
                    <label htmlFor='amountInput'>Amount:</label>
                    <input
                        type='number'
                        id='amountInput'
                        name='amount'
                        onChange={handleChange}
                        value={note?.amount}
                    />
                </div>
            </form>
        </div>
    )
}

export default NotePage