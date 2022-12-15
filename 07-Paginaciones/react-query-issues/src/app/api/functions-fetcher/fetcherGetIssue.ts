import { sleep } from "../../helpers/sleep"
import { IssueType } from "../../issues/types"
import { githubApiClient } from "../githubApi"


/**
 * It returns a promise that resolves to an object of type `IssueType` after a 1 second delay
 * @param {number} issueNumber - number
 * @returns The data object from the response.
 */
export const fetcherGetIssueInfo = async ( issueNumber: number ): Promise<IssueType> => {
    await sleep( 1 )
    const { data } = await githubApiClient.get<IssueType>( `/issues/${ issueNumber }` )
    return data
}
