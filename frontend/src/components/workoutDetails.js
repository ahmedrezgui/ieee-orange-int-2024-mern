import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import { useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()

    const [updateForm, setUpdateForm] = useState(false);
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    const openForm = () => { 
        setUpdateForm(!updateForm)
    }

    const handleClick = async () => {
        const response = await fetch('http://localhost:4000/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = { title, load, reps }

        const response = await fetch('http://localhost:4000/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setEmptyFields([])
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }

    }
    const handleUpdate = async () => {
        const response = await fetch('http://localhost:4000/workouts/' + workout._id, {
            method: 'PATCH',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setEmptyFields([])
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            dispatch({ type: 'UPDATE_WORKOUT', payload: json })
        }
    }




    return (
        <>

            <div className="workout-details">
                <h4>{workout.title}</h4>
                <p><strong>Load (kg): </strong>{workout.load}</p>
                <p><strong>Number of reps: </strong>{workout.reps}</p>
                <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
                <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
                <span className="material-symbols-outlined update" onClick={openForm}>Update</span>
            </div>

            <form className="create" onSubmit={handleUpdate}>
                <h3>Add a New Workout</h3>
                <button onClick={openForm}> X</button>
                <label>Excersize Title:</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />

                <label>Load (in kg):</label>
                <input
                    type="number"
                    onChange={(e) => setLoad(e.target.value)}
                    value={load}
                    className={emptyFields.includes('load') ? 'error' : ''}
                />

                <label>Number of Reps:</label>
                <input
                    type="number"
                    onChange={(e) => setReps(e.target.value)}
                    value={reps}
                    className={emptyFields.includes('reps') ? 'error' : ''}
                />

                <button>Add Workout</button>
                {error && <div className="error">{error}</div>}
            </form>
        </>
    )
}

export default WorkoutDetails