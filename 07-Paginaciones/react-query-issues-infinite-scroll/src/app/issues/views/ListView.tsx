import { useState } from 'react'
import { LoadingIcon } from '../../shared/LoadingIcon'
import { IssueList, LabelPicker } from '../components'
import { useIssues } from '../hooks'
import { StateType } from '../types'


export const ListView = () => {
    const [ selectedLabels, setSelectedLabels ] = useState<string[]>( [] )

    const [ state, setState ] = useState<StateType>()

    const { issuesQuery: { data, isLoading, isFetching, fetchNextPage, hasNextPage } } = useIssues( { labels: selectedLabels, state } )

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
                        : <IssueList issues={ data?.pages.flat() || [] } state={ state } onStateChange={ ( newState ) => setState( newState ) } />
                }

                <button className="btn btn-outline-primary mt-3"
                    disabled={ isFetching || !hasNextPage }
                    onClick={ () => fetchNextPage() }>Load more...</button>
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