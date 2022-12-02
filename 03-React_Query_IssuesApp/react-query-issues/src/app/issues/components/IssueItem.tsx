import { FiInfo, FiMessageSquare } from 'react-icons/fi'


export const IssueItem = () => {
    return (
        <div className="card mb-2 issue">
            <div className="card-body d-flex align-items-center">
                <FiInfo size={ 30 } color="red" />

                <div className="d-flex flex-column flex-fill px-2">
                    <span>Suggestion: Why not make accessing and changing the state possible globally?</span>
                    <span className="issue-subinfo">#25581 opened 2 days ago by <span className="fw-bold">carlos-paezf</span></span>
                </div>

                <div className="d-flex align-items-center">
                    <img src="https://avatars.githubusercontent.com/u/55883267?s=400&u=cd06f3bda51dc38042d35a7e9db57a0f55e5e004&v=4" alt="User Avatar" className="avatar" />
                    <span className="px-2">2</span>
                    <FiMessageSquare />
                </div>
            </div>
        </div>
    )
}