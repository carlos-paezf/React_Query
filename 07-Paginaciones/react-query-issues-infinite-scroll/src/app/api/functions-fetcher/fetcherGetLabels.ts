import { LabelType } from "../../issues/types"
import { githubApiClient } from "../githubApi"


/**
 * It fetches the labels from the GitHub API and returns them
 * @returns An array of LabelType objects.
 */
export const fetcherGetLabels = async (): Promise<LabelType[]> => {
    const params = new URLSearchParams()

    params.append( 'per_page', '100' )

    const { data } = await githubApiClient.get<LabelType[]>( '/labels', {
        params,
        headers: {
            Authorization: null
        }
    } )
    return data
}