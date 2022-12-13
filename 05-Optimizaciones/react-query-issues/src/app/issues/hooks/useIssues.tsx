import { useQuery } from "@tanstack/react-query"
import { githubApiClient } from "../../api/githubApi"
import type { IssueType } from "../types"


const fetcherGetIssues = async (): Promise<IssueType[]> => {
    const { data } = await githubApiClient.get<IssueType[]>( '/issues' )
    return data
}


export const useIssues = () => {
    const issuesQuery = useQuery(
        [ 'issues' ],
        fetcherGetIssues,
        {
            refetchOnWindowFocus: false
        }
    )

    return { issuesQuery }
}