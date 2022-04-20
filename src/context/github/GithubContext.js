import { createContext, useReducer } from "react";
import githubReducer from './GithubReducer'

const GithubContext = createContext()

export const GithubProvider = ({ children }) => {

    // const [users, setUsers] = useState([])
    // const [loading, setLoading] = useState(true)

    const initialState = {
        users: [],
        loading: false,
        user: {},
        repos: [],
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // Set Loading
    const setLoading = () => dispatch(
        {
            type:
                'SET_LOADING'
        }
    )

    // Clear Users

    const clearUsers = () => dispatch(
        {
            type: 'CLEAR_USERS',
            payload: []

        }
    )

    // Search users
    const searchUsers = async (text) => {

        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`https://api.github.com/search/users?${params}`)
        // const { items } = await response.json()
        const data = await response.json()
        const items = data['items']

        // setUsers(data)
        // setLoading(false)
        dispatch({
            type: 'GET_USERS',
            payload: items,
        }
        )

    }
    // Ger repos
    const getRepos = async (login) => {

        setLoading()

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10,
        })


        const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`)
        const data = await response.json()
        dispatch({
            type: 'GET_REPOS',
            payload: data,
        }
        )
    }

    // Get user
    const getUser = async (login) => {

        setLoading()
        const response = await fetch(`https://api.github.com/users/${login}`)

        // const { items } = await response.json()

        if (response.status === 404) {
            window.location = '/notfound'
        } else {

            const data = await response.json()
            dispatch({
                type: 'GET_USER',
                payload: data,
            }
            )
        }


    }

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getRepos
    }}>
        {children}

    </GithubContext.Provider>

}

export default GithubContext