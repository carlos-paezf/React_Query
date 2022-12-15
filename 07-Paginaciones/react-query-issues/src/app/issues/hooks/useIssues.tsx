import { useQuery } from "@tanstack/react-query"
import { fetcherGetIssues } from "../../api/functions-fetcher"
import { StateType } from "../types"


type Props = {
    labels: string[]
    state?: StateType
}


export const useIssues = ( { labels, state }: Props ) => {
    const issuesQuery = useQuery(
        [ 'issues', { labels, state } ],
        () => fetcherGetIssues( labels, state ),
        {
            refetchOnWindowFocus: false
        }
    )

    return { issuesQuery }
}