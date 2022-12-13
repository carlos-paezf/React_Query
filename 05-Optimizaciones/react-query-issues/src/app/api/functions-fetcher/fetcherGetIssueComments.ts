import { sleep } from "../../helpers/sleep"
import { IssueType } from "../../issues/types"
import { githubApiClient } from "../githubApi"


/**
 * It fetches the comments for a given issue number
 * @param {number} issueNumber - number
 * @returns An array of IssueType objects.
 */
export const fetcherGetIssueComments = async ( issueNumber: number ): Promise<IssueType[]> => {
    await sleep( 1 )
    const { data } = await githubApiClient.get<IssueType[]>( `/issues/${ issueNumber }/comments` )
    return data
}