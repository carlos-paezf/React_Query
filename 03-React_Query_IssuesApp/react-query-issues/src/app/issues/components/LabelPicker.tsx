import { LoadingIcon } from '../../shared/LoadingIcon'
import { useLabels } from '../hooks/useLabels'


export const LabelPicker = () => {
    const { labelsQuery: { data, isLoading } } = useLabels()

    if ( isLoading ) return <LoadingIcon />

    return (
        <>
            {
                data?.map( ( { id, color, name } ) => (
                    <span key={ id } className="badge rounded-pill m-1 label-picker"
                        style={ { border: `1px solid #${ color } `, color: `#${ color }` } }>
                        { name }
                    </span>
                ) )
            }

        </>
    )
}