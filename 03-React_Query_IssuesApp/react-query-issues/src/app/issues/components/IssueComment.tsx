import { FC } from "react"
import ReactMarkdown from 'react-markdown'


type Props = {
    body: string
}


export const IssueComment: FC<Props> = ( { body } ) => {
    return (
        <div className="col-12">
            <div className="card border-white mt-2">
                <div className="card-header bg-dark">
                    <img src="https://avatars.githubusercontent.com/u/55883267?s=400&u=cd06f3bda51dc38042d35a7e9db57a0f55e5e004&v=4" alt="User Avatar" className="avatar" />
                    <span className="mx-2">Ferrer commented</span>
                </div>

                <div className="card-body text-dark">
                    <ReactMarkdown>{ body }</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}
