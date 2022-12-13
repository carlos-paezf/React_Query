import { Link, Navigate, useParams } from "react-router-dom"
import { LoadingIcon } from "../../shared/LoadingIcon"
import { IssueComment } from '../components'
import { useIssue } from "../hooks"


export const IssueView = () => {
    const { id = '0' } = useParams()

    const { issueQuery: { isLoading, data } } = useIssue( Number( id ) )

    if ( isLoading ) return <LoadingIcon />

    if ( !data ) return <Navigate to="./issues/list" />

    return (
        <div className="row mb-5">
            <div className="col-12 mb-3">
                <Link to="./issues/list">Go Back</Link>
            </div>

            {/* Primer Comentario */ }
            <IssueComment issue={ data } />

            {/* Comentarios de otros */ }
            {/* <IssueComment body={ comment2 } /> */ }
            {/* <IssueComment body={ comment3 } /> */ }
        </div>
    )
}