import { useQuery } from "@tanstack/react-query"
import { IssueType } from "../types"
import { githubApiClient } from '../../api/githubApi'
import { sleep } from "../../helpers/sleep"


const fetcherGetIssue = async ( issueNumber: number ): Promise<IssueType> => {
    await sleep( 1 )
    const { data } = await githubApiClient.get<IssueType>( `/issues/${ issueNumber }` )
    return data
}


const fetcherGetIssueComments = async ( issueNumber: number ): Promise<IssueType[]> => {
    await sleep( 1 )
    const { data } = await githubApiClient.get<IssueType[]>( `/issues/${ issueNumber }/comments` )
    return data
}


export const useIssue = ( issueNumber: number ) => {
    const issueQuery = useQuery(
        [ `issue`, issueNumber ],
        () => fetcherGetIssue( issueNumber )
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
