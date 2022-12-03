import { useQuery } from "@tanstack/react-query"


const fetcherGetLabels = async () => {
    const res = await fetch( 'https://api.github.com/repos/facebook/react/labels' )
    return await res.json()
}


export const LabelPicker = () => {
    const labelsQuery = useQuery(
        [ 'labels' ],
        fetcherGetLabels
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