import { FC } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { FiCheckCircle, FiInfo, FiMessageSquare } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import { IssueType, State } from '../types'
import { fetcherGetIssueComments, fetcherGetIssueInfo } from '../../api/functions-fetcher'


type Props = {
    issue: IssueType
}


export const IssueItem: FC<Props> = ( { issue } ) => {
    const { state, title, number, user, comments } = issue

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const preFetchData = () => {
        queryClient.prefetchQuery(
            [ "issue", number ],
            () => fetcherGetIssueInfo( number ),
            {
                staleTime: 1000 * 60 * 5
            }
        )

        queryClient.prefetchQuery(
            [ "issue", number, "comments" ],
            () => fetcherGetIssueComments( number )
        )
    }

    const preSetData = () => {
        queryClient.setQueryData(
            [ "issue", number ],
            issue,
            {
                updatedAt: new Date().getTime() + ( 1000 * 60 )
            }
        )
    }

    return (
        <div
            className="card mb-2 issue"
            onClick={ () => navigate( `/issues/issue/${ number }` ) }
            // onMouseEnter={ preFetchData }
            onMouseEnter={ preSetData }
        >
            <div className="card-body d-flex align-items-center">
                {
                    state === State.Open
                        ? <FiInfo size={ 30 } color="red" />
                        : <FiCheckCircle size={ 30 } color="green" />
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{ title }</span>
                    <span className="issue-subinfo">#{ number } opened 2 days ago by <span className="fw-bold">{ user.login }</span></span>
                </div>

                <div className="d-flex align-items-center">
                    <img src={ user.avatar_url } alt="User Avatar" className="avatar" />
                    <span className="px-2">{ comments }</span>
                    <FiMessageSquare />
                </div>
            </div>
        </div>
    )
}