import axios from "axios"

export const githubApiClient = axios.create( {
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: `Bearer ${ import.meta.env.VITE_APP_API_GITHUB }`
    }
} )