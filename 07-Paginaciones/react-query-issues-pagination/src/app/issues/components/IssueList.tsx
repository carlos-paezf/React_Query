import { FC } from "react"
import { IssueItem } from "./IssueItem"
import { IssueType, StateType } from "../types"


type Props = {
    issues: IssueType[]
    state?: StateType,
    onStateChange: ( state?: StateType ) => void
}


export const IssueList: FC<Props> = ( { issues, state, onStateChange } ) => {
    return (
        <div className="card border-white">
            <div className="card-header bg-dark">
                <ul className="nav nav-pills card-header-pills">
                    <li className="nav-item">
                        <a className={ `nav-link ${ state ?? 'active' }` }
                            onClick={ () => onStateChange() }>All</a>
                    </li>

                    <li className="nav-item">
                        <a className={ `nav-link ${ state === StateType.Open && 'active' }` }
                            onClick={ () => onStateChange( StateType.Open ) }>Open</a>
                    </li>

                    <li className="nav-item">
                        <a className={ `nav-link ${ state === StateType.Closed && 'active' }` }
                            onClick={ () => onStateChange( StateType.Closed ) }>Closed</a>
                    </li>
                </ul>
            </div>

            <div className="card-body text-dark">
                {
                    issues.map( issue => <IssueItem key={ issue.id } issue={ issue } /> )
                }
            </div>
        </div>
    )
}