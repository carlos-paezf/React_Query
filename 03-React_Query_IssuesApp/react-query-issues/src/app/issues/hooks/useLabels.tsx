import { useQuery } from "@tanstack/react-query"
import { githubApiClient } from "../../api/githubApi"
import { sleep } from "../../helpers/sleep"
import { LabelType } from "../types/label"


const fetcherGetLabels = async (): Promise<LabelType[]> => {
    await sleep( 2 )
    const { data } = await githubApiClient.get<LabelType[]>( '/labels' )
    return data
}


export const useLabels = () => {
    const labelsQuery = useQuery(
        [ 'labels' ],
        fetcherGetLabels,
        {
            refetchOnWindowFocus: false
        }
    )

    return { labelsQuery }
}