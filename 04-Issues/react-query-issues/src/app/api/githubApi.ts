import axios from "axios"


export const githubApiClient = axios.create( {
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
} )