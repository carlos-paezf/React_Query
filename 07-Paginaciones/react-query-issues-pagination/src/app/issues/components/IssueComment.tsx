import { FC } from "react"
import ReactMarkdown from 'react-markdown'
import { IssueType } from "../types"


type Props = {
    issue: IssueType
}


export const IssueComment: FC<Props> = ( { issue: { user, body } } ) => {
    return (
        <div className="col-12">
            <div className="card border-white mt-2">
                <div className="card-header bg-dark">
                    <img src={ user.avatar_url } alt="User Avatar" className="avatar" />
                    <span className="mx-2">{ user.login } commented</span>
                </div>

                <div className="card-body text-dark">
                    <ReactMarkdown>{ body }</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}
