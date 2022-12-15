import { IssueType, StateType } from "../../issues/types"
import { githubApiClient } from "../githubApi"


interface Props {
    labels: string[]
    state?: StateType
    page: number
}

/**
 * It returns a promise that resolves to an array of issues
 * @returns An array of IssueType objects.
 */
export const fetcherGetIssues = async ( { labels, state, page }: Props ): Promise<IssueType[]> => {
    const params = new URLSearchParams()

    if ( state ) params.append( 'state', state )
    if ( labels.length ) params.append( 'labels', labels.join( ',' ) )

    params.append( 'page', page.toString() )
    params.append( 'per_page', '5' )

    const { data } = await githubApiClient.get<IssueType[]>( '/issues', { params } )
    return data
}