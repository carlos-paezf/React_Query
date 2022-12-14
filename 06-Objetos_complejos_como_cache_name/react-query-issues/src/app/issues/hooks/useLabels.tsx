import { useQuery } from "@tanstack/react-query"
import { fetcherGetLabels } from "../../api/functions-fetcher"
import { placeholderDataMock } from "../../helpers/mocks/placeholderDataMock"


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