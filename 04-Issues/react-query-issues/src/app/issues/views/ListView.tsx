import { useState } from 'react'
import { LoadingIcon } from '../../shared/LoadingIcon'
import { IssueList, LabelPicker } from '../components'
import { useIssues } from '../hooks'


export const ListView = () => {
    const [ selectedLabels, setSelectedLabels ] = useState<string[]>( [] )

    const { issuesQuery: { isLoading, data } } = useIssues()

    const onLabelChange = ( labelName: string ) => {
        ( selectedLabels.includes( labelName ) )
            ? setSelectedLabels( selectedLabels.filter( ( e ) => e !== labelName ) )
            : setSelectedLabels( [ labelName, ...selectedLabels ] )
    }

    return (
        <div className="row mt-5">
            <div className="col-8">
                {
                    isLoading
                        ? <LoadingIcon />
                        : <IssueList issues={ data || [] } />
                }
            </div>

            <div className="col-4">
                <LabelPicker
                    selectedLabels={ selectedLabels }
                    onLabelChange={ ( labelName ) => { onLabelChange( labelName ) } }
                />
            </div>
        </div>
    )
}