import {useState, useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom"  // ✅ "react" → "react-router-dom"
import axios from 'axios'
import LoadingStatus from './LoadingStatus';
import StoryGame from './StoryGame';


const API_BASE_URL = "/api"  // ✅ quitado "string ="

function StoryLoader() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [story, setStory] = useState(null);          // ✅ quitado "initialState="
    const [loading, setLoading] = useState(true);      // ✅ "loading= boolean" → "loading, setLoading"
    const [error, setError] = useState(null);          // ✅ "error= setError" → "error, setError"

    useEffect(() => {                                   // ✅ quitado "effect="
        loadStory(id)
    }, [id])                                           // ✅ quitado "deps=" y agregado ")"

    const loadStory = async (storyId) => {             // ✅ quitado "=promise<void>"
        setLoading(true)                               // ✅ quitado "value="
        setError(null)                                 // ✅ quitado "value="

        try {
            const response = await axios.get(`${API_BASE_URL}/stories/${storyId}`)  // ✅ "await.axios" → "await axios"
            setStory(response.data)
            setLoading(false)                          // ✅ quitado "value="
        } catch (err) {                                // ✅ quitado "}" extra
            if (err.response?.status === 404) {
                setError("Story is not found.")
            } else {
                setError("Failed to load story")
            }
        } finally {
            setLoading(false)
        }
    }

    const createNewStory = () => {
        navigate("/")
    }

    if (loading) {
        return <LoadingStatus theme={"story"} />       // ✅ agregado "/>" para cerrar el tag
    }

    if (error) {
        return (
            <div className="story-loader">
                <div className="error-message">
                    <h2>Story not found</h2>
                    <p>{error}</p>
                    <button onClick={createNewStory}>Go to Story Generator</button>
                </div>
            </div>
        )
    }

    if (story) {
        return (
            <div className="loader">
                <StoryGame story={story} onNewStory={createNewStory} />
            </div>
        )
    }
}

export default StoryLoader;