import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { fetcherGetIssues } from "../../api/functions-fetcher"
import { StateType } from "../types"


type Props = {
    labels: string[]
    state?: StateType
}


export const useIssues = ( { labels, state }: Props ) => {
    const [ page, setPage ] = useState( 1 )

    const issuesQuery = useQuery(
        [ 'issues', { labels, state, page } ],
        () => fetcherGetIssues( { labels, state, page } ),
        {
            refetchOnWindowFocus: false
        }
    )

    const nextPage = () => {
        if ( !issuesQuery.data?.length ) return

        setPage( page + 1 )
    }

    const prevPage = () => {
        if ( page <= 1 ) return

        setPage( page - 1 )
    }

    return { issuesQuery, page, nextPage, prevPage }
}