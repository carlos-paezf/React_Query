import { IssueType, StateType } from "../../issues/types"
import { githubApiClient } from "../githubApi"


interface Props {
    labels: string[]
    state?: StateType
    page: number
}

interface QueryProps {
    pageParam?: number
    queryKey: ( string | Props )[]
}

/**
 * It returns a promise that resolves to an array of issues
 * @returns An array of IssueType objects.
 */
export const fetcherGetIssues = async ( { pageParam = 1, queryKey }: QueryProps ): Promise<IssueType[]> => {
    const { 2: args } = queryKey
    const { state, labels } = args as Props

    const params = new URLSearchParams()

    if ( state ) params.append( 'state', state )
    if ( labels.length ) params.append( 'labels', labels.join( ',' ) )

    params.append( 'page', pageParam.toString() )
    params.append( 'per_page', '5' )

    const { data } = await githubApiClient.get<IssueType[]>( '/issues', { params } )
    return data
}