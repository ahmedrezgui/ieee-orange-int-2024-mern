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
    const [updatedWorkout, setUpdatedWorkout] = useState({})

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

    const handleUpdate = async () => {

        const newtitle = title ? title : workout.title;
        const newload = load ? load : workout.load;
        const newreps = reps ? reps : workout.reps;

        setUpdatedWorkout({ title: newtitle, load: newload, reps: newreps })


        const response = await fetch('http://localhost:4000/workouts/' + workout._id, {
            method: 'PATCH',
            body: JSON.stringify(updatedWorkout),
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

            <form className={`update ${updateForm ? 'visible' : 'hidden'}`} onSubmit={handleUpdate}>
                <h3>Add a New Workout</h3>
                <button type="button" onClick={openForm} className="close-button">
                    X
                </button>

                <label className="form-label">Exercise Title:</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={`form-input ${emptyFields.includes('title') ? 'error' : ''}`}
                />

                <label className="form-label">Load (in kg):</label>
                <input
                    type="number"
                    onChange={(e) => setLoad(e.target.value)}
                    value={load}
                    className={`form-input ${emptyFields.includes('load') ? 'error' : ''}`}
                />

                <label className="form-label">Number of Reps:</label>
                <input
                    type="number"
                    onChange={(e) => setReps(e.target.value)}
                    value={reps}
                    className={`form-input ${emptyFields.includes('reps') ? 'error' : ''}`}
                />

                <button type="submit" className="submit-button">Update Workout</button>
                {error && <div className="error-message">{error}</div>}
            </form>
        </>
    )
}

export default WorkoutDetails