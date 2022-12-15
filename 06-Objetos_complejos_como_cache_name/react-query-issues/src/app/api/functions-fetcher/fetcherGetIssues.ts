import { sleep } from "../../helpers/sleep"
import { IssueType, StateType } from "../../issues/types"
import { githubApiClient } from "../githubApi"


/**
 * It returns a promise that resolves to an array of issues
 * @returns An array of IssueType objects.
 */
export const fetcherGetIssues = async ( labels: string[], state?: StateType ): Promise<IssueType[]> => {
    await sleep( 1 )

    const params = new URLSearchParams()

    if ( state ) params.append( 'state', state )
    if ( labels.length ) params.append( 'labels', labels.join( ',' ) )

    params.append( 'page', '1' )
    params.append( 'per_page', '100' )

    const { data } = await githubApiClient.get<IssueType[]>( '/issues', { params } )
    return data
}