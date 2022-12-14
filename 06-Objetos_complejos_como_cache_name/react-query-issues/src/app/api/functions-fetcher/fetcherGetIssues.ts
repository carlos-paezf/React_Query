import { sleep } from "../../helpers/sleep"
import { IssueType } from "../../issues/types"
import { githubApiClient } from "../githubApi"


/**
 * It returns a promise that resolves to an array of issues
 * @returns An array of IssueType objects.
 */
export const fetcherGetIssues = async (): Promise<IssueType[]> => {
    await sleep( 1 )
    const { data } = await githubApiClient.get<IssueType[]>( '/issues' )
    return data
}