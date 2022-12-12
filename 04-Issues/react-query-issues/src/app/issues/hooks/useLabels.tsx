import { useQuery } from "@tanstack/react-query"
import { githubApiClient } from "../../api/githubApi"
import { placeholderDataMock } from "../../helpers/mocks/placeholderDataMock"
import { sleep } from "../../helpers/sleep"
import type { LabelType } from "../types"


const fetcherGetLabels = async (): Promise<LabelType[]> => {
    await sleep( 2 )
    const { data } = await githubApiClient.get<LabelType[]>( '/labels', {
        headers: {
            Authorization: null
        }
    } )
    return data
}


export const useLabels = () => {
    const labelsQuery = useQuery(
        [ 'labels' ],
        fetcherGetLabels,
        {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 60,
            placeholderData: placeholderDataMock
        }
    )

    return { labelsQuery }
}