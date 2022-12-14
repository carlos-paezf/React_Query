import { useQuery } from "@tanstack/react-query"
import { fetcherGetIssues } from "../../api/functions-fetcher"



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