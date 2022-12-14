import { useInfiniteQuery } from "@tanstack/react-query"
import { fetcherGetIssues } from "../../api/functions-fetcher"
import { StateType } from "../types"


type Props = {
    labels: string[]
    state?: StateType
}


export const useIssues = ( { labels, state }: Props ) => {
    const issuesQuery = useInfiniteQuery(
        [ 'issues', 'infinite', { state, labels } ],
        ( data ) => fetcherGetIssues( {
            pageParam: data.pageParam,
            queryKey: data.queryKey
        } ),
        {
            getNextPageParam: ( lastPage, pages ) => {
                if ( !lastPage.length ) return
                return pages.length + 1
            }
        }
    )

    return {
        issuesQuery
    }
}