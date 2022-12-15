import { Link, Navigate, useParams } from "react-router-dom"
import { LoadingIcon } from "../../shared/LoadingIcon"
import { IssueComment } from '../components'
import { useIssue } from "../hooks"


export const IssueView = () => {
    const { id = '0' } = useParams()

    const { issueQuery: { isLoading, data }, issueCommentsQuery } = useIssue( Number( id ) )

    if ( isLoading ) return <LoadingIcon />

    if ( !data ) return <Navigate to="./issues/list" />

    return (
        <div className="row mb-5">
            <div className="col-12 mb-3">
                <Link to="./issues/list">Go Back</Link>
            </div>

            <IssueComment issue={ data } />

            { issueCommentsQuery.isLoading && <LoadingIcon /> }

            {
                issueCommentsQuery.data?.map(
                    issue => <IssueComment issue={ issue } key={ issue.id } />
                )
            }
        </div>
    )
}