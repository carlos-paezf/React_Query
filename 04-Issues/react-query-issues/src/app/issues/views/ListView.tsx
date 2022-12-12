import { useState } from 'react'
import { IssueList, LabelPicker } from '../components'


export const ListView = () => {
    const [ selectedLabels, setSelectedLabels ] = useState<string[]>( [] )

    const onLabelChange = ( labelName: string ) => {
        ( selectedLabels.includes( labelName ) )
            ? setSelectedLabels( selectedLabels.filter( ( e ) => e !== labelName ) )
            : setSelectedLabels( [ labelName, ...selectedLabels ] )
    }

    return (
        <div className="row mt-5">
            <div className="col-8">
                <IssueList />
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