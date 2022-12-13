import { FC } from 'react'
import { FiCheckCircle, FiInfo, FiMessageSquare } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { IssueType, State } from '../types'


type Props = {
    issue: IssueType
}


export const IssueItem: FC<Props> = ( {
    issue: {
        state, title, number, user, comments
    }
} ) => {
    const navigate = useNavigate()

    return (
        <div className="card mb-2 issue" onClick={ () => navigate( `/issues/issue/${ number }` ) }>
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