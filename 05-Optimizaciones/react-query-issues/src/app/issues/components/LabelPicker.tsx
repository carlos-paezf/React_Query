import { FC } from 'react'
import { LoadingIcon } from '../../shared/LoadingIcon'
import { useLabels } from '../hooks/useLabels'


type Props = {
    selectedLabels: string[]
    onLabelChange: ( labelName: string ) => void
}


export const LabelPicker: FC<Props> = ( { selectedLabels, onLabelChange } ) => {
    const { labelsQuery: { data, isLoading } } = useLabels()

    if ( isLoading ) return <LoadingIcon />

    return (
        <>
            {
                data?.map( ( { id, color, name } ) => (
                    <span key={ id }
                        className={ `badge rounded-pill m-1 label-picker ${ selectedLabels.includes( name ) && 'label-active' }` }
                        style={ { border: `1px solid #${ color } `, color: `#${ color }` } }
                        onClick={ () => onLabelChange( name ) }
                    >
                        { name }
                    </span>
                ) )
            }

        </>
    )
}