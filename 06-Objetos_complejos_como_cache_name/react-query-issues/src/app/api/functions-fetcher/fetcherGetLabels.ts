import { sleep } from "../../helpers/sleep"
import { LabelType } from "../../issues/types"
import { githubApiClient } from "../githubApi"


/**
 * It fetches the labels from the GitHub API and returns them
 * @returns An array of LabelType objects.
 */
export const fetcherGetLabels = async (): Promise<LabelType[]> => {
    await sleep( 2 )
    const { data } = await githubApiClient.get<LabelType[]>( '/labels', {
        headers: {
            Authorization: null
        }
    } )
    return data
}