import { useQuery } from "@tanstack/react-query"
import { githubApiClient } from "../../api/githubApi"
import { LabelType } from "../types/label"


const fetcherGetLabels = async (): Promise<LabelType[]> => {
    const { data } = await githubApiClient.get<LabelType[]>( '/labels' )
    return data
}


export const LabelPicker = () => {
    const labelsQuery = useQuery(
        [ 'labels' ],
        fetcherGetLabels,
        {
            refetchOnWindowFocus: false
        }
    )

    return (
        <div>
            <span className="badge rounded-pill m-1 label-picker"
                style={ { border: `1px solid #ffccd3`, color: '#ffccd3' } }>
                Primary
            </span>
        </div>
    )
}