import { useQuery } from "@tanstack/react-query"
import { fetcherGetIssueInfo, fetcherGetIssueComments } from "../../api/functions-fetcher"


export const useIssue = ( issueNumber: number ) => {
    const issueQuery = useQuery(
        [ `issue`, issueNumber ],
        () => fetcherGetIssueInfo( issueNumber ),
        {
            staleTime: 1000 * 60 * 5
        }
    )

    const issueCommentsQuery = useQuery(
        [ 'issue', issueNumber, 'comments' ],
        () => fetcherGetIssueComments( issueQuery.data?.number! ),
        {
            enabled: !!issueQuery.data
        }
    )

    return { issueQuery, issueCommentsQuery }
}
