import { useState } from 'react'
import { LoadingIcon } from '../../shared/LoadingIcon'
import { IssueList, LabelPicker } from '../components'
import { useIssues } from '../hooks'
import { StateType } from '../types'


export const ListView = () => {
    const [ selectedLabels, setSelectedLabels ] = useState<string[]>( [] )

    const [ state, setState ] = useState<StateType>()

    const { issuesQuery: { isLoading, data }, page, nextPage, prevPage } = useIssues( { labels: selectedLabels, state } )

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
                        : <IssueList issues={ data || [] } state={ state } onStateChange={ ( newState ) => setState( newState ) } />
                }

                <div className='d-flex mt-2 justify-content-between'>
                    <button className="btn btn-outline-primary" onClick={ prevPage }>Prev</button>
                    <span>{ page }</span>
                    <button className="btn btn-outline-primary" onClick={ nextPage }>Next</button>
                </div>
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